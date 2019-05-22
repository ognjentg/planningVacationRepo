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
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RequestMapping(value = "/hub/constraints")
@Controller
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
    public List<Constraints> getAll() throws ForbiddenException {
        throw new ForbiddenException("Forbidden");
    }

    @Override
    public Constraints findById(Integer companyId) throws ForbiddenException {
        return constraintsRepository.getByCompanyIdAndActive(companyId,(byte) 1);
    }

    @Override
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    Constraints insert(@RequestBody Constraints constraints) throws BadRequestException {

        Constraints newConstraints = new Constraints();
        newConstraints.setMaxVacationDays(constraints.getMaxVacationDays());
        newConstraints.setSickLeaveJustificationPeriodLength(constraints.getSickLeaveJustificationPeriodLength());
        newConstraints.setVacationPeriodLength(constraints.getVacationPeriodLength());
        newConstraints.setCompanyId(constraints.getCompanyId());
        newConstraints.setActive((byte)1);

        System.out.println(newConstraints.getCompanyId());
        System.out.println(newConstraints.getMaxVacationDays());
        System.out.println(newConstraints.getSickLeaveJustificationPeriodLength());
        System.out.println(newConstraints.getVacationPeriodLength());
        System.out.println(newConstraints.getActive());

        if (repo.saveAndFlush(newConstraints) != null) {
            entityManager.refresh(newConstraints);
            return newConstraints;
        }
        throw new BadRequestException(badRequestInsert);
    }

    //Obzirom da imam jedan aktivan zapis za jednu firmu, da li u update trebam samo update-ovati taj zapis
    // ili da stari zapis obrisem(setujem active), a ubacim novi zapis?

    // trebalo bi tako, nema smisla da se ovo update-uje
    @Override
    @Transactional
    public String update(Integer companyId, @RequestBody Constraints object) throws BadRequestException, ForbiddenException {
        Constraints objectDb = constraintsRepository.getByCompanyIdAndActive(companyId, (byte) 1);
        if (objectDb != null) {
            if (object.getActive() == null)
                object.setActive(objectDb.getActive());
            return super.update(companyId,object);
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
