package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
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
import com.telegroupltd.planning_vacation_app.session.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping(value = "/hub/sector")
@RestController
@Scope("request")
public class SectorController extends GenericHasActiveController<Sector, Integer> {

    private final SectorRepository sectorRepository;
    private final CompanyRepository companyRepository;

    @Value("Ne postoji sektor.")
    private String badRequestNoSector;
    @Value("Ažuriranje nije moguće.")
    private String badRequestUpdate;

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
        return sectorRepository.getSectorsInformation(userBean.getUser().getCompanyId());
    }

    @RequestMapping(value = "/updateUsersFromSector/{sectorId}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateSectorsUsers(@PathVariable Integer sectorId){
        sectorRepository.updateUsersFromSector(sectorId);
    }

    @RequestMapping(value = "/{companyId}/{managerId}", method = RequestMethod.GET)
    public @ResponseBody
    Sector getSectorByManagerIdAndCompanyId(@PathVariable Integer companyId, @PathVariable Integer managerId){
        return sectorRepository.getBySectorManagerIdAndCompanyId(managerId, companyId);
    }

    @Override
    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody Sector newSector) throws BadRequestException {
        Sector sector = sectorRepository.findById(id).orElse(null);
        if(sector != null) {
            if(repo.saveAndFlush(newSector) != null) {
                return "Success";
            }
            throw new BadRequestException(badRequestUpdate);
        }
        throw new BadRequestException(badRequestNoSector);
    }
}
