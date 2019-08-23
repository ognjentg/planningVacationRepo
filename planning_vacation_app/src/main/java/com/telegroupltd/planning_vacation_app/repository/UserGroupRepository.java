package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.UserGroup;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroupRepository extends JpaRepository<UserGroup, Integer>, HasActiveRepository<UserGroup, Integer> {
}
