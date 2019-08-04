package com.telegroupltd.planning_vacation_app.repository.repositoryCustom;

import com.telegroupltd.planning_vacation_app.model.Sector;
import com.telegroupltd.planning_vacation_app.model.SectorUser;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.util.SectorInformation;

import java.util.List;

public interface SectorRepositoryCustom {
    List<SectorUser> getSectorsInformation(Integer companyId);
    void updateUsersFromSector(Integer sectorId);
    Integer getNumberOfUsersInSector(Integer sectorId);
}
