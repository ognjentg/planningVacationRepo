package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestDate;
import com.telegroupltd.planning_vacation_app.repository.LeaveRequestDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value="/hub/leave_request_date")
@Controller
@Scope("request")
public class LeaveRequestDateController extends GenericHasActiveController<LeaveRequestDate,Integer> {
    private final LeaveRequestDateRepository leaveRequestDateRepository;
    @Autowired
    LeaveRequestDateController(LeaveRequestDateRepository leaveRequestDateRepository)
    {
        super(leaveRequestDateRepository);
        this.leaveRequestDateRepository = leaveRequestDateRepository;
    }
}
