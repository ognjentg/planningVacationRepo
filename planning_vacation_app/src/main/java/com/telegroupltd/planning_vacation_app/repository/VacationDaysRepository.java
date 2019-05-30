package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.VacationDays;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VacationDaysRepository extends JpaRepository<VacationDays,Integer>, HasActiveRepository<VacationDays,Integer> {
    List<VacationDays> getAllByUserIdAndActive(Integer userId, byte active);
}
