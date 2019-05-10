package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
import com.telegroupltd.planning_vacation_app.model.Sector;
import com.telegroupltd.planning_vacation_app.repository.SectorRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RequestMapping(value = "/leave_request")
@Controller
@Scope("request")
public class SectorController extends GenericController<Sector, Integer> {

    private final SectorRepository sectorRepository;
    // private final CompanyRepository companyRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public UserController(SectorRepository sectorRepository/*, CompanyRepository companyRepository*/){
        super(sectorRepository);
        this.sectorRepository=sectorRepository;
        // this.companyRepository=companyRepository;
    }

}
