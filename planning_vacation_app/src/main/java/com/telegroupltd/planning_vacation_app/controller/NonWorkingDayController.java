package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.NonWorkingDay;
import com.telegroupltd.planning_vacation_app.repository.NonWorkingDayRepository;
import com.telegroupltd.planning_vacation_app.session.UserBean;
import com.telegroupltd.planning_vacation_app.util.Validator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/hub/nonWorkingDay")
@Scope("request")
public class NonWorkingDayController extends GenericHasActiveController<NonWorkingDay, Integer> {
    private final NonWorkingDayRepository nonWorkingDayRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("Dodavanje nije moguće.")
    private String badRequestInsert;

    @Value("Ažuriranje nije moguće.")
    private String badRequestUpdate;

    @Value("Brisanje nije moguće.")
    private String badRequestDelete;

    @Value("Dužina {tekst} prelazi maksimalnu dužinu od {broj} karaktera.")
    private String badRequestStringMaxLength;

    @Value("Veličina {tekst} prelazi maksimalnu veličinu.")
    private String badRequestBinaryLength;

    @Value("4294967295")
    private Long longblobLength;

    public NonWorkingDayController(NonWorkingDayRepository nonWorkingDayRepository) {
        super(nonWorkingDayRepository);
        this.nonWorkingDayRepository=nonWorkingDayRepository;
    }

    @Override
    @Transactional
    public List<NonWorkingDay> getAll() throws ForbiddenException {
        return nonWorkingDayRepository.getAllByCompanyIdAndActive(userBean.getUser().getCompanyId(),(byte) 1);
    }

    @RequestMapping(value = "/getNonWorkingDayByCompany/{companyId}", method = RequestMethod.GET)
    public List<NonWorkingDay> getNonWorkingDayForCompany(@PathVariable Integer companyId) {
        return nonWorkingDayRepository.getNonWorkingDaysByCompanyId(companyId);
    }

    @Override
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    NonWorkingDay insert(@RequestBody NonWorkingDay nonWorkingDay) throws BadRequestException, ForbiddenException {

        NonWorkingDay newNonWorkingDay = new NonWorkingDay();
        newNonWorkingDay.setDay(nonWorkingDay.getDay());
        newNonWorkingDay.setCompanyId(nonWorkingDay.getCompanyId());
        newNonWorkingDay.setActive((byte)1);
        List<NonWorkingDay> nonWorkingDayList = getAll();
        boolean isExist = false;
        for (NonWorkingDay nonWorkingDay1 : nonWorkingDayList) {
            if (nonWorkingDay1.getActive() == 1 && nonWorkingDay1.getDay() == newNonWorkingDay.getDay()
            && nonWorkingDay1.getCompanyId() == newNonWorkingDay.getCompanyId())
                isExist = true;
        }

        if (!isExist) {
            if (repo.saveAndFlush(newNonWorkingDay) != null) {
                entityManager.refresh(newNonWorkingDay);

                return newNonWorkingDay;
            }
        }
        throw new BadRequestException(badRequestInsert);
    }

    @Override
    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException{
        NonWorkingDay nonWorkingDay = nonWorkingDayRepository.findById(id).orElse(null);
        cloner.deepClone(nonWorkingDay);
        Objects.requireNonNull(nonWorkingDay).setActive((byte)0);
        return "Uspjesno";
    }

    @RequestMapping(value = "/deleteNonWorkingDay/{date}",method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable String date) throws BadRequestException, ParseException {
        SimpleDateFormat sdf1 = new SimpleDateFormat("MM-dd-yyyy");
        java.util.Date baseDate = sdf1.parse(date);
        java.sql.Date sqlStartDate = new java.sql.Date(baseDate.getTime());
        List<NonWorkingDay> nonWorkingDaysList = getNonWorkingDayForCompany(userBean.getUser().getCompanyId());
        for (NonWorkingDay nonWorkingDay : nonWorkingDaysList) {
            if (nonWorkingDay.getActive() == 1 && nonWorkingDay.getDay() == sqlStartDate) {
                cloner.deepClone(nonWorkingDay);
                Objects.requireNonNull(nonWorkingDay).setActive((byte)0);
                return "Uspjesno";
            }
        }

        return "Neuspjesno";
    }

}
