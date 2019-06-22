package com.telegroupltd.planning_vacation_app.repository.repositoryCustom;

import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.model.UserUserGroupSector;

import java.util.List;

public interface UserRepositoryCustom {
    User login(String username, String password, String companyPin);

    List<UserUserGroupSector> getAllExtendedBySectorIdAndActive(Integer companyId, Integer sectorId);
//<<<<<<< HEAD
    List<User> getAllUsersFromSectorByUserGroupId(Integer companyId, Integer sectorId);
    List<User> getAllUsersWithoutSector(Integer companyId);
//=======

    List<UserUserGroupSector> getAllExtendedBySectorIdNullAndActive(Integer companyId);

    List<UserUserGroupSector> getAllByCompanyIdAllSectorsAndActive(Integer companyId);

//>>>>>>> 1)Implemented adding new user in selected sector in usergroup.js  2)Changed usergroup.js-added option "Bez sektora" to combo, added tooltips, added rules for adding new user, added refresing datatable after adding new user,...  3)fixed on backend-getting all sectors by companyId for admin, director and secretary 4)Fixed User model class, so it knows there exists some inheritance 5)Fixed adding new user in UserController
}
