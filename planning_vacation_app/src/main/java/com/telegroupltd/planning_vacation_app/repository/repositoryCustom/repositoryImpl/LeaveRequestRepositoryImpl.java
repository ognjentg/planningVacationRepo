package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.AbsenceHistoryUser;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestUserLeaveRequestStatus;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.LeaveRequestRepositoryCustom;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class LeaveRequestRepositoryImpl implements LeaveRequestRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    private static final String SQL_ALL = "SELECT lr.id, category, sender_comment, approver_comment, sender_user_id, u.first_name, u.last_name, lrs.name AS status_name, min(lrd.date) AS date_from, max(lrd.date) AS date_to, lrt.name AS type_name, au.first_name AS approver_user_first_name, au.last_name AS approver_user_last_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id=u.id "+
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id "+
            "JOIN leave_request_type lrt ON lr.leave_type_id=lrt.id "+
            "JOIN user au ON lr.approver_user_id=au.id OR lr.approver_user_id IS NULL " +
            "WHERE lr.active=1 "+
            "GROUP BY lr.id ";

    private static final String SQL_SHOW_ON_WAIT_REQUESTS = "SELECT lr.id, category, sender_comment, approver_comment,sender_user_id, u.first_name, u.last_name, lrs.name AS status_name, lrt.name AS type_name, au.first_name AS approver_user_first_name, au.last_name AS approver_user_last_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id=u.id "+
            "JOIN leave_request_type lrt ON lr.leave_type_id=lrt.id "+
            "JOIN user au ON lr.approver_user_id=au.id OR lr.approver_user_id IS NULL " +
            "WHERE lr.active=1 AND lr.leave_request_status_id = 1";

    private static final String SQL_UPDATE_LEAVE_REQUEST_STATUS_REJECTED = "UPDATE leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id = u.id "+
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id "+
            "SET lr.leave_request_status_id = 3 , lr.approver_comment=?, lrd.canceled=1 "+
            "WHERE lr.id=? ";

    private static final String SQL_UPDATE_LEAVE_REQUEST_STATUS_APPROVED = "UPDATE leave_request lr " +
            "JOIN leave_request_status lrs ON lr.leave_request_status_id=lrs.id " +
            "JOIN user u ON lr.sender_user_id=u.id " +
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id " +
            "JOIN vacation_days v on u.id = v.user_id " +
            "SET lr.leave_request_status_id=2,lr.approver_user_id=?,lr.leave_type_id=?,lrd.paid=? " +
            "WHERE lr.id=? AND lrd.leave_request_id=lr.id ";

    private static final String SQL_UPDATE_LEAVE_REQUEST_STATUS_CANCELLATION = "UPDATE leave_request lr " +
            "JOIN leave_request_status lrs ON lr.leave_request_status_id=lrs.id " +
            "JOIN user u ON lr.sender_user_id=u.id " +
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id " +
            "JOIN vacation_days v on u.id = v.user_id " +
            "SET lr.leave_request_status_id=6,lr.approver_user_id=?,lr.leave_type_id=?,lrd.paid=? " +
            "WHERE lr.id=? AND lrd.leave_request_id=lr.id ";

    private static final String SQL_GET_LEAVE_REQUEST_FILTERED_BY_STATUS = "SELECT lr.id, category, sender_comment, approver_comment, sender_user_id, u.first_name, u.last_name, lrs.name AS status_name, min(lrd.date) AS date_from, max(lrd.date) as date_to, lrt.name AS type_name, au.first_name AS approver_user_first_name, au.last_name AS approver_user_last_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id = u.id "+
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id "+
            "JOIN leave_request_type lrt ON lr.leave_type_id=lrt.id "+
            "JOIN user au ON lr.approver_user_id=au.id OR lr.approver_user_id IS NULL " +
            "WHERE lr.active = 1 AND lrs.key=? "+
            "GROUP BY lr.id ";

    private static final String SQL_GET_LEAVE_REQUEST_INFO_BY_ID="SELECT lr.id, category, sender_comment, approver_comment,sender_user_id, u.first_name, u.last_name, lrs.name AS status_name, min(lrd.date) AS date_from, max(lrd.date) AS date_to, lrt.name AS type_name, au.first_name AS approver_user_first_name, au.last_name AS approver_user_last_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id=u.id "+
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id "+
            "JOIN leave_request_type lrt ON lr.leave_type_id=lrt.id "+
            "JOIN user au ON lr.approver_user_id=au.id OR lr.approver_user_id IS NULL " +
            "WHERE lr.active=1 AND lr.id=? ";


    private static final String SQL_ALL_REQUESTS_FOR_USER = "SELECT lr.id, category, sender_comment, approver_comment, sender_user_id, u.first_name, u.last_name, lrs.name AS status_name, min(lrd.date) AS date_from, max(lrd.date) AS date_to, lrt.name AS type_name, au.first_name AS approver_user_first_name, au.last_name AS approver_user_last_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id=u.id "+
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id "+
            "JOIN leave_request_type lrt ON lr.leave_type_id=lrt.id "+
            "JOIN user au ON lr.approver_user_id=au.id OR lr.approver_user_id IS NULL " +
            "WHERE lr.active=1 AND sender_user_id=? "+
            "GROUP BY lr.id ";

    private static final String SQL_ALL_ABSENCES_HISTORY_USER = "SELECT lr.id,lrs.name AS status_name, category, min(lrd.date) as date_from, max(lrd.date) as date_to "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN  leave_request_date lrd  ON lrd.leave_request_id=lr.id "+
            //"WHERE lr.active=1 AND lr.category = 'Odsustvo' AND sender_user_id =? "+
            "WHERE lr.active=1 AND sender_user_id =? "+
            "GROUP BY lr.id ";


    @Override
    public List<AbsenceHistoryUser> getAbsenceHistoryUserInfo(Integer id, Integer key) {
        return entityManager.createNativeQuery(SQL_ALL_ABSENCES_HISTORY_USER,"AbsenceHistoryUserMapping").setParameter(1,key).getResultList();
    }

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationByUserId(Integer id) {
        return entityManager.createNativeQuery(SQL_ALL_REQUESTS_FOR_USER,"LeaveRequestUserLeaveRequestStatusMapping").setParameter(1,id).getResultList();
    }


    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformation(Integer id) {
        return entityManager.createNativeQuery(SQL_ALL,"LeaveRequestUserLeaveRequestStatusMapping").getResultList();
    }

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestFilteredByLeaveRequestStatus(Integer id, String key) {
        return entityManager.createNativeQuery(SQL_GET_LEAVE_REQUEST_FILTERED_BY_STATUS,"LeaveRequestUserLeaveRequestStatusMapping").setParameter(1,key).getResultList();
    }

    @Override
    @Transactional
    public void updateLeaveRequestStatusRejected(Integer leaveRequestId, String approverComment) {
        try{
            entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_REJECTED).setParameter(2,leaveRequestId).setParameter(1,approverComment).executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    @Transactional
    public void updateLeaveRequestStatusApproved(Integer leaveRequestId, Integer leaveRequestTypeId, Byte paid, Integer approverId) {
        try{
            entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_CANCELLATION).setParameter(3,paid).setParameter(2, leaveRequestTypeId).setParameter(4,leaveRequestId).setParameter(1,approverId).executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    @Transactional
    public void updateLeaveRequestStatusCancelation(Integer leaveRequestId, Integer leaveRequestTypeId, Byte paid, Integer approverId) {
        try{
            entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_APPROVED).setParameter(3,paid).setParameter(2, leaveRequestTypeId).setParameter(4,leaveRequestId).setParameter(1,approverId).executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationForWait(Integer id) {
        return entityManager.createNativeQuery(SQL_SHOW_ON_WAIT_REQUESTS,"LeaveRequestUserLeaveRequestStatusMapping").getResultList();
    }

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationById(Integer id){
        return entityManager.createNativeQuery(SQL_GET_LEAVE_REQUEST_INFO_BY_ID, "LeaveRequestUserLeaveRequestStatusMapping").setParameter(1, id).getResultList();
    }

}
