package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.SickLeave;
import com.telegroupltd.planning_vacation_app.model.SickLeaveUserSickLeaveStatus;
import com.telegroupltd.planning_vacation_app.repository.SickLeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RequestMapping(value="/hub/sickLeave")
@RestController
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

    @RequestMapping(value = "/sickLeaveInfo", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSectorsInformation(){
        return sickLeaveRepository.getSickLeaveUserSickLeaveStatusInformation(userBean.getUser().getId());
    }

    @Override
    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException {
        SickLeave sickLeave = sickLeaveRepository.findById(id).orElse(null);
        cloner.deepClone(sickLeave);
        Objects.requireNonNull(sickLeave).setActive((byte)0);
        if(sickLeaveRepository.getByIdAndActive(id,(byte)1) == null){
            logDeleteAction(sickLeave);
            return "Success";
        }
        else throw new BadRequestException(badRequestDelete);
    }

}

