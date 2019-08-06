package com.telegroupltd.planning_vacation_app.model;

import java.util.Date;

public class UserUserGroupKey extends User {
    private String userGroupKey;


    public UserUserGroupKey(Integer id, String username, String password, String email, Byte pauseFlag, Date startDate, String firstName, String lastName, String salt, Byte receiveMail, Byte firstLogin, Integer sectorId, byte[] photo, Integer userGroupId, Integer company_id, Byte active, String userGroupKey) {
        super(id, username, password, email, pauseFlag, startDate, firstName, lastName, salt, receiveMail, firstLogin, sectorId, photo, userGroupId, company_id, active);
        this.userGroupKey = userGroupKey;
    }

    public UserUserGroupKey(User user, String userGroupKey){
        super(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getPauseFlag(), user.getStartDate(), user.getFirstName(), user.getLastName(), user.getSalt(), user.getReceiveMail(), user.getFirstLogin(), user.getSectorId(), user.getPhoto(), user.getUserGroupId(), user.getCompanyId(), user.getActive());
        this.userGroupKey=userGroupKey;
    }

    public String getUserGroupKey() {
        return userGroupKey;
    }

    public void setUserGroupKey(String userGroupKey) {
        this.userGroupKey = userGroupKey;
    }
}
