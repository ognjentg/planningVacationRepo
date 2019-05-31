package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.NonWorkingDayInWeek;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NonWorkingDayInWeekRepository extends JpaRepository<NonWorkingDayInWeek, Integer>, HasActiveRepository<NonWorkingDayInWeek, Integer> {
    //List<NonWorkingDayInWeek> getAllByCompanyIdAndActive(Integer companyID, Byte active);
}
