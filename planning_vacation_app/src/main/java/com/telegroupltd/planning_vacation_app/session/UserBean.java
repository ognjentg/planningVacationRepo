package com.telegroupltd.planning_vacation_app.session;

import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.model.UserUserGroupKey;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Scope("session")
public class UserBean implements Serializable {
    private UserUserGroupKey userUserGroupKey;
    private boolean authorized=false;

    public UserUserGroupKey getUserUserGroupKey() {
        return userUserGroupKey;
    }

    public void setUserUserGroupKey(UserUserGroupKey userUserGroupKey) {
        this.userUserGroupKey = userUserGroupKey;
    }

    public boolean isAuthorized() {
        return authorized;
    }

    public void setAuthorized(boolean authorized) {
        this.authorized = authorized;
    }
}
