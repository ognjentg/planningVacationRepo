package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.DayInWeek;
import com.telegroupltd.planning_vacation_app.model.NonWorkingDayInWeek;
import com.telegroupltd.planning_vacation_app.repository.NonWorkingDayInWeekRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping(value = "/hub/nonWorkingDayInWeek")
@Scope("request")
public class NonWorkingDayInWeekController extends GenericHasActiveController<NonWorkingDayInWeek, Integer> {
    private final NonWorkingDayInWeekRepository nonWorkingDayInWeekRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("Dodavanje nije moguće.")
    private String badRequestInsert;

    @Value("Azuriranje nije moguće.")
    private String badRequestUpdate;


    public NonWorkingDayInWeekController(NonWorkingDayInWeekRepository nonWorkingDayInWeekRepository) {
        super(nonWorkingDayInWeekRepository);
        this.nonWorkingDayInWeekRepository = nonWorkingDayInWeekRepository;
    }

    @Override
    @Transactional
    public List<NonWorkingDayInWeek> getAll() {
         return nonWorkingDayInWeekRepository.getAllByActiveIs((byte) 1);
    }

    @RequestMapping(value = "/getNonWorkingDayInWeekByCompany/{companyId}", method = RequestMethod.GET)
    public List<NonWorkingDayInWeek> getNonWorkingDayInWeekForCompany(@PathVariable Integer companyId) {
        return  nonWorkingDayInWeekRepository.getAllByCompanyIdAndActive(companyId, (byte) 1);
    }


    @Override
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    NonWorkingDayInWeek insert(@RequestBody NonWorkingDayInWeek nonWorkingDayInWeek) throws BadRequestException, ForbiddenException {
        NonWorkingDayInWeek newNonWorkingDayInWeek = new NonWorkingDayInWeek();

        DayInWeek dayInWeek = getDayInWeek(nonWorkingDayInWeek);
        boolean flag = true;
        java.sql.Date currentDate = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        System.out.println(nonWorkingDayInWeek.getFromDate());
        List<NonWorkingDayInWeek> nonWorkingDayInWeekList = getAll();

        for (NonWorkingDayInWeek nonWorkingDayInWeek1 : nonWorkingDayInWeekList) {

            if (nonWorkingDayInWeek1.getDayInWeekId() == dayInWeek.getId() && nonWorkingDayInWeek1.getActive() == 1
                        && nonWorkingDayInWeek1.getCompanyId() == nonWorkingDayInWeek.getCompanyId()) {
                nonWorkingDayInWeek1.setToDate(currentDate);
                nonWorkingDayInWeek1.setActive((byte) 0);
                if (repo.saveAndFlush(nonWorkingDayInWeek1) != null)
                    return nonWorkingDayInWeek1;
            }
        }
        if (flag) {
            newNonWorkingDayInWeek.setCompanyId(nonWorkingDayInWeek.getCompanyId());
            newNonWorkingDayInWeek.setActive((byte)1);
            newNonWorkingDayInWeek.setFromDate(currentDate);
            newNonWorkingDayInWeek.setToDate(null);
            newNonWorkingDayInWeek.setDayInWeekId(dayInWeek.getId());

            if (repo.saveAndFlush(newNonWorkingDayInWeek) != null) {
                entityManager.refresh(newNonWorkingDayInWeek);

                return newNonWorkingDayInWeek;
            }
        }

        throw new BadRequestException(badRequestInsert);
    }

    private DayInWeek getDayInWeek(NonWorkingDayInWeek nonWorkingDayInWeek) {
        DayInWeek dayInWeek = new DayInWeek();
        if (nonWorkingDayInWeek.getDayInWeekId() == 8) {
            dayInWeek.setId(8);
            dayInWeek.setDayKey("Ponedeljak");
            dayInWeek.setJavaValue(1);
            dayInWeek.setActive((byte)1);
        } else if (nonWorkingDayInWeek.getDayInWeekId() == 9) {
            dayInWeek.setId(9);
            dayInWeek.setDayKey("Utorak");
            dayInWeek.setJavaValue(2);
            dayInWeek.setActive((byte)1);
        }
        else if (nonWorkingDayInWeek.getDayInWeekId() == 10) {
            dayInWeek.setId(10);
            dayInWeek.setDayKey("Srijeda");
            dayInWeek.setJavaValue(3);
            dayInWeek.setActive((byte)1);
        } else if (nonWorkingDayInWeek.getDayInWeekId() == 11) {
            dayInWeek.setId(11);
            dayInWeek.setDayKey("Cetvrtak");
            dayInWeek.setJavaValue(4);
            dayInWeek.setActive((byte)1);
        } else if (nonWorkingDayInWeek.getDayInWeekId() == 12) {
            dayInWeek.setId(12);
            dayInWeek.setDayKey("Petak");
            dayInWeek.setJavaValue(5);
            dayInWeek.setActive((byte)1);
        } else if (nonWorkingDayInWeek.getDayInWeekId() == 13) {
            dayInWeek.setId(13);
            dayInWeek.setDayKey("Subota");
            dayInWeek.setJavaValue(6);
            dayInWeek.setActive((byte)1);
        } else if (nonWorkingDayInWeek.getDayInWeekId() == 14) {
            dayInWeek.setId(14);
            dayInWeek.setDayKey("Nedelja");
            dayInWeek.setJavaValue(7);
            dayInWeek.setActive((byte)1);
        }
        return dayInWeek;
    }
}
