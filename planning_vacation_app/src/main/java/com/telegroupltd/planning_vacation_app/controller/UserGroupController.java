package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.UserGroup;
import com.telegroupltd.planning_vacation_app.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value="/user_group")
@Controller
@Scope("request")
public class UserGroupController extends GenericHasActiveController<UserGroup,Integer> {
    private final UserGroupRepository userGroupRepository;
    @Autowired
    UserGroupController(UserGroupRepository userGroupRepository)
    {
        super(userGroupRepository);
        this.userGroupRepository = userGroupRepository;
    }
}
