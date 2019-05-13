package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.LeaveRequestType;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRequestTypeRepository extends JpaRepository<LeaveRequestType,Integer>, HasActiveRepository<LeaveRequestType,Integer> {
}
