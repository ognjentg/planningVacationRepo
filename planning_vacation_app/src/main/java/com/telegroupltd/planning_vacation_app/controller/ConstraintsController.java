package com.telegroupltd.planning_vacation_app.controller;


import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.Constraints;
import com.telegroupltd.planning_vacation_app.repository.ConstraintsRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RequestMapping(value = "/hub/constraints")
@RestController
@Scope("request")
public class ConstraintsController extends GenericHasActiveController<Constraints, Integer> {

    private final ConstraintsRepository constraintsRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("Dodavanje nije moguće.")
    private String badRequestInsert;


    public ConstraintsController(ConstraintsRepository constraintsRepository) {
        super(constraintsRepository);
        this.constraintsRepository=constraintsRepository;
    }


    @Override
    @Transactional
    public List<Constraints> getAll() {
        return  constraintsRepository.getAllByActiveIs((byte) 1);
    }

//    @Override
//    public Constraints findById(Integer companyId) throws ForbiddenException {
//        return constraintsRepository.getByCompanyIdAndActive(companyId,(byte) 1);
//    }
//
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody
    Constraints findById(@PathVariable Integer id) {
        Constraints constraints = constraintsRepository.getByCompanyIdAndActive(id, (byte) 1);
        return constraints;
    }

    @Override
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    Constraints insert(@RequestBody Constraints constraints) throws BadRequestException, ForbiddenException {

        Constraints newConstraints = new Constraints();
        newConstraints.setMaxVacationDays(constraints.getMaxVacationDays());
        newConstraints.setSickLeaveJustificationPeriodLength(constraints.getSickLeaveJustificationPeriodLength());
        newConstraints.setVacationPeriodLength(constraints.getVacationPeriodLength());
        newConstraints.setCompanyId(constraints.getCompanyId());
        newConstraints.setActive((byte)1);

        Constraints baseConstraints = findById(constraints.getCompanyId());

        if (baseConstraints != null) {

            if (baseConstraints.getMaxVacationDays() == constraints.getMaxVacationDays() &&
                    baseConstraints.getSickLeaveJustificationPeriodLength() == constraints.getSickLeaveJustificationPeriodLength() &&
                    baseConstraints.getVacationPeriodLength() == constraints.getVacationPeriodLength()) {
                return constraints;
            } else {
                update(constraints.getCompanyId(), baseConstraints);
                if (repo.saveAndFlush(newConstraints) != null) {
                    entityManager.refresh(newConstraints);
                    return newConstraints;
                }
            }
        } else {
            if (repo.saveAndFlush(newConstraints) != null) {
                entityManager.refresh(newConstraints);
                return newConstraints;
            }
        }

        throw new BadRequestException(badRequestInsert);
    }

    @Override
    @Transactional
    @RequestMapping(method = RequestMethod.PUT)
    public String update(Integer companyId, @RequestBody Constraints newConstraints) throws BadRequestException, ForbiddenException {
        Constraints constraints = constraintsRepository.getByCompanyIdAndActive(companyId, (byte) 1);
        if (constraints != null) {
            newConstraints.setActive((byte) 0);
            if (repo.saveAndFlush(newConstraints) != null)
                return "uspjesno";
        } else {
            insert(newConstraints);
        }
        throw new BadRequestException("Bad Request");
    }


    @Override
    @Transactional
    public String delete(Integer companyId) throws BadRequestException, ForbiddenException {
        Constraints object = null;
        if ((object = constraintsRepository.getByCompanyIdAndActive(companyId, (byte) 1)) != null) {
            object.setActive((byte) 0);
            repo.saveAndFlush(object);
            logDeleteAction(object);
            return "Success";
        }
        throw new BadRequestException("Bad Request");
    }

}
