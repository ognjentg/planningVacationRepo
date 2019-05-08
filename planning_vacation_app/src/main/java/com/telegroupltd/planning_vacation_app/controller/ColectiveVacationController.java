package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
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
public class ColectiveVacationController extends GenericController<ColectiveVacation, Integer> {
    private final ColectiveVacationRepository colectiveVacationRepository;

    @Value("${badRequest.insert}")
    private String badRequestInsert;

    @Value("${badRequest.update}")
    private String badRequestUpdate;

    @Value("${badRequest.delete}")
    private String badRequestDelete;

    @Autowired
    public ColectiveVacationController(ColectiveVacationRepository colectiveVacationRepository){
        super(colectiveVacationRepository);
        this.colectiveVacationRepository = colectiveVacationRepository;
    }
/*
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @Override
    public @ResponseBody
    ColectiveVacation insert(@RequestBody ColectiveVacation colectiveVacation) throws BadRequestException{
        if(repo.saveAndFlush(colectiveVacation) != null){
            logCreateAction(colectiveVacation);
            return colectiveVacation;
        }
        else
            throw new BadRequestException(badRequestInsert);
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @Override
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody ColectiveVacation colectiveVacation) throws BadRequestException{
        ColectiveVacation oldObject = cloner.deepClone(repo.findById(id).orElse(null));
        if(repo.saveAndFlush(colectiveVacation) != null){
            logUpdateAction(colectiveVacation, oldObject);
            return "Success";
        }
        else
            throw new BadRequestException(badRequestUpdate);
    }

    @Override
    @RequestMapping(value = {"/{id}"}, method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException{
        ColectiveVacation colectiveVacation = repo.findById(id).orElse(null);
        if(colectiveVacation != null){
            colectiveVacation.setActive((byte) 0);
            repo.saveAndFlush(colectiveVacation);
            logDeleteAction(colectiveVacation);
            return "Success";
        }
        else
            throw new BadRequestException(badRequestDelete);
    }
    */
}