package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.Company;
import com.telegroupltd.planning_vacation_app.model.Sector;
import com.telegroupltd.planning_vacation_app.model.SectorUser;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.CompanyRepository;
import com.telegroupltd.planning_vacation_app.repository.SectorRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import com.telegroupltd.planning_vacation_app.util.SectorInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping(value = "/hub/sector")
@Controller
@Scope("request")
public class SectorController extends GenericHasActiveController<Sector, Integer> {

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
        return sectorRepository.getAllByCompanyIdAndActive(userBean.getUser().getCompanyId(), (byte)1);
        // return sectors = sectorRepository.getAllByActiveIs((byte)1);

    }

    @SuppressWarnings("SameReturnValue")
    @RequestMapping(value = "/numberOfSectors", method = RequestMethod.GET)
    public @ResponseBody
    int numberOfSectors(HttpServletRequest request) throws ForbiddenException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        List<Sector> sectors = sectorRepository.getAllByActiveIs((byte) 1);  //List<T> getAllByActiveIs(Byte active);

        return sectors.size();
    }

    @RequestMapping(value = "/sectorInfo", method = RequestMethod.GET)
    public @ResponseBody
    List<SectorUser> getSectorsInformation(){
        return sectorRepository.getSectorsInformation();
    }

}
