package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.ColectiveVacation;
import com.telegroupltd.planning_vacation_app.repository.ColectiveVacationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;



@RequestMapping(value = "/colective_vacation")
@Controller
@Scope("request")
public class ColectiveVacationController extends GenericHasActiveController<ColectiveVacation, Integer> {
    private final ColectiveVacationRepository colectiveVacationRepository;

    @Value("${badRequest.insert}")
    private String badRequestInsert;

    @Value("${badRequest.update}")
    private String badRequestUpdate;

    @Autowired
    public ColectiveVacationController(ColectiveVacationRepository colectiveVacationRepository) {
        super(colectiveVacationRepository);
        this.colectiveVacationRepository = colectiveVacationRepository;
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @Override
    public @ResponseBody
    ColectiveVacation insert(@RequestBody ColectiveVacation colectiveVacation) throws BadRequestException {
        //Check if date_from is after or equal to date_to
        if(colectiveVacation.getDateFrom().compareTo(colectiveVacation.getDateTo()) >= 0)
            throw new BadRequestException(badRequestInsert);
        if (repo.saveAndFlush(colectiveVacation) == null)
            throw new BadRequestException(badRequestInsert);
        logCreateAction(colectiveVacation);
        return colectiveVacation;
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @Override
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody ColectiveVacation colectiveVacation) throws BadRequestException, ForbiddenException {
        if(colectiveVacation.getDateFrom().compareTo(colectiveVacation.getDateTo()) >= 0)
            throw new BadRequestException(badRequestUpdate);
        return super.update(id, colectiveVacation);
    }
}