package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectorRepository extends JpaRepository<Sector, Integer>, HasActiveRepository<Sector,Integer> {
}
