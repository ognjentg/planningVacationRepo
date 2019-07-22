package com.telegroupltd.planning_vacation_app.repository.repositoryCustom;

import com.telegroupltd.planning_vacation_app.model.AbsenceHistoryUser;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestUserLeaveRequestStatus;

import java.util.List;

public interface LeaveRequestRepositoryCustom {
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformation(Integer id);
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestFilteredByLeaveRequestStatus(Integer id,String key);
    void updateLeaveRequestStatusRejected(Integer leaveRequestId, String approverComment);
    void updateLeaveRequestStatusApproved(Integer leaveRequestId, Integer leaveRequestTypeId, Byte paid, Integer approverId);
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationForWait(Integer id);
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationById(Integer id);

    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationByUserId(Integer id);

    List<AbsenceHistoryUser> getAbsenceHistoryUserInfo(Integer id,Integer key);
    void updateLeaveRequestStatusCancelation(Integer leaveRequestId, Integer leaveRequestTypeId, Byte paid, Integer approverId);
}
