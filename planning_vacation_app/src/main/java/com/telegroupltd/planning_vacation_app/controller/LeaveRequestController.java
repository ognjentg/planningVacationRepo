package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.LeaveRequest;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestUserLeaveRequestStatus;
import com.telegroupltd.planning_vacation_app.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RequestMapping(value = "hub/leave_request")
@Controller
@Scope("request")
public class LeaveRequestController extends GenericHasActiveController<LeaveRequest, Integer> {
    private final LeaveRequestRepository leaveRequestRepository;

    @Value("Dodavanje nije moguće")
    private String badRequestInsert;

    @Value("Ažuriranje nije moguće")
    private String badRequestUpdate;

    @Value("Brisanje nije moguće.")
    private String badRequestDelete;

    @Autowired
    public LeaveRequestController(LeaveRequestRepository leaveRequestRepository) {
        super(leaveRequestRepository);
        this.leaveRequestRepository = leaveRequestRepository;
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @Override
    public @ResponseBody
    LeaveRequest insert(@RequestBody LeaveRequest leaveRequest) throws BadRequestException{
        //Check if category length is equal or greater than 45
        if(leaveRequest.getCategory().length() >= 45)
            throw new BadRequestException(badRequestInsert);
        if(repo.saveAndFlush(leaveRequest) == null)
            throw new BadRequestException(badRequestInsert);
        logCreateAction(leaveRequest);
        return leaveRequest;
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @Override
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody LeaveRequest leaveRequest) throws BadRequestException, ForbiddenException {
        if(leaveRequest.getCategory().length() >= 45)
            throw new BadRequestException(badRequestInsert);
        return super.update(id, leaveRequest);
    }

    @Override
    public @ResponseBody
    List<LeaveRequest> getAll(){
        return leaveRequestRepository.getAllByActiveIs((byte)1);
    }

    @Override
    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id).orElse(null);
        cloner.deepClone(leaveRequest);
        Objects.requireNonNull(leaveRequest).setActive((byte)0);
        if(leaveRequestRepository.getByIdAndActive(id,(byte)1) == null){
            logDeleteAction(leaveRequest);
            return "Success";
        }
        else throw new BadRequestException(badRequestDelete);
    }

    @RequestMapping(value = "/leaveRequestInfo", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestInformation(){
        return leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformation(userBean.getUser().getId());
    }

    @RequestMapping(value = "/leaveRequestInfo/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestInformationById(Integer id){
        return leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationById(userBean.getUser().getId());
    }

    @RequestMapping(value = "/leaveRequestInfoWait", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationForWait(){
        return leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationForWait(userBean.getUser().getId());
    }

    @RequestMapping(value = "/leaveRequestFilteredByLeaveRequestStatus/{key}", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getSickLeaveFilteredBySickLeaveStatus(@PathVariable Integer key ){
        return leaveRequestRepository.getLeaveRequestFilteredByLeaveRequestStatus(userBean.getUser().getId(), key);
    }

    @RequestMapping(value = "/updateLeaveRequestStatusRejected/{leaveRequestId}/comment/{approverComment}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateLeaveRequestStatusRejected(@PathVariable Integer leaveRequestId, @PathVariable String approverComment){
        leaveRequestRepository.updateLeaveRequestStatusRejected(leaveRequestId,approverComment);
    }

    @RequestMapping(value = "/updateLeaveRequestStatusApproved/{leaveRequestId}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateLeaveRequestStatusApproved(@PathVariable Integer leaveRequestId){
        leaveRequestRepository.updateLeaveRequestStatusApproved(leaveRequestId);
    }
}

