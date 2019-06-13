package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.LeaveRequestType;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestTypeRepository extends JpaRepository<LeaveRequestType,Integer>, HasActiveRepository<LeaveRequestType,Integer> {
    List<LeaveRequestType> getAll(Integer id);
}
