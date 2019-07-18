package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.model.UserUserGroupSector;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.UserRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer>, HasActiveRepository<User,Integer>, UserRepositoryCustom {
    List<User> getAllByCompanyIdAndActive(Integer companyId, byte active);
    List<User> getAllByCompanyIdAndSectorIdAndActive(Integer companyId, Integer sectorId, byte b);
   // User getByUsernameAndCompanyId(String username, Integer companyId);
    List<User> getAllByCompanyIdAndUserGroupIdAndActive(Integer companyId, Integer userGroupId, byte active);
    //List<User> getAllByUserGroupIdAndActive(Integer userGroupId, byte active);
    User getByCompanyIdAndEmailAndActive(Integer companyId, String email, byte active);
    User getByIdAndActive(Integer id, Byte active);
    User getByCompanyIdAndActive(Integer companyId, Byte active);
}
