package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.NonWorkingDay;
import com.telegroupltd.planning_vacation_app.repository.NonWorkingDayRepository;
import com.telegroupltd.planning_vacation_app.session.UserBean;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping(value = "/hub/nonWorkingDay")
@Controller
@Scope("request")
public class NonWorkingDayController extends GenericHasActiveController<NonWorkingDay, Integer> {
    private final NonWorkingDayRepository nonWorkingDayRepository;

    public NonWorkingDayController(NonWorkingDayRepository nonWorkingDayRepository) {
        super(nonWorkingDayRepository);
        this.nonWorkingDayRepository=nonWorkingDayRepository;
    }


    @Override
    @Transactional
    public List<NonWorkingDay> getAll() throws ForbiddenException {
        return nonWorkingDayRepository.getAllByCompanyIdAndActive(userBean.getUser().getCompanyId(),(byte) 1);
    }



}
