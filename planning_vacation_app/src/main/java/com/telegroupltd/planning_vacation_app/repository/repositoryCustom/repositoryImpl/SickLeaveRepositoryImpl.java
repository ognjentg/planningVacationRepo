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

    private static final String SQL_MANAGER= "SELECT id, date_from, date_to"+ /*"SELECT s.id,s.name,s.max_percentage_absent_people,u.id as sectorManagerId,u.first_name,u.last_name " + */
            "FROM sick_leave"+
            "WHERE active = 1 AND id=?;";
           /* "FROM sector s JOIN user u ON s.sector_manager_id = u.id " +
            "WHERE s.active=1 AND s.company_id=?;";*/

    @Override
    public List<SickLeaveUserSickLeaveStatus> getSickLeaveUserSickLeaveStatusInformation(Integer id) {
        return entityManager.createNativeQuery(SQL_MANAGER,"SickLeaveUserSickLeaveStatusMapping").setParameter(1,id).getResultList();
    }
}
