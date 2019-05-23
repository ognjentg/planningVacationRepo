package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.SickLeave;
import com.telegroupltd.planning_vacation_app.repository.SickLeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@RequestMapping(value="/sick_leave")
@Controller
@Scope("request")
public class SickLeaveController extends GenericHasActiveController<SickLeave,Integer> {
    private final SickLeaveRepository sickLeaveRepository;

    @Value("Brisanje nije moguće.")
    private String badRequestDelete;

    @Autowired
    SickLeaveController(SickLeaveRepository sickLeaveRepository)
    {
        super(sickLeaveRepository);
        this.sickLeaveRepository = sickLeaveRepository;
    }

    @Override
    public @ResponseBody
    List<SickLeave> getAll() {
        List<SickLeave> sickLeaveList = cloner.deepClone(sickLeaveRepository.getAllByActiveIs((byte)1));
        return sickLeaveList;
    }
}
