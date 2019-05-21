package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.UserRepositoryCustom;
import com.telegroupltd.planning_vacation_app.util.UserLoginInformation;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;

public class UserRepositoryImpl implements UserRepositoryCustom {

    private static final String SQL_LOGIN = "SELECT DISTINCT u.id, u.username, u.password, u.email, u.pause_flag, u.start_date ,u.first_name, u.last_name, u.salt, u.receive_mail, u.sector_id, u.photo, u.user_group_id, u.company_id, u.active " +
            "FROM user u JOIN company c ON IF(u.user_group_id=1, true, u.company_id=c.id) " +
            "WHERE u.email=? AND u.password=SHA2(concat(u.salt,?), 512) AND IF(u.user_group_id=1, u.company_id IS NULL, c.pin=?)";

    //trebam SHA2()

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User login(String email, String password, String companyPin) {
        System.out.println(email);
        System.out.println(password);
        System.out.println(companyPin);
        System.out.println("asaaa");
        Object[] result = (Object[])entityManager.createNativeQuery(SQL_LOGIN).setParameter(1, email).setParameter(2, password).setParameter(3, companyPin).getSingleResult();
        System.out.println("asa");
        System.out.println(result[0]);
        System.out.println(result[1]);
        System.out.println(result[2]);
        System.out.println(result[3]);
        User us = new User((Integer)result[0],(String)result[1],(String)result[2],(String)result[3],(Byte)result[4],(Date)result[5],(String)result[6],(String)result[7],(String)result[8],(Byte)result[9],(Integer)result[10],(byte[])result[11],(Integer)result[12],(Integer)result[13],(Byte)result[14] );
       return us;
    }
}
