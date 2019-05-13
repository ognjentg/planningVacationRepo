package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.VacationDays;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacationDaysRepository extends JpaRepository<VacationDays,Integer>, HasActiveRepository<VacationDays,Integer> {
}
