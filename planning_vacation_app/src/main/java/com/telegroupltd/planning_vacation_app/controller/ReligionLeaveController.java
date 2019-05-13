package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.ReligionLeave;
import com.telegroupltd.planning_vacation_app.repository.ReligionLeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value="/religion_leave")
@Controller
@Scope("request")
public class ReligionLeaveController extends GenericHasActiveController<ReligionLeave,Integer> {
    private final ReligionLeaveRepository religionLeaveRepository;
    @Autowired
    ReligionLeaveController(ReligionLeaveRepository religionLeaveRepository)
    {
        super(religionLeaveRepository);
        this.religionLeaveRepository = religionLeaveRepository;
    }
}
