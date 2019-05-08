package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
import com.telegroupltd.planning_vacation_app.model.LeaveRequest;
import com.telegroupltd.planning_vacation_app.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/leave_request")
@Controller
@Scope("request")
public class LeaveRequestController extends GenericController<LeaveRequest, Integer> {
    private final LeaveRequestRepository leaveRequestRepository;

    @Value("${badRequest.insert}")
    private String badRequestInsert;

    @Value("${badRequest.update}")
    private String badRequestUpdate;

    @Value("${badRequest.delete}")
    private String badRequestDelete;

    @Autowired
    public LeaveRequestController(LeaveRequestRepository leaveRequestRepository) {
        super(leaveRequestRepository);
        this.leaveRequestRepository = leaveRequestRepository;
    }
/*
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @Override
    public @ResponseBody
    LeaveRequest insert(@RequestBody LeaveRequest leaveRequest) throws BadRequestException{
        if(repo.saveAndFlush(leaveRequest) != null){
            logCreateAction(leaveRequest);
            return leaveRequest;
        }
        else
            throw new BadRequestException(badRequestInsert);
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @Override
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody LeaveRequest leaveRequest) throws BadRequestException{
        LeaveRequest oldObject = cloner.deepClone(repo.findById(id).orElse(null));
        if(repo.saveAndFlush(leaveRequest) != null){
            logUpdateAction(leaveRequest, oldObject);
            return "Success";
        }
        else
            throw new BadRequestException(badRequestUpdate);
    }

    @Override
    @RequestMapping(value = {"/{id}"}, method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id).orElse(null);
        if(leaveRequest != null){
            leaveRequest.setActive((byte) 0);
            repo.saveAndFlush(leaveRequest);
            logDeleteAction(leaveRequest);
            return "Success";
        }
        else
            throw new BadRequestException(badRequestDelete);
    }
    */
}

