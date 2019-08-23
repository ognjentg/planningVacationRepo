package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.ColectiveVacation;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ColectiveVacationRepository extends JpaRepository<ColectiveVacation, Integer>, HasActiveRepository<ColectiveVacation, Integer> {
    List<ColectiveVacation> getAllByCompanyIdAndActive(Integer companyId, byte active);
}