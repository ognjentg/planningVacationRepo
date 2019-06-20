package com.telegroupltd.planning_vacation_app.repository.repositoryCustom;

import com.telegroupltd.planning_vacation_app.model.SickLeaveUserSickLeaveStatus;

import java.util.List;

public interface SickLeaveRepositoryCustom {
    List<SickLeaveUserSickLeaveStatus> getSickLeaveUserSickLeaveStatusInformation(Integer id);
    List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredBySickLeaveStatus(Integer id,Integer key);
    List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredByUserId(Integer id,Integer key);
    void updateSickLeaveStatusUnjustified(Integer sickLeaveId);
    void updateSickLeaveStatusJustified(Integer sickLeaveId);
    List<SickLeaveUserSickLeaveStatus> getSickLeaveUserSickLeaveStatusInformationForWait(Integer id);
}
