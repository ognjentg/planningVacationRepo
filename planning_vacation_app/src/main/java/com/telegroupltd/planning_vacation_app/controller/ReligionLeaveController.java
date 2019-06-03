package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.ReligionLeave;
import com.telegroupltd.planning_vacation_app.repository.ReligionLeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value="/hub/religion_leave")
@RestController
@Scope("request")
public class ReligionLeaveController extends GenericHasActiveController<ReligionLeave,Integer> {
    private final ReligionLeaveRepository religionLeaveRepository;
    @Autowired
    ReligionLeaveController(ReligionLeaveRepository religionLeaveRepository)
    {
        super(religionLeaveRepository);
        this.religionLeaveRepository = religionLeaveRepository;
    }

    @RequestMapping(value = "/byUserId/{userId}", method = RequestMethod.GET)
    ReligionLeave getByUserId(@PathVariable Integer userId){
        return religionLeaveRepository.getByUserIdAndActive(userId, (byte)1);
    }

}
