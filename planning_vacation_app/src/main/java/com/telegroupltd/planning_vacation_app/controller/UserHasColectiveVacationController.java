package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.UserHasColectiveVacation;
import com.telegroupltd.planning_vacation_app.repository.UserHasColectiveVacationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value = "/user_has_colective_vacation")
@Controller
@Scope("request")
public class UserHasColectiveVacationController extends GenericHasActiveController<UserHasColectiveVacation, Integer> {
    private final UserHasColectiveVacationRepository userHasColectiveVacationRepository;

    @Autowired
    UserHasColectiveVacationController(UserHasColectiveVacationRepository userHasColectiveVacationRepository) {
        super(userHasColectiveVacationRepository);
        this.userHasColectiveVacationRepository = userHasColectiveVacationRepository;
    }
}
