package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.UserHasColectiveVacation;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHasColectiveVacationRepository extends JpaRepository<UserHasColectiveVacation,Integer>, HasActiveRepository<UserHasColectiveVacation,Integer> {
}
