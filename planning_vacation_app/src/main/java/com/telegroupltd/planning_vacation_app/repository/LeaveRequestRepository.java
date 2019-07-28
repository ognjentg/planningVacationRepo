package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.LeaveRequest;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.LeaveRequestRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer>, HasActiveRepository<LeaveRequest,Integer>, LeaveRequestRepositoryCustom {
    List<LeaveRequest> getBySenderUserIdAndActive(Integer senderUserId, byte active);

    List<LeaveRequest> getByApproverUserIdAndActive(Integer approverUserId, byte active);

    List<LeaveRequest> getAllByCompanyIdAndActiveAndLeaveRequestStatusId(Integer companyId, byte active, Integer leaveRequestId);
    List<LeaveRequest> getAllByCompanyIdAndActiveAndLeaveRequestStatusIdAndSenderUserId(Integer companyId, byte active, Integer leaveRequestId, Integer id);
    List<LeaveRequest> getAllBySenderUserIdAndLeaveRequestStatusIdAndActive(Integer senderUserId, Integer leaveReqStatusId, byte active);
}