package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.LeaveRequestStatus;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestStatusRepository extends JpaRepository<LeaveRequestStatus,Integer>, HasActiveRepository<LeaveRequestStatus,Integer> {
    List<LeaveRequestStatus> getAllByActiveIs(byte i);

}
