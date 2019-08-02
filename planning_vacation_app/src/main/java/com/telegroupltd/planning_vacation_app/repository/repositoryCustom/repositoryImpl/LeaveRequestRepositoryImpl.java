package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.AbsenceHistoryUser;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestDate;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestLeaveRequestDays;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestUserLeaveRequestStatus;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.LeaveRequestRepositoryCustom;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
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
            "GROUP BY lr.id "+
            "ORDER BY field(status_name,\"Na čekanju\",\"Otkazivanje\",\"Odobreno\",\"Odbijeno\",\"Otkazano\") ";

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

    /*private static final String SQL_UPDATE_LEAVE_REQUEST_STATUS_TO_CANCEL = "UPDATE leave_request lr " +
            "JOIN leave_request_status lrs ON lr.leave_request_status_id=lrs.id " +
            "JOIN user u ON lr.sender_user_id=u.id " +
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id " +
            "JOIN vacation_days v on u.id = v.user_id " +
            "SET lr.leave_request_status_id=6,lr.approver_user_id=?,lr.leave_type_id=?,lrd.paid=? " +
            "WHERE lr.id=? AND lrd.leave_request_id=lr.id "; */

    ///////////////////////////////////////////////////////////
    private static final String SQL_UPDATE_LEAVE_REQUEST_STATUS_TO_CANCEL = "UPDATE leave_request lr " +
            "JOIN leave_request_status lrs ON lr.leave_request_status_id=lrs.id " +
            "JOIN user u ON lr.sender_user_id=u.id " +
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id " +
            "JOIN vacation_days v on u.id = v.user_id " +
            "SET lr.leave_request_status_id=6 " +
            "WHERE lr.id=? AND lrd.leave_request_id=lr.id ";
    ////////////////////////////////////////////////////////

    private static final String SQL_GET_LEAVE_REQUEST_FILTERED_BY_STATUS = "SELECT lr.id, category, sender_comment, approver_comment, sender_user_id, u.first_name, u.last_name, lrs.name AS status_name, min(lrd.date) AS date_from, max(lrd.date) as date_to, lrt.name AS type_name, au.first_name AS approver_user_first_name, au.last_name AS approver_user_last_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id = u.id "+
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id "+
            "JOIN leave_request_type lrt ON lr.leave_type_id=lrt.id "+
            "JOIN user au ON lr.approver_user_id=au.id OR lr.approver_user_id IS NULL " +
            "WHERE lr.active = 1 AND lrs.key=? "+
            "GROUP BY lr.id ";

    private static final String GET_NUM_OF_ABSENT_FILTERED_BY_SECTOR_ID = "select distinct user.id from user " +
            "join sick_leave sl on user.id = sl.user_id " +
            "join sick_leave_status sls on sl.sick_leave_status_id = sls.id " +
            "join leave_request lr on user.id = lr.sender_user_id " +
            "join leave_request_date lrd on lr.id = lrd.leave_request_id " +
            "join leave_request_status lrs on lr.leave_request_status_id = lrs.id " +
            "where ((lrs.name = \"Odobreno\" OR lrs.name = \"Otkazivanje\" AND lr.active = 1 AND lrd.date = DATE (NOW()))" +
            " OR (DATE (NOW()) BETWEEN sl.date_from AND sl.date_to AND sl.active = 1 AND sls.name = \"Opravdano\"))  AND sector_id = ?;";

    private static final String GET_NUM_OF_ABSENT_FILTERED_BY_SECTOR_ID_AND_DATE = "select distinct user.id from user " +
            "join sick_leave sl on user.id = sl.user_id " +
            "join sick_leave_status sls on sl.sick_leave_status_id = sls.id " +
            "join leave_request lr on user.id = lr.sender_user_id " +
            "join leave_request_date lrd on lr.id = lrd.leave_request_id " +
            "join leave_request_status lrs on lr.leave_request_status_id = lrs.id " +
            "where ((lrs.name = \"Odobreno\" OR lrs.name = \"Otkazivanje\" AND lr.active = 1 AND lrd.date = DATE(?))" +
            " OR (DATE (NOW()) BETWEEN sl.date_from AND sl.date_to AND sl.active = 1 AND sls.name = \"Opravdano\"))  AND sector_id = ?;";

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


    //*****************************************
    private static final String SQL_ALL_REQUESTS_FOR_USER_FILTERED_BY_STATUS = "SELECT lr.id, category, sender_comment, approver_comment, sender_user_id, u.first_name, u.last_name, lrs.name AS status_name, min(lrd.date) AS date_from, max(lrd.date) AS date_to, lrt.name AS type_name, au.first_name AS approver_user_first_name, au.last_name AS approver_user_last_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id=u.id "+
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id "+
            "JOIN leave_request_type lrt ON lr.leave_type_id=lrt.id "+
            "JOIN user au ON lr.approver_user_id=au.id OR lr.approver_user_id IS NULL " +
            "WHERE lr.active=1 AND sender_user_id=? AND lrs.key=? "+
            "GROUP BY lr.id ";
    //*****************************************


    private static final String SQL_ALL_ABSENCES_HISTORY_USER = "SELECT lr.id,lrs.name AS status_name, category, min(lrd.date) as date_from, max(lrd.date) as date_to "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN  leave_request_date lrd  ON lrd.leave_request_id=lr.id "+
            //"WHERE lr.active=1 AND lr.category = 'Odsustvo' AND sender_user_id =? "+
            "WHERE lr.active=1 AND sender_user_id =? "+
            "GROUP BY lr.id "+
            "ORDER BY field(status_name,\"Odobreno\",\"Odbijeno\",\"Otkazivanje\",\"Otkazano\") ";


    //////////////////////////////////////////////////////////////////////////////////////////
    private static final String SQL_UPDATE_LEAVE_REQUEST_STATUS_TO_CANCELLATION = "UPDATE leave_request lr " +
            "JOIN leave_request_status lrs ON lr.leave_request_status_id=lrs.id " +
            "JOIN user u ON lr.sender_user_id=u.id " +
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id " +
            "JOIN vacation_days v on u.id = v.user_id " +
            "SET lr.leave_request_status_id=5 " +
            "WHERE lr.id=? AND lrd.leave_request_id=lr.id ";
    /////////////////////////////////////////////////////////////////////////////////////////SQL_UPDATE_LEAVE_REQUEST_STATUS_TO_APPROVED
    private static final String SQL_UPDATE_LEAVE_REQUEST_STATUS_TO_APPROVED = "UPDATE leave_request lr " +
            "JOIN leave_request_status lrs ON lr.leave_request_status_id=lrs.id " +
            "JOIN user u ON lr.sender_user_id=u.id " +
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id " +
            "JOIN vacation_days v on u.id = v.user_id " +
            "SET lr.leave_request_status_id=2 " +
            "WHERE lr.id=? AND lrd.leave_request_id=lr.id ";
    ///////////////////////////////////////////////////////////////////////////////////////////

    private static final String GET_LEAVE_REQUEST_DATES_BY_PERIOD_AND_COMPANY_ID = "select u.id as user_id, lr.id as leave_request_id, lrd.id as leave_request_date_id from leave_request_date as lrd " +
            "join leave_request lr on lrd.leave_request_id = lr.id " +
            "join user u on lr.sender_user_id = u.id " +
            "where u.active = 1 and lr.active = 1 and lrd.active = 1 and (lr.category = \"Godišnji\" or lr.category = \"Praznik\") and lrd.date between DATE (?) and DATE (?) and u.company_id = ?;";

    private static final String GET_LEAVE_REQUESTS_CATEGORY_BY_SECTOR_ID_AND_COMPANY_ID_AND_LEAVE_REQUESTS_STATUS_ID =
            "SELECT lr.category from user u join leave_request lr on u.id = lr.sender_user_id " +
                    "where u.sector_id = ? and u.company_id = ? and lr.leave_request_status_id = ?";

    private static final String GET_LEAVE_REQUESTS_BY_SECTOR_ID_AND_COMPANY_ID_AND_LEAVE_REQUESTS_STATUS_ID = "SELECT lr.id, category, sender_comment, approver_comment, sender_user_id, u.first_name, u.last_name, lrs.name AS status_name, min(lrd.date) AS date_from, max(lrd.date) AS date_to, lrt.name AS type_name, au.first_name AS approver_user_first_name, au.last_name AS approver_user_last_name "+
            "FROM leave_request lr "+
            "JOIN leave_request_status lrs ON lr.leave_request_status_id = lrs.id "+
            "JOIN user u ON lr.sender_user_id=u.id "+
            "JOIN leave_request_date lrd ON lrd.leave_request_id=lr.id "+
            "JOIN leave_request_type lrt ON lr.leave_type_id=lrt.id "+
            "JOIN user au ON lr.approver_user_id=au.id OR lr.approver_user_id IS NULL " +
            "WHERE lr.active=1 and u.sector_id = ? and u.company_id = ? and lr.leave_request_status_id = ? "+
            "GROUP BY lr.id ";

    @Override
    public List<AbsenceHistoryUser> getAbsenceHistoryUserInfo(Integer id, Integer key) {
        return entityManager.createNativeQuery(SQL_ALL_ABSENCES_HISTORY_USER,"AbsenceHistoryUserMapping").setParameter(1,key).getResultList();
    }

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationByUserId(Integer id) {
        return entityManager.createNativeQuery(SQL_ALL_REQUESTS_FOR_USER,"LeaveRequestUserLeaveRequestStatusMapping").setParameter(1,id).getResultList();
    }

    //******************************
    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationByUserIdByStatus(Integer id, String key) {
        return entityManager.createNativeQuery(SQL_ALL_REQUESTS_FOR_USER_FILTERED_BY_STATUS,"LeaveRequestUserLeaveRequestStatusMapping").setParameter(1,id).setParameter(2,key).getResultList();
    }
    //******************************


    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformation(Integer id) {
        return entityManager.createNativeQuery(SQL_ALL,"LeaveRequestUserLeaveRequestStatusMapping").getResultList();
    }

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestFilteredByLeaveRequestStatus(Integer id, String key) {
        return entityManager.createNativeQuery(SQL_GET_LEAVE_REQUEST_FILTERED_BY_STATUS,"LeaveRequestUserLeaveRequestStatusMapping").setParameter(1,key).getResultList();
    }

    @Override
    public Integer getNumOfAbsentPeopleFilteredBySectorId(Integer sectorId){
        return entityManager.createNativeQuery(GET_NUM_OF_ABSENT_FILTERED_BY_SECTOR_ID).setParameter(1, sectorId).getResultList().size();
    }

    @Override
    public Integer getNumOfAbsentPeopleFilteredBySectorIdAndDate(Integer sectorId, Date date){
        return entityManager.createNativeQuery(GET_NUM_OF_ABSENT_FILTERED_BY_SECTOR_ID_AND_DATE).setParameter(1, date).setParameter(2, sectorId).getResultList().size();
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
            //entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_CANCELLATION).setParameter(3,paid).setParameter(2, leaveRequestTypeId).setParameter(4,leaveRequestId).setParameter(1,approverId).executeUpdate();
            entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_APPROVED).setParameter(3,paid).setParameter(2, leaveRequestTypeId).setParameter(4,leaveRequestId).setParameter(1,approverId).executeUpdate();

        }catch (Exception e){
            e.printStackTrace();
        }

    }
    /*
    @Override
    @Transactional
    public void updateLeaveRequestStatusToCancel(Integer leaveRequestId, Integer leaveRequestTypeId, Byte paid, Integer approverId) {
        try{
            //entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_APPROVED).setParameter(3,paid).setParameter(2, leaveRequestTypeId).setParameter(4,leaveRequestId).setParameter(1,approverId).executeUpdate();
            entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_TO_CANCEL).setParameter(3,paid).setParameter(2, leaveRequestTypeId).setParameter(4,leaveRequestId).setParameter(1,approverId).executeUpdate();

        }catch (Exception e){
            e.printStackTrace();
        }

    }
    */

    ////////////////////////////////////////////////////////////
    @Override
    @Transactional
    public void updateLeaveRequestStatusToCancel(Integer leaveRequestId) {
        try{
            entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_TO_CANCEL).setParameter(1,leaveRequestId).executeUpdate();

        }catch (Exception e){
            e.printStackTrace();
        }

    }
    ///////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////
    @Override
    @Transactional
    public void updateLeaveRequestStatusToCancellation(Integer leaveRequestId) {
        try{
            entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_TO_CANCELLATION).setParameter(1,leaveRequestId).executeUpdate();

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public void updateLeaveRequestStatusToApproved(Integer leaveRequestId) {
        try{
            entityManager.createNativeQuery(SQL_UPDATE_LEAVE_REQUEST_STATUS_TO_APPROVED).setParameter(1,leaveRequestId).executeUpdate();

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    /////////////////////////////////////////////////////////////////////
    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationForWait(Integer id) {
        return entityManager.createNativeQuery(SQL_SHOW_ON_WAIT_REQUESTS,"LeaveRequestUserLeaveRequestStatusMapping").getResultList();
    }

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationById(Integer id){
        return entityManager.createNativeQuery(SQL_GET_LEAVE_REQUEST_INFO_BY_ID, "LeaveRequestUserLeaveRequestStatusMapping").setParameter(1, id).getResultList();
    }
    @Override
    public List<LeaveRequestLeaveRequestDays> getAllLeaveRequestDaysDaysFilteredByPeriodAndCompanyId(Date dateFrom, Date dateTo, Integer companyId){
        return entityManager.createNativeQuery(GET_LEAVE_REQUEST_DATES_BY_PERIOD_AND_COMPANY_ID, "LeaveRequestLeaveRequestDaysMapping").setParameter(1, dateFrom).setParameter(2, dateTo).setParameter(3, companyId).getResultList();
    }

    @Override
    public List<String> getLeaveRequestsCategoryBySectorIdAndCompanyIdAndLeaveRequestsStatusId(Integer sectorId, Integer companyId, Integer leaveRequestStatusId) {
        return entityManager.createNativeQuery(GET_LEAVE_REQUESTS_CATEGORY_BY_SECTOR_ID_AND_COMPANY_ID_AND_LEAVE_REQUESTS_STATUS_ID).setParameter(1, sectorId).setParameter(2, companyId).setParameter(3, leaveRequestStatusId).getResultList();
    }

    @Override
    public List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestsBySectorIdAndCompanyIdAndLeaveRequestsStatusId(Integer sectorId, Integer companyId, Integer leaveRequestStatusId) {
        return entityManager.createNativeQuery(GET_LEAVE_REQUESTS_BY_SECTOR_ID_AND_COMPANY_ID_AND_LEAVE_REQUESTS_STATUS_ID, "LeaveRequestUserLeaveRequestStatusMapping").setParameter(1, sectorId).setParameter(2, companyId).setParameter(3, leaveRequestStatusId).getResultList();
    }
}
