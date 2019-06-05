package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.LeaveRequestUserLeaveRequestStatus;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.LeaveRequestRepositoryCustom;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class LeaveRequestRepositoryImpl implements LeaveRequestRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    private static final String SQL_ALL = "SELECT lr.id, category, sender_comment, approver_comment, u.first_name, u.last_name, lrs.name AS status_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id=u.id "+
            "WHERE lr.active=1";

    private static final String SQL_SHOW_ON_WAIT_REQUESTS = "SELECT lr.id, category, sender_comment, approver_comment, u.first_name, u.last_name, lrs.name AS status_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id=u.id "+
            "WHERE lr.active=1 AND lr.leave_request_status_id = 1";

    private static final String SQL_UPDATE_LEAVE_REQUEST_STATUS_REJECTED = "UPDATE leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id = u.id "+
            "SET lr.leave_request_status_id = 3 , lr.approver_comment=?;"+
            "WHERE lr.id=?;";

    private static final String SQL_UPDATE_LEAVE_REQUEST_STATUS_APPROVED = "UPDATE leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id = u.id "+
            "SET lr.leave_request_status_id = 2 "+
            "WHERE lr.id=?;";

    private static final String SQL_GET_LEAVE_REQUEST_FILTERED_BY_STATUS = "SELECT lr.id, category, sender_comment, approver_comment, u.first_name, u.last_name, lrs.name AS status_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id = u.id "+
            "WHERE lr.active = 1 AND lrs.key?; ";

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformation(Integer id) {
        return entityManager.createNativeQuery(SQL_ALL,"LeaveRequestUserLeaveRequestStatusMapping").getResultList();
    }

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestFilteredByLeaveRequestStatus(Integer id, Integer key) {
        return entityManager.createNativeQuery(SQL_GET_LEAVE_REQUEST_FILTERED_BY_STATUS,"LeaveRequestUserLeaveRequestStatusMapping").getResultList();
    }

    @Override
    @Transactional
    public void updateLeaveRequestStatusRejected(Integer leaveRequestId, String approverComment) {
        try{
            entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_REJECTED).setParameter("lr.id",leaveRequestId).setParameter("lr.approver_comment",approverComment).executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public void updateLeaveRequestStatusApproved(Integer leaveRequestId) {
        try{
            entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_APPROVED).setParameter(1,leaveRequestId).executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationForWait(Integer id) {
        return entityManager.createNativeQuery(SQL_SHOW_ON_WAIT_REQUESTS,"LeaveRequestUserLeaveRequestStatusMapping").getResultList();
    }
}
