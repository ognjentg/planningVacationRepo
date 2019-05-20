package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.UserRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer>, HasActiveRepository<User,Integer>, UserRepositoryCustom {
    List<User> getAllByCompanyIdAndActive(Integer companyId, byte active);
    List<User> getAllByCompanyIdAndSectorIdAndActive(Integer companyId, Integer sectorId, byte b);
    User getByUsernameAndCompanyId(String username, Integer companyId);
    User getByEmail(String email);

}
