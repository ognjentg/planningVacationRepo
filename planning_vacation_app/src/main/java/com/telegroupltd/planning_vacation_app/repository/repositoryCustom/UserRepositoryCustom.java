package com.telegroupltd.planning_vacation_app.repository.repositoryCustom;

import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.model.UserUserGroupSector;

import java.util.List;

public interface UserRepositoryCustom {
    User login(String username, String password, String companyPin);

    List<UserUserGroupSector> getAllExtendedBySectorIdAndActive(Integer companyId, Integer sectorId);

    List<User> getAllUsersFromSectorByUserGroupId(Integer companyId, Integer sectorId);

    List<User> getAllUsersWithoutSector(Integer companyId);

    List<UserUserGroupSector> getAllExtendedBySectorIdNullAndActive(Integer companyId);

    List<UserUserGroupSector> getAllByCompanyIdAllSectorsAndActive(Integer companyId);

}
