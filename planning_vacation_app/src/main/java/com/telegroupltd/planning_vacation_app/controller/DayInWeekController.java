package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.DayInWeek;
import com.telegroupltd.planning_vacation_app.repository.DayInWeekRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Objects;

@RequestMapping(value="/hub/dayInWeek")
@Controller
@Scope("request")
public class DayInWeekController extends GenericHasActiveController<DayInWeek,Integer> {
    private final DayInWeekRepository dayInWeekRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("Dodavanje nije moguće.")
    private String badRequestInsert;

    DayInWeekController(DayInWeekRepository dayInWeekRepository)
    {
        super(dayInWeekRepository);
        this.dayInWeekRepository = dayInWeekRepository;
    }

    @Override
    @Transactional
    public List<DayInWeek> getAll() throws ForbiddenException {
        return dayInWeekRepository.getAllByActiveIs((byte) 1);
    }

    @Override
    public DayInWeek findById(Integer dayWeekId) {
        return dayInWeekRepository.getByIdAndActive(dayWeekId,(byte) 1);
    }

    @RequestMapping(value = "/getDayInWeek/{dayKey}", method = RequestMethod.GET)
    public @ResponseBody
    DayInWeek findByDayKey(@PathVariable String dayKey) {
        return dayInWeekRepository.getByDayKey(dayKey);
    }

    @Override
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    DayInWeek insert(@RequestBody DayInWeek dayInWeek) throws BadRequestException {

        DayInWeek newDayInWeek = new DayInWeek();
        newDayInWeek.setDayKey(dayInWeek.getDayKey());
        newDayInWeek.setJavaValue(dayInWeek.getJavaValue());
        newDayInWeek.setActive((byte)1);
        System.out.println(newDayInWeek.getJavaValue());
        System.out.println(newDayInWeek.getDayKey());

        if (repo.saveAndFlush(newDayInWeek) != null) {
            entityManager.refresh(newDayInWeek);

            return newDayInWeek;
        }
        throw new BadRequestException(badRequestInsert);
    }

    @Override
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) {
        DayInWeek dayInWeek = dayInWeekRepository.findById(id).orElse(null);
        cloner.deepClone(dayInWeek);
        Objects.requireNonNull(dayInWeek).setActive((byte)0);
        return "Uspjesno";
    }

    @RequestMapping(value = "/deleteByDayKey/{dayKey}", method = RequestMethod.DELETE)
    public @ResponseBody
    String deleteByKey(@PathVariable String dayKey) {
        DayInWeek dayInWeek = dayInWeekRepository.getByDayKey(dayKey);
        cloner.deepClone(dayInWeek);
        Objects.requireNonNull(dayInWeek).setActive((byte)0);
        return "Uspjesno";
    }
}
