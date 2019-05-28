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
            "JOIN user u ON sl.user_id = u.id "+
            //"WHERE sl.active = 1 AND sl.id=?; ";
            "WHERE sl.active = 1;";

   /* private static final String SQL_GET_ALL_EXTENDED_BY_SECTOR_ID = "SELECT u.id, u.first_name, u.last_name, u.email, u.company_id, ug.name as 'position', s.id as 'sector_id',s.name as 'sector_name'" +
            "FROM user u LEFT JOIN sector s on u.sector_id=s.id JOIN user_group ug ON u.user_group_id=ug.id " +
            "WHERE u.company_id=? AND s.id=? AND u.active=1 " ;*/

   private static final String SQL_GET_SICK_LEAVE_FILTERED_BY_SICK_LEAVE_STATUS  = "SELECT sl.id, date_from, date_to,u.first_name,u.last_name, sls.name AS status_name "+
           "FROM sick_leave sl " + "JOIN sick_leave_status sls ON sl.sick_leave_status_id = sls.id "+
           "JOIN user u ON sl.user_id = u.id "+
           //"WHERE sl.active = 1 AND sls.name=?; ";
           "WHERE sl.active = 1 AND sls.key=?; ";
    @Override
    public List<SickLeaveUserSickLeaveStatus> getSickLeaveUserSickLeaveStatusInformation(Integer id) {
        //return entityManager.createNativeQuery(SQL_MANAGER,"SickLeaveUserSickLeaveStatusMapping").setParameter(1,id).getResultList();
       return entityManager.createNativeQuery(SQL_MANAGER,"SickLeaveUserSickLeaveStatusMapping").getResultList();
    }

    @Override
    public List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredBySickLeaveStatus(Integer id,Integer key) {
        //return entityManager.createNativeQuery(SQL_GET_ALL_EXTENDED_BY_SECTOR_ID, "UserUserGroupSectorMapping").setParameter(1, companyId).setParameter(2, sectorId).getResultList();
        return entityManager.createNativeQuery(SQL_GET_SICK_LEAVE_FILTERED_BY_SICK_LEAVE_STATUS,"SickLeaveUserSickLeaveStatusMapping").setParameter(1,key).getResultList();
    }
}
