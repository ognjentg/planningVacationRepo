package com.telegroupltd.planning_vacation_app.repository.repositoryCustom;

import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.util.UserLoginInformation;

public interface UserRepositoryCustom {
    User login(UserLoginInformation userLoginInformation);
}
