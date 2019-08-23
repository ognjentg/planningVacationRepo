package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.SickLeave;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.SickLeaveRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SickLeaveRepository extends JpaRepository<SickLeave, Integer>, HasActiveRepository<SickLeave, Integer>, SickLeaveRepositoryCustom {

}
