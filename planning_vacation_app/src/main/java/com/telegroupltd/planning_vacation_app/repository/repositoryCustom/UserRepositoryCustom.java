package com.telegroupltd.planning_vacation_app.repository.repositoryCustom;

import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.model.UserUserGroupSector;

import java.util.List;

public interface UserRepositoryCustom {
    User login(String username, String password, String companyPin);

    List<UserUserGroupSector> getAllExtendedBySectorIdAndActive(Integer companyId, Integer sectorId);
}
