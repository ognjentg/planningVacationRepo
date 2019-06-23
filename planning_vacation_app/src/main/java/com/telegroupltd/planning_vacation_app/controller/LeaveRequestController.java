package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.LeaveRequest;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestUserLeaveRequestStatus;
import com.telegroupltd.planning_vacation_app.model.Leaves;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.LeaveRequestRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RequestMapping(value = "hub/leave_request")
@RestController
@Scope("request")
public class LeaveRequestController extends GenericHasActiveController<LeaveRequest, Integer> {
    private final LeaveRequestRepository leaveRequestRepository;
    private final UserRepository userRepository;

    @Value("Dodavanje nije moguće")
    private String badRequestInsert;

    @Value("Ažuriranje nije moguće")
    private String badRequestUpdate;

    @Value("Brisanje nije moguće.")
    private String badRequestDelete;

    @Autowired
    public LeaveRequestController(LeaveRequestRepository leaveRequestRepository, UserRepository userRepository) {
        super(leaveRequestRepository);
        this.leaveRequestRepository = leaveRequestRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @Override
    public @ResponseBody
    LeaveRequest insert(@RequestBody LeaveRequest leaveRequest) throws BadRequestException {
        //Check if category length is equal or greater than 45
        if (leaveRequest.getCategory().length() >= 45)
            throw new BadRequestException(badRequestInsert);
        if (repo.saveAndFlush(leaveRequest) == null)
            throw new BadRequestException(badRequestInsert);
        logCreateAction(leaveRequest);
        return leaveRequest;
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @Override
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody LeaveRequest leaveRequest) throws BadRequestException, ForbiddenException {
        if (leaveRequest.getCategory().length() >= 45)
            throw new BadRequestException(badRequestInsert);
        return super.update(id, leaveRequest);
    }

    @Override
    public @ResponseBody
    List<LeaveRequest> getAll() {
        return leaveRequestRepository.getAllByActiveIs((byte) 1);
    }

    @Override
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id).orElse(null);
        cloner.deepClone(leaveRequest);
        Objects.requireNonNull(leaveRequest).setActive((byte) 0);
        if (leaveRequestRepository.getByIdAndActive(id, (byte) 1) == null) {
            logDeleteAction(leaveRequest);
            return "Success";
        } else throw new BadRequestException(badRequestDelete);
    }

    @RequestMapping(value = "/leaveRequestByUserId/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestInformationByUserId(@PathVariable Integer id){
        return leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationByUserId(id);
    }

    @RequestMapping(value = "/leaveRequestInfo", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestInformation() {
        List<LeaveRequestUserLeaveRequestStatus> leaveRequestUserLeaveRequestStatuses = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformation(userBean.getUserUserGroupKey().getId());
        List<User> users =  userRepository.getAllByCompanyIdAndActive(userBean.getUserUserGroupKey().getCompanyId(),(byte)1);
        if(userBean.getUserUserGroupKey().getUserGroupId()==5) {
            for (LeaveRequestUserLeaveRequestStatus leaveRequestUserLeaveRequestStatus : leaveRequestUserLeaveRequestStatuses) {
                if(users.get(leaveRequestUserLeaveRequestStatus.getSenderUserId()).getSectorId() != userBean.getUserUserGroupKey().getSectorId()){
                    users.remove(leaveRequestUserLeaveRequestStatus.getSenderUserId());
                }

            }
            return leaveRequestUserLeaveRequestStatuses;
        }
        else {
            for (LeaveRequestUserLeaveRequestStatus leaveRequestUserLeaveRequestStatus : leaveRequestUserLeaveRequestStatuses) {
                if(users.get(leaveRequestUserLeaveRequestStatus.getSenderUserId()).getSectorId() != null){
                    users.remove(leaveRequestUserLeaveRequestStatus.getSenderUserId());
                }

            }
            return leaveRequestUserLeaveRequestStatuses;
        }
    }

    @RequestMapping(value = "/leaveRequestInfo/{id}", method = RequestMethod.GET)
    public @ResponseBody
    LeaveRequestUserLeaveRequestStatus getLeaveRequestInformationById(@PathVariable Integer id) {
        LeaveRequestUserLeaveRequestStatus lrs = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationById(id).get(0);
        System.out.println(lrs.getFirstName());
        return lrs;
    }

    @RequestMapping(value = "/leaveRequestInfoWait", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationForWait() {
        return leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationForWait(userBean.getUserUserGroupKey().getId());
    }

    @RequestMapping(value = "/leaveRequestFilteredByLeaveRequestStatus/{key}", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestFilteredByLeaveRequestStatus(@PathVariable Integer key) {
        return leaveRequestRepository.getLeaveRequestFilteredByLeaveRequestStatus(userBean.getUserUserGroupKey().getId(), key);
    }



    @RequestMapping(value = "/updateLeaveRequestStatusRejected/{leaveRequestId}/comment/{approverComment}", method = RequestMethod.GET)
    public @ResponseBody
    void updateLeaveRequestStatusRejected(@PathVariable Integer leaveRequestId, @PathVariable String approverComment) {
        leaveRequestRepository.updateLeaveRequestStatusRejected(leaveRequestId, approverComment);
    }

    @RequestMapping(value = "/updateLeaveRequestStatusApproved/{leaveRequestId}/{leaveRequestTypeId}/{paid}", method = RequestMethod.GET)
    public @ResponseBody
    void updateLeaveRequestStatusApproved(@PathVariable Integer leaveRequestId, @PathVariable Integer leaveRequestTypeId, @PathVariable Byte paid){
        leaveRequestRepository.updateLeaveRequestStatusApproved(leaveRequestId,leaveRequestTypeId, paid, userBean.getUserUserGroupKey().getId());
    }

    @RequestMapping(value = "/leaveRequestFilteredByLeaveRequestStatus/{key}/{userId}", method = RequestMethod.GET)
    public @ResponseBody
    Leaves getLeaveRequestFilteredByLeaveRequestStatusForSelected(@PathVariable Integer key, @PathVariable Integer userId) {

        boolean isAbsent = false;
        ArrayList<LeaveRequestUserLeaveRequestStatus> removeReq = new ArrayList<>();
        ArrayList<LeaveRequestUserLeaveRequestStatus> leaveRequests = (ArrayList<LeaveRequestUserLeaveRequestStatus>)
                leaveRequestRepository.getLeaveRequestFilteredByLeaveRequestStatus(userId, key);
        Date now = new Date();
        for (LeaveRequestUserLeaveRequestStatus lr : leaveRequests) {
            if (lr.getSenderUserId() != userId) {
                removeReq.add(lr);
            }
        }
        for (LeaveRequestUserLeaveRequestStatus req : removeReq)
            leaveRequests.remove(req);

        for (LeaveRequestUserLeaveRequestStatus lr : leaveRequests) {
            if (now.after(lr.getDateFrom()) && now.before(lr.getDateTo())) {
                isAbsent = true;
                break;
            }
        }
        Leaves leaves = new Leaves(leaveRequests, isAbsent);
        return leaves;
    }
}

