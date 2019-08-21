package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.UserGroup;
import com.telegroupltd.planning_vacation_app.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping(value = "/hub/user_group")
@Controller
@Scope("request")
public class UserGroupController extends GenericHasActiveController<UserGroup, Integer> {
    private final UserGroupRepository userGroupRepository;

    @Autowired
    UserGroupController(UserGroupRepository userGroupRepository) {
        super(userGroupRepository);
        this.userGroupRepository = userGroupRepository;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<UserGroup> getAll() {
        List<UserGroup> userGroups = userGroupRepository.getAllByActiveIs((byte) 1);
        return userGroups.stream().filter(ug -> 1 != (ug.getId()) && 2 != (ug.getId())).collect(Collectors.toList()); //hardkodovano za sada,dok ne pull-am da mogu sve izmijeniti sto trebam.
    }

}
