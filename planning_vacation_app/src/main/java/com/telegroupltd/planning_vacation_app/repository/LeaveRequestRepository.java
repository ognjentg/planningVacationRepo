package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.LeaveRequest;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer>, HasActiveRepository<LeaveRequest,Integer> {
    List<LeaveRequest> getBySenderUserIdAndActive(Integer senderUserId, byte active);

    List<LeaveRequest> getByApproverUserIdAndActive(Integer approverUserId, byte active);


}