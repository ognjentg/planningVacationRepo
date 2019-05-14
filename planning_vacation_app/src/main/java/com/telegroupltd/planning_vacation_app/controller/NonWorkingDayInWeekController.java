package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.NonWorkingDayInWeek;
import org.springframework.data.jpa.repository.JpaRepository;

public class NonWorkingDayInWeekController extends GenericHasActiveController<NonWorkingDayInWeek, Integer> {

    public NonWorkingDayInWeekController(JpaRepository<NonWorkingDayInWeek, Integer> repo) {
        super(repo);
    }
}
