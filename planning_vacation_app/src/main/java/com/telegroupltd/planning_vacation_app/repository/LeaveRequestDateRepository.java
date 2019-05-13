package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.LeaveRequestDate;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRequestDateRepository extends JpaRepository<LeaveRequestDate,Integer>, HasActiveRepository<LeaveRequestDate,Integer> {
}
