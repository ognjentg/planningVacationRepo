package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.UserRepositoryCustom;
import com.telegroupltd.planning_vacation_app.util.UserLoginInformation;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class UserRepositoryImpl implements UserRepositoryCustom {

    private static final String SQL_LOGIN = "SELECT DISTINCT u.id, u.username, u.password, u.email, u.pause_flag, u.start_date ,u.first_name, u.last_name, u.salt, u.receive_mail, u.sector_id, u.photo, u.user_group_id, u.company_id, u.active " +
            "FROM user u JOIN company c ON IF(u.user_group_id=1, true, u.company_id=c.id) " +
            "WHERE u.username=? AND u.password=SHA2(u.salt+?, 512) AND IF(u.user_group_id=1, u.company_id IS NULL, c.pin=?)";

    //trebam SHA2()


    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User login(UserLoginInformation userLoginInformation) {
        List<User> user = entityManager.createNativeQuery(SQL_LOGIN, "UserMapping").setParameter(1, userLoginInformation.getUsername()).setParameter(2, userLoginInformation.getPassword()).setParameter(3, userLoginInformation.getCompanyPin()).getResultList();
        if(user == null || user.isEmpty()){
            return null;
        }
        else{
            return user.get(0);
        }
    }
}
