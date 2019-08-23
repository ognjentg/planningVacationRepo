package com.telegroupltd.planning_vacation_app.repository.repositoryCustom;

import com.telegroupltd.planning_vacation_app.model.AbsenceHistoryUser;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestLeaveRequestDays;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestUserLeaveRequestStatus;

import java.util.Date;
import java.util.List;

public interface LeaveRequestRepositoryCustom {
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformation(Integer id);

    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestFilteredByLeaveRequestStatus(Integer id, String key);

    void updateLeaveRequestStatusRejected(Integer leaveRequestId, String approverComment);

    void updateLeaveRequestStatusApproved(Integer leaveRequestId, Integer leaveRequestTypeId, Byte paid, Integer approverId);

    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationForWait(Integer id);

    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationById(Integer id);

    Integer getNumOfAbsentPeopleFilteredBySectorId(Integer sectorId);

    Integer getNumOfAbsentPeopleFilteredBySectorIdAndDate(Integer sectorId, Date date);

    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationByUserId(Integer id);

    List<LeaveRequestLeaveRequestDays> getAllLeaveRequestDaysDaysFilteredByPeriodAndCompanyId(Date dateFrom, Date dateTo, Integer companyId);

    List<AbsenceHistoryUser> getAbsenceHistoryUserInfo(Integer id, Integer key);

    void updateLeaveRequestStatusToCancel(Integer leaveRequestId);

    void updateLeaveRequestStatusToCancellation(Integer leaveRequestId);

    void updateLeaveRequestStatusToApproved(Integer leaveRequestId, String approverComment);

    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationByUserIdByStatus(Integer id, String key);

    List<String> getLeaveRequestsCategoryBySectorIdAndCompanyIdAndLeaveRequestsStatusId(Integer sectorId, Integer companyId, Integer leaveRequestStatusId);

    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestsBySectorIdAndCompanyIdAndLeaveRequestsStatusId(Integer sectorId, Integer companyId, Integer leaveRequstStatusId);
}
