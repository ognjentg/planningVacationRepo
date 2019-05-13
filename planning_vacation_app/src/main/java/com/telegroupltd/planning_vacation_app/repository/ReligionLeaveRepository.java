package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.ReligionLeave;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReligionLeaveRepository extends JpaRepository<ReligionLeave, Integer>, HasActiveRepository<ReligionLeave, Integer> {
}
