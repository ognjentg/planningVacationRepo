package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.SickLeaveUserSickLeaveStatus;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.SickLeaveRepositoryCustom;
import org.springframework.transaction.annotation.Transactional;

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
            "WHERE sl.active = 1;";



    private static final String SQL_UPDATE_SICK_LEAVE_STATUS_UNJUSTUFIED= "UPDATE sick_leave sl "+
            " JOIN sick_leave_status sls ON  sl.sick_leave_status_id = sls.id "+
            " JOIN user u ON sl.user_id = u.id "+
            " SET sl.sick_leave_status_id = 3 "+
            "  where sl.id =?; ";

    private static final String SQL_UPDATE_SICK_LEAVE_STATUS_JUSTUFIED= "UPDATE sick_leave sl "+
            " JOIN sick_leave_status sls ON  sl.sick_leave_status_id = sls.id "+
            " JOIN user u ON sl.user_id = u.id "+
            " SET sl.sick_leave_status_id = 2 "+
            "  where sl.id =?; ";

   private static final String SQL_GET_SICK_LEAVE_FILTERED_BY_SICK_LEAVE_STATUS  = "SELECT sl.id, date_from, date_to,u.first_name,u.last_name, sls.name AS status_name "+
           "FROM sick_leave sl " + "JOIN sick_leave_status sls ON sl.sick_leave_status_id = sls.id "+
           "JOIN user u ON sl.user_id = u.id "+
           "WHERE sl.active = 1 AND sls.key=?; ";

    @Override
    public List<SickLeaveUserSickLeaveStatus> getSickLeaveUserSickLeaveStatusInformation(Integer id) {
       return entityManager.createNativeQuery(SQL_MANAGER,"SickLeaveUserSickLeaveStatusMapping").getResultList();
    }

    @Override
    public List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredBySickLeaveStatus(Integer id,Integer key) {
        return entityManager.createNativeQuery(SQL_GET_SICK_LEAVE_FILTERED_BY_SICK_LEAVE_STATUS,"SickLeaveUserSickLeaveStatusMapping").setParameter(1,key).getResultList();
    }

    @Override
    @Transactional
    public void updateSickLeaveStatusUnjustified(Integer sickLeaveId) {
        try{
            entityManager.createNativeQuery(SQL_UPDATE_SICK_LEAVE_STATUS_UNJUSTUFIED).setParameter(1,sickLeaveId).executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public void updateSickLeaveStatusJustified(Integer sickLeaveId) {
        try{
            entityManager.createNativeQuery(SQL_UPDATE_SICK_LEAVE_STATUS_JUSTUFIED).setParameter(1,sickLeaveId).executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
