package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestType;
import com.telegroupltd.planning_vacation_app.repository.LeaveRequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value="/leave_request_controller")
@Controller
@Scope("request")
public class LeaveRequestTypeController extends GenericHasActiveController<LeaveRequestType,Integer> {
    private final LeaveRequestTypeRepository leaveRequestTypeRepository;
    @Autowired
    LeaveRequestTypeController(LeaveRequestTypeRepository leaveRequestTypeRepository)
    {
        super(leaveRequestTypeRepository);
        this.leaveRequestTypeRepository = leaveRequestTypeRepository;
    }
}
