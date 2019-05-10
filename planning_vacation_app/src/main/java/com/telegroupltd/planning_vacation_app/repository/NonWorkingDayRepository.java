package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.NonWorkingDay;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NonWorkingDayRepository extends JpaRepository<NonWorkingDay, Integer>, HasActiveRepository<NonWorkingDay,Integer> {

}
