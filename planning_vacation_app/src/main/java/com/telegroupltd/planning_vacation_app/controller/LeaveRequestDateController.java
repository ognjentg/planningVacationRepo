package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.LeaveRequest;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestDate;
import com.telegroupltd.planning_vacation_app.repository.LeaveRequestDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value="/hub/leave_request_date")
@Controller
@Scope("request")
public class LeaveRequestDateController extends GenericHasActiveController<LeaveRequestDate,Integer> {
    private final LeaveRequestDateRepository leaveRequestDateRepository;

    @Value("Dodavanje nije moguće")
    private String badRequestInsert;
    @Autowired
    LeaveRequestDateController(LeaveRequestDateRepository leaveRequestDateRepository)
    {
        super(leaveRequestDateRepository);
        this.leaveRequestDateRepository = leaveRequestDateRepository;
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @Override
    public @ResponseBody
    LeaveRequestDate insert(@RequestBody LeaveRequestDate leaveRequestDate) throws BadRequestException {
        //Check if category length is equal or greater than 45
        if(repo.saveAndFlush(leaveRequestDate) == null)
            throw new BadRequestException(badRequestInsert);
        return leaveRequestDate;
    }
    @Override
    public @ResponseBody
    List<LeaveRequestDate> getAll(){
        return leaveRequestDateRepository.getAllByActiveIs((byte)1);
    }

    @RequestMapping(value = "/getAllByLeaveRequestIdAndActive/{leaveRequestId}", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestDate> getAllByLeaveRequestIdAndActive(@PathVariable Integer leaveRequestId ) {
        return leaveRequestDateRepository.getAllByLeaveRequestIdAndActive(leaveRequestId, (byte) 1);
    }
}
