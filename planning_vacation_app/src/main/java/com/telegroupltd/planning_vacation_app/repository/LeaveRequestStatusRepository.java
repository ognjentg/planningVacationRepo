package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.LeaveRequestStatus;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRequestStatusRepository extends JpaRepository<LeaveRequestStatus,Integer>, HasActiveRepository<LeaveRequestStatus,Integer> {
}
