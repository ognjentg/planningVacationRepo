package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.Sector;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.SectorRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SectorRepository extends JpaRepository<Sector, Integer>, HasActiveRepository<Sector, Integer>, SectorRepositoryCustom {
    List<Sector> getAllByCompanyIdAndActive(Integer companyId, byte b);

    Sector getBySectorManagerIdAndCompanyId(Integer managerId, Integer companyId);
}
