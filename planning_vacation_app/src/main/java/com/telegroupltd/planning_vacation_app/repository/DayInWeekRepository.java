package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.DayInWeek;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayInWeekRepository extends JpaRepository<DayInWeek,Integer>, HasActiveRepository<DayInWeek,Integer> {
    DayInWeek getByIdAndActive(Integer id, byte active);
    DayInWeek getByDayKey(String dayKey);
}
