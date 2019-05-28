package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.SickLeaveUserSickLeaveStatus;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.SickLeaveRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class SickLeaveRepositoryImpl implements SickLeaveRepositoryCustom {

    //private static final String SQL_UPDATE_SECTOR="UPDATE user u SET u.sector_id=null WHERE u.sector_id=?;";

    @PersistenceContext
    private EntityManager entityManager;

    private static final String SQL_MANAGER= "SELECT sl.id, date_from, date_to,u.first_name,u.last_name, sls.name AS status_name "+
            "FROM sick_leave sl " + "JOIN sick_leave_status sls ON sl.sick_leave_status_id = sls.id "+
            "JOIN user u ON sl.user_id = u.id"+
            //"WHERE sl.active = 1 AND sl.id=?;";
            "WHERE sl.active = 1;";

    /*select sl.id, date_from, date_to, u.first_name, u.last_name#, sls.name AS status_name
    from sick_leave sl
    inner join sick_leave_status sls on sl.sick_leave_status_id = sls.id
    inner join user u on sl.user_id = u.id
    */

    @Override
    public List<SickLeaveUserSickLeaveStatus> getSickLeaveUserSickLeaveStatusInformation(Integer id) {
        //return entityManager.createNativeQuery(SQL_MANAGER,"SickLeaveUserSickLeaveStatusMapping").setParameter(1,id).getResultList();
       return entityManager.createNativeQuery(SQL_MANAGER,"SickLeaveUserSickLeaveStatusMapping").getResultList();
    }
}
