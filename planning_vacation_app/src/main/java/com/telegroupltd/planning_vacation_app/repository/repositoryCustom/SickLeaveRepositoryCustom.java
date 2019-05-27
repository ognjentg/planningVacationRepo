package com.telegroupltd.planning_vacation_app.repository.repositoryCustom;

import com.telegroupltd.planning_vacation_app.model.SickLeaveUserSickLeaveStatus;

import java.util.List;

public interface SickLeaveRepositoryCustom {
    public List<SickLeaveUserSickLeaveStatus> getSickLeaveUserSickLeaveStatusInformation(Integer id);
   // void updateUsersFromSector(Integer sectorId);
}
