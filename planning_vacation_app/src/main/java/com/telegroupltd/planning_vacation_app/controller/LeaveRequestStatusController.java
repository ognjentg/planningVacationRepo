package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestStatus;
import com.telegroupltd.planning_vacation_app.repository.LeaveRequestStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value="leave_request_status")
@Controller
@Scope("request")
public class LeaveRequestStatusController extends GenericHasActiveController<LeaveRequestStatus,Integer> {
    private final LeaveRequestStatusRepository leaveRequestStatusRepository;
    @Autowired
    LeaveRequestStatusController(LeaveRequestStatusRepository leaveRequestStatusRepository)
    {
        super(leaveRequestStatusRepository);
        this.leaveRequestStatusRepository = leaveRequestStatusRepository;
    }
}
