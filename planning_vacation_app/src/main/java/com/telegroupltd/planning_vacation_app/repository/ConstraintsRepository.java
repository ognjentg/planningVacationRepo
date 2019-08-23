package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.Constraints;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConstraintsRepository extends JpaRepository<Constraints, Integer>, HasActiveRepository<Constraints, Integer> {
    Constraints getByCompanyIdAndActive(Integer companyId, byte active);
}
