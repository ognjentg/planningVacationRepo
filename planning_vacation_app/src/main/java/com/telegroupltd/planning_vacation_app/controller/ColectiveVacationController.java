package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.ColectiveVacation;
import com.telegroupltd.planning_vacation_app.repository.ColectiveVacationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;


@RequestMapping(value = "/hub/colectiveVacation")
@RestController
@Scope("request")
public class ColectiveVacationController extends GenericHasActiveController<ColectiveVacation, Integer> {
    private final ColectiveVacationRepository colectiveVacationRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("Dodavanje nije moguće")
    private String badRequestInsert;

    @Value("Ažuriranje nije moguće")
    private String badRequestUpdate;

    @Autowired
    public ColectiveVacationController(ColectiveVacationRepository colectiveVacationRepository) {
        super(colectiveVacationRepository);
        this.colectiveVacationRepository = colectiveVacationRepository;
    }

    @Override
    @Transactional
    public List<ColectiveVacation> getAll() {
        System.out.println("tesst");
        return colectiveVacationRepository.getAllByActiveIs((byte) 1);
    }

    @RequestMapping(value = "/getColectiveVacationByCompany/{companyId}", method = RequestMethod.GET)
    public List<ColectiveVacation> getColectiveVacationForCompany(@PathVariable Integer companyId) {
        return colectiveVacationRepository.getAllByCompanyIdAndActive(companyId, (byte) 1);
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @Override
    public @ResponseBody
    ColectiveVacation insert(@RequestBody ColectiveVacation colectiveVacation) throws BadRequestException {
        //Check if date_from is after or equal to date_to
        if(colectiveVacation.getDateFrom().compareTo(colectiveVacation.getDateTo()) >= 0)
            throw new BadRequestException(badRequestInsert);
        if (repo.saveAndFlush(colectiveVacation) == null)
            throw new BadRequestException(badRequestInsert);
        logCreateAction(colectiveVacation);
        return colectiveVacation;
    }

    @Transactional
    @RequestMapping(value = "/addColectiveVacations", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    void insert(@RequestBody List<ColectiveVacation> colectiveVacations) throws ParseException {

        for (ColectiveVacation colectiveVacation : colectiveVacations) {
            if (colectiveVacation.getDateTo() != null && colectiveVacation.getDateFrom() != null) {
                ColectiveVacation newColectiveVacation = new ColectiveVacation();
                newColectiveVacation.setActive((byte) 1);
                newColectiveVacation.setCompanyId(colectiveVacation.getCompanyId());
                newColectiveVacation.setDateFrom(colectiveVacation.getDateFrom());
                newColectiveVacation.setDateTo(colectiveVacation.getDateTo());


                List<ColectiveVacation> colectiveVacationList = getColectiveVacationForCompany(colectiveVacation.getCompanyId());
                boolean isExist = false;
                for (ColectiveVacation colectiveVacation1 : colectiveVacationList) {
                    String dateFrom1 = colectiveVacation1.getDateFrom().toString();
                    String dateTo1 = colectiveVacation1.getDateTo().toString();
                    String dateFrom2 = colectiveVacation.getDateFrom().toString();
                    String dateTo2 = colectiveVacation.getDateTo().toString();

                    if (colectiveVacation1.getActive() == 1
                            && dateFrom1.equals(dateFrom2) && dateTo1.equals(dateTo2)
                            && colectiveVacation1.getCompanyId() == newColectiveVacation.getCompanyId()) {
                        isExist = true;
                        delete(colectiveVacation);
                    }
                }

                if (!isExist) {
                    if (repo.saveAndFlush(newColectiveVacation) != null) {
                        entityManager.refresh(newColectiveVacation);

                    }
                }
            }
        }
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @Override
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody ColectiveVacation colectiveVacation) throws BadRequestException, ForbiddenException {
        if(colectiveVacation.getDateFrom().compareTo(colectiveVacation.getDateTo()) >= 0)
            throw new BadRequestException(badRequestUpdate);
        return super.update(id, colectiveVacation);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable ColectiveVacation colectiveVacation) throws ParseException {

        List<ColectiveVacation> colectiveVacationList = getColectiveVacationForCompany(colectiveVacation.getCompanyId());
        String dateFrom2 = colectiveVacation.getDateFrom().toString();
        String dateTo2 = colectiveVacation.getDateTo().toString();
        for (ColectiveVacation colectiveVacation1 : colectiveVacationList) {

            String dateFrom1 = colectiveVacation1.getDateFrom().toString();
            String dateTo1 = colectiveVacation1.getDateTo().toString();


            if (colectiveVacation1.getActive() == 1
                    && dateFrom1.equals(dateFrom2) && dateTo1.equals(dateTo2) ) {
                colectiveVacation1.setActive((byte)0);
                if (repo.saveAndFlush(colectiveVacation1) != null)
                    return "Uspjesno";
            }
        }
        return "Neuspjesno";
    }
}