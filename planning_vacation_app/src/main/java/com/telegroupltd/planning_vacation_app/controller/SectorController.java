package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
import com.telegroupltd.planning_vacation_app.model.Company;
import com.telegroupltd.planning_vacation_app.model.Sector;
import com.telegroupltd.planning_vacation_app.repository.CompanyRepository;
import com.telegroupltd.planning_vacation_app.repository.SectorRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RequestMapping(value = "/hub/sector")
@Controller
@Scope("request")
public class SectorController extends GenericController<Sector, Integer> {

    private final SectorRepository sectorRepository;
    private final CompanyRepository companyRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public SectorController(SectorRepository sectorRepository, CompanyRepository companyRepository){
        super(sectorRepository);
        this.sectorRepository=sectorRepository;
        this.companyRepository=companyRepository;
    }

    @Override
    public @ResponseBody
    List<Sector> getAll() {
        List<Sector> sectors = cloner.deepClone(sectorRepository.getAllByActiveIs((byte)1));
        return sectors;
    }


}
