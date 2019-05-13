package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.DayInWeek;
import com.telegroupltd.planning_vacation_app.repository.DayInWeekRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value="/day_in_week")
@Controller
@Scope("request")
public class DayInWeekController extends GenericHasActiveController<DayInWeek,Integer> {
    private final DayInWeekRepository dayInWeekRepository;
    DayInWeekController(DayInWeekRepository dayInWeekRepository)
    {
        super(dayInWeekRepository);
        this.dayInWeekRepository = dayInWeekRepository;
    }
}
