package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.SickLeave;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SickLeaveRepository extends JpaRepository<SickLeave,Integer>, HasActiveRepository<SickLeave,Integer> {

    List<SickLeave> getAllByActiveIs(byte i);
}
