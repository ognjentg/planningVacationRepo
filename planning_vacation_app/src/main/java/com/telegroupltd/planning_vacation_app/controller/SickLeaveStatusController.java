package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.SickLeaveStatus;
import com.telegroupltd.planning_vacation_app.repository.SickLeaveStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value="/sick_leave_status")
@Controller
@Scope("request")
public class SickLeaveStatusController extends GenericHasActiveController<SickLeaveStatus,Integer> {
    private final SickLeaveStatusRepository sickLeaveStatusRepository;
    @Autowired
    SickLeaveStatusController(SickLeaveStatusRepository sickLeaveStatusRepository)
    {
        super(sickLeaveStatusRepository);
        this.sickLeaveStatusRepository = sickLeaveStatusRepository;
    }
}
