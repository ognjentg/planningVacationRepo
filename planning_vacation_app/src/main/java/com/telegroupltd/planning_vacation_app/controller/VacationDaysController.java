package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.VacationDays;
import com.telegroupltd.planning_vacation_app.repository.VacationDaysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping(value="hub/vacation_days")
@RestController
@Scope("request")
public class VacationDaysController extends GenericHasActiveController<VacationDays,Integer> {
    private final VacationDaysRepository vacationDaysRepository;

    @Autowired
    VacationDaysController(VacationDaysRepository vacationDaysRepository)
    {
        super(vacationDaysRepository);
        this.vacationDaysRepository = vacationDaysRepository;
    }

    @RequestMapping(value = "/byUserId/{userId}", method = RequestMethod.GET)
    public @ResponseBody
    VacationDays getByUserId(@PathVariable Integer userId){
        return vacationDaysRepository.getByUserIdAndActive(userId, (byte)1);
    }

}
