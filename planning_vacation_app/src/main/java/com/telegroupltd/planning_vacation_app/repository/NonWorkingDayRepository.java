package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.NonWorkingDay;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NonWorkingDayRepository extends JpaRepository<NonWorkingDay, Integer>, HasActiveRepository<NonWorkingDay,Integer> {

    List<NonWorkingDay> getAllByCompanyIdAndActive(Integer companyID, Byte active);

    List<NonWorkingDay> getNonWorkingDaysByCompanyId(Integer companyID);
}
