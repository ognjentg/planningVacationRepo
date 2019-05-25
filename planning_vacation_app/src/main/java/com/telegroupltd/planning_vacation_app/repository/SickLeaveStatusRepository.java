package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.SickLeaveStatus;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SickLeaveStatusRepository extends JpaRepository<SickLeaveStatus,Integer>, HasActiveRepository<SickLeaveStatus,Integer> {
    List<SickLeaveStatus> getAllByActiveIs(byte i);
}
