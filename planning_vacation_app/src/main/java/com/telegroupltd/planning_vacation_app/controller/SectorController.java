package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.*;
import com.telegroupltd.planning_vacation_app.repository.*;
import com.telegroupltd.planning_vacation_app.util.MonthUserNo;
import com.telegroupltd.planning_vacation_app.util.SetAbscentPercent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@SuppressWarnings("ALL")
@RequestMapping(value = "/hub/sector")
@RestController
@Scope("request")
public class SectorController extends GenericHasActiveController<Sector, Integer> {
    private final SectorRepository sectorRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    @Autowired
    private LeaveRequestDateRepository leaveRequestDateRepository;
    @Autowired
    private UserRepository userRepository;


    @Value("Ne postoji sektor.")
    private String badRequestNoSector;
    @Value("Ažuriranje nije moguće.")
    private String badRequestUpdate;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public SectorController(SectorRepository sectorRepository, CompanyRepository companyRepository, LeaveRequestRepository leaveRequestRepository, LeaveRequestDateRepository leaveRequestDateRepository, UserRepository userRepository) {
        super(sectorRepository);
        this.sectorRepository = sectorRepository;
    }

    @Override
    public @ResponseBody
    List<Sector> getAll() {
        return sectorRepository.getAllByCompanyIdAndActive(userBean.getUserUserGroupKey().getCompanyId(), (byte) 1);
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
    List<SectorUser> getSectorsInformation() {
        return sectorRepository.getSectorsInformation(userBean.getUserUserGroupKey().getCompanyId());
    }

    @Override
    public Sector findById(Integer sectorId) {
        return sectorRepository.getByIdAndActive(sectorId, (byte) 1);
    }

    @RequestMapping(value = "/getMaxAbscentBySector/{id}", method = RequestMethod.GET)
    public @ResponseBody
    Double getMaxAbscentBySector(@PathVariable Integer id) {
        Sector sec = sectorRepository.getByIdAndActive(id, (byte) 1);
        if (sec != null) {
            return sec.getMaxPercentageAbsentPeople();
        } else return 105.0;
    }

    @RequestMapping(value = "/updateUsersFromSector/{sectorId}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateSectorsUsers(@PathVariable Integer sectorId) {
        sectorRepository.updateUsersFromSector(sectorId);
    }

    @RequestMapping(value = "/{companyId}/{managerId}", method = RequestMethod.GET)
    public @ResponseBody
    Sector getSectorByManagerIdAndCompanyId(@PathVariable Integer companyId, @PathVariable Integer managerId) {
        return sectorRepository.getBySectorManagerIdAndCompanyId(managerId, companyId);
    }

    @RequestMapping(value = "/setAbscentPercent", method = RequestMethod.POST)
    public @ResponseBody
    boolean setAbscentPercent(@RequestBody SetAbscentPercent sap) {
        Sector sector = sectorRepository.findById(sap.getId()).orElse(null);
        if (sector != null) {
            sector.setMaxPercentageAbsentPeople(sap.getPercent());
            repo.saveAndFlush(sector);
            return true;
        } else return true;
    }


    @Override
    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody Sector newSector) throws BadRequestException {
        Sector sector = sectorRepository.findById(id).orElse(null);
        if (sector != null) {
            if (repo.saveAndFlush(newSector) != null) {
                return "Success";
            }
            throw new BadRequestException(badRequestUpdate);
        }
        throw new BadRequestException(badRequestNoSector);
    }

    @RequestMapping(value = "/statistics/sector/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<MonthUserNo> getStatisticsForSector(@PathVariable Integer id) throws BadRequestException {

        Integer companyId = userBean.getUserUserGroupKey().getCompanyId();
        List<String> leaveRequests = leaveRequestRepository.getLeaveRequestsCategoryBySectorIdAndCompanyIdAndLeaveRequestsStatusId(id, companyId, 2);

        Double vacation = 0.0, religion = 0.0, leave = 0.0;  //kategorija godisnji, odsustvo i praznik

        for (String leaveRequest : leaveRequests) {
            switch (leaveRequest) {
                case "Godišnji":
                    vacation += 1;
                    break;
                case "Praznik":
                    religion += 1;
                    break;
                case "Odsustvo":
                    leave += 1;
                    break;
            }
        }
        List<MonthUserNo> monthUserNoList = new ArrayList<>();

        Double sum = vacation + religion + leave;

        if (sum == 0) {
            MonthUserNo monthUserNo = new MonthUserNo("Nema podataka", 0, "000000");
            return monthUserNoList;
        }

        MonthUserNo monthUserNo1 = new MonthUserNo(CompanyController.round(vacation / sum * 100, 2), "Godišnji", "#e6194B");
        MonthUserNo monthUserNo2 = new MonthUserNo(CompanyController.round(religion / sum * 100, 2), "Praznik", "#42d4f4");
        MonthUserNo monthUserNo3 = new MonthUserNo(CompanyController.round(leave / sum * 100, 2), "Odsustvo", "#bfef45");

        monthUserNoList.add(monthUserNo1);
        monthUserNoList.add(monthUserNo2);
        monthUserNoList.add(monthUserNo3);

        return monthUserNoList;
    }

    @RequestMapping(value = "/statistics/sector/new/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<MonthUserNo> getStatisticUser(@PathVariable Integer id) throws BadRequestException {
        // Integer companyId = 1;
        Integer companyId = userBean.getUserUserGroupKey().getCompanyId();
        List<User> usersInCompany = userRepository.getAllByCompanyIdAndSectorIdAndActive(companyId, id, (byte) 1);
        List<LeaveRequestUserLeaveRequestStatus> leaveRequests = leaveRequestRepository.getLeaveRequestsBySectorIdAndCompanyIdAndLeaveRequestsStatusId(id, companyId, 2);

        List<Integer> numberOfWorkersOnVacationByMonthsAndVerticalScale = new ArrayList<>();
        Integer january = 0, february = 0, march = 0, april = 0, may = 0, jun = 0, july = 0, august = 0, september = 0, october = 0, november = 0, december = 0, verticalScale = 0;
        Integer vacation1 = 0, vacation2 = 0, vacation3 = 0, vacation4 = 0, vacation5 = 0, vacation6 = 0, vacation7 = 0, vacation8 = 0, vacation9 = 0, vacation10 = 0, vacation11 = 0, vacation12 = 0;
        Integer religion1 = 0, religion2 = 0, religion3 = 0, religion4 = 0, religion5 = 0, religion6 = 0, religion7 = 0, religion8 = 0, religion9 = 0, religion10 = 0, religion11 = 0, religion12 = 0;
        Integer leave1 = 0, leave2 = 0, leave3 = 0, leave4 = 0, leave5 = 0, leave6 = 0, leave7 = 0, leave8 = 0, leave9 = 0, leave10 = 0, leave11 = 0, leave12 = 0;

        for (LeaveRequest leaveRequest : leaveRequests) {
            List<LeaveRequestDate> leaveRequestDates = leaveRequestDateRepository.getAllByLeaveRequestIdAndActive(leaveRequest.getId(), (byte) 1);
            if (leaveRequestDates.size() < 1)
                break;
            leaveRequestDates.sort(Comparator.comparing(LeaveRequestDate::getDate));
            java.util.Date firstDay = leaveRequestDates.get(0).getDate();
            java.util.Date lastDay = leaveRequestDates.get(leaveRequestDates.size() - 1).getDate();

            if (firstDay.getMonth() == lastDay.getMonth()) {
                java.util.Date date = firstDay;
                if (date.getYear() == new java.util.Date().getYear()) {
                    switch (date.getMonth()) {
                        case 1:
                            january++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation1 += 1;
                                    break;
                                case "Praznik":
                                    religion1 += 1;
                                    break;
                                case "Odsustvo":
                                    leave1 += 1;
                                    break;
                            }
                            break;
                        case 2:
                            february++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation2 += 1;
                                    break;
                                case "Praznik":
                                    religion2 += 1;
                                    break;
                                case "Odsustvo":
                                    leave2 += 1;
                                    break;
                            }
                            break;
                        case 3:
                            march++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation3 += 1;
                                    break;
                                case "Praznik":
                                    religion3 += 1;
                                    break;
                                case "Odsustvo":
                                    leave3 += 1;
                                    break;
                            }
                            break;
                        case 4:
                            april++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation4 += 1;
                                    break;
                                case "Praznik":
                                    religion4 += 1;
                                    break;
                                case "Odsustvo":
                                    leave4 += 1;
                                    break;
                            }
                            break;
                        case 5:
                            may++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation5 += 1;
                                    break;
                                case "Praznik":
                                    religion5 += 1;
                                    break;
                                case "Odsustvo":
                                    leave5 += 1;
                                    break;
                            }
                            break;
                        case 6:
                            jun++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation6 += 1;
                                    break;
                                case "Praznik":
                                    religion6 += 1;
                                    break;
                                case "Odsustvo":
                                    leave6 += 1;
                                    break;
                            }
                            break;
                        case 7:
                            july++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation7 += 1;
                                    break;
                                case "Praznik":
                                    religion7 += 1;
                                    break;
                                case "Odsustvo":
                                    leave7 += 1;
                                    break;
                            }
                            break;
                        case 8:
                            august++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation8 += 1;
                                    break;
                                case "Praznik":
                                    religion8 += 1;
                                    break;
                                case "Odsustvo":
                                    leave8 += 1;
                                    break;
                            }
                            break;
                        case 9:
                            september++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation9 += 1;
                                    break;
                                case "Praznik":
                                    religion9 += 1;
                                    break;
                                case "Odsustvo":
                                    leave9 += 1;
                                    break;
                            }
                            break;
                        case 10:
                            october++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation10 += 1;
                                    break;
                                case "Praznik":
                                    religion10 += 1;
                                    break;
                                case "Odsustvo":
                                    leave10 += 1;
                                    break;
                            }
                            break;
                        case 11:
                            november++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation11 += 1;
                                    break;
                                case "Praznik":
                                    religion11 += 1;
                                    break;
                                case "Odsustvo":
                                    leave11 += 1;
                                    break;
                            }
                            break;
                        case 12:
                            december++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation12 += 1;
                                    break;
                                case "Praznik":
                                    religion12 += 1;
                                    break;
                                case "Odsustvo":
                                    leave12 += 1;
                                    break;
                            }
                            break;
                    }
                }

            } else {
                java.util.Date date = firstDay;
                java.util.Date date2 = lastDay;
                if (date.getYear() == new java.util.Date().getYear()) {
                    switch (date.getMonth()) {
                        case 1:
                            january++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation1 += 1;
                                    break;
                                case "Praznik":
                                    religion1 += 1;
                                    break;
                                case "Odsustvo":
                                    leave1 += 1;
                                    break;
                            }
                            break;
                        case 2:
                            february++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation2 += 1;
                                    break;
                                case "Praznik":
                                    religion2 += 1;
                                    break;
                                case "Odsustvo":
                                    leave2 += 1;
                                    break;
                            }
                            break;
                        case 3:
                            march++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation3 += 1;
                                    break;
                                case "Praznik":
                                    religion3 += 1;
                                    break;
                                case "Odsustvo":
                                    leave3 += 1;
                                    break;
                            }
                            break;
                        case 4:
                            april++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation4 += 1;
                                    break;
                                case "Praznik":
                                    religion4 += 1;
                                    break;
                                case "Odsustvo":
                                    leave4 += 1;
                                    break;
                            }
                            break;
                        case 5:
                            may++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation5 += 1;
                                    break;
                                case "Praznik":
                                    religion5 += 1;
                                    break;
                                case "Odsustvo":
                                    leave5 += 1;
                                    break;
                            }
                            break;
                        case 6:
                            jun++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation6 += 1;
                                    break;
                                case "Praznik":
                                    religion6 += 1;
                                    break;
                                case "Odsustvo":
                                    leave6 += 1;
                                    break;
                            }
                            break;
                        case 7:
                            july++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation7 += 1;
                                    break;
                                case "Praznik":
                                    religion7 += 1;
                                    break;
                                case "Odsustvo":
                                    leave7 += 1;
                                    break;
                            }
                            break;
                        case 8:
                            august++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation8 += 1;
                                    break;
                                case "Praznik":
                                    religion8 += 1;
                                    break;
                                case "Odsustvo":
                                    leave8 += 1;
                                    break;
                            }
                            break;
                        case 9:
                            september++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation9 += 1;
                                    break;
                                case "Praznik":
                                    religion9 += 1;
                                    break;
                                case "Odsustvo":
                                    leave9 += 1;
                                    break;
                            }
                            break;
                        case 10:
                            october++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation10 += 1;
                                    break;
                                case "Praznik":
                                    religion10 += 1;
                                    break;
                                case "Odsustvo":
                                    leave10 += 1;
                                    break;
                            }
                            break;
                        case 11:
                            november++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation11 += 1;
                                    break;
                                case "Praznik":
                                    religion11 += 1;
                                    break;
                                case "Odsustvo":
                                    leave11 += 1;
                                    break;
                            }
                            break;
                        case 12:
                            december++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation12 += 1;
                                    break;
                                case "Praznik":
                                    religion12 += 1;
                                    break;
                                case "Odsustvo":
                                    leave12 += 1;
                                    break;
                            }
                            break;
                    }
                }
                if (date2.getYear() == new java.util.Date().getYear()) {
                    switch (date2.getMonth()) {
                        case 1:
                            january++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation1 += 1;
                                    break;
                                case "Praznik":
                                    religion1 += 1;
                                    break;
                                case "Odsustvo":
                                    leave1 += 1;
                                    break;
                            }
                            break;
                        case 2:
                            february++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation2 += 1;
                                    break;
                                case "Praznik":
                                    religion2 += 1;
                                    break;
                                case "Odsustvo":
                                    leave2 += 1;
                                    break;
                            }
                            break;
                        case 3:
                            march++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation3 += 1;
                                    break;
                                case "Praznik":
                                    religion3 += 1;
                                    break;
                                case "Odsustvo":
                                    leave3 += 1;
                                    break;
                            }
                            break;
                        case 4:
                            april++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation4 += 1;
                                    break;
                                case "Praznik":
                                    religion4 += 1;
                                    break;
                                case "Odsustvo":
                                    leave4 += 1;
                                    break;
                            }
                            break;
                        case 5:
                            may++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation5 += 1;
                                    break;
                                case "Praznik":
                                    religion5 += 1;
                                    break;
                                case "Odsustvo":
                                    leave5 += 1;
                                    break;
                            }
                            break;
                        case 6:
                            jun++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation6 += 1;
                                    break;
                                case "Praznik":
                                    religion6 += 1;
                                    break;
                                case "Odsustvo":
                                    leave6 += 1;
                                    break;
                            }
                            break;
                        case 7:
                            july++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation7 += 1;
                                    break;
                                case "Praznik":
                                    religion7 += 1;
                                    break;
                                case "Odsustvo":
                                    leave7 += 1;
                                    break;
                            }
                            break;
                        case 8:
                            august++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation8 += 1;
                                    break;
                                case "Praznik":
                                    religion8 += 1;
                                    break;
                                case "Odsustvo":
                                    leave8 += 1;
                                    break;
                            }
                            break;
                        case 9:
                            september++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation9 += 1;
                                    break;
                                case "Praznik":
                                    religion9 += 1;
                                    break;
                                case "Odsustvo":
                                    leave9 += 1;
                                    break;
                            }
                            break;
                        case 10:
                            october++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation10 += 1;
                                    break;
                                case "Praznik":
                                    religion10 += 1;
                                    break;
                                case "Odsustvo":
                                    leave10 += 1;
                                    break;
                            }
                            break;
                        case 11:
                            november++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation11 += 1;
                                    break;
                                case "Praznik":
                                    religion11 += 1;
                                    break;
                                case "Odsustvo":
                                    leave11 += 1;
                                    break;
                            }
                            break;
                        case 12:
                            december++;
                            switch (leaveRequest.getCategory()) {
                                case "Godišnji":
                                    vacation12 += 1;
                                    break;
                                case "Praznik":
                                    religion12 += 1;
                                    break;
                                case "Odsustvo":
                                    leave12 += 1;
                                    break;
                            }
                            break;
                    }
                }
            }

        }

        verticalScale = usersInCompany.size();

        MonthUserNo monthUserNo1 = new MonthUserNo("Januar", january, "#e6194B", vacation1, leave1, religion1);
        MonthUserNo monthUserNo2 = new MonthUserNo("Februar", february, "#f58231", vacation2, leave2, religion2);
        MonthUserNo monthUserNo3 = new MonthUserNo("Mart", march, "#ffe119", vacation3, leave3, religion3);
        MonthUserNo monthUserNo4 = new MonthUserNo("April", april, "#bfef45", vacation4, leave4, religion4);
        MonthUserNo monthUserNo5 = new MonthUserNo("Maj", may, "#3cb44b", vacation5, leave5, religion5);
        MonthUserNo monthUserNo6 = new MonthUserNo("Jun", jun, "#42d4f4", vacation6, leave6, religion6);
        MonthUserNo monthUserNo7 = new MonthUserNo("Jul", july, "#4363d8", vacation7, leave7, religion7);
        MonthUserNo monthUserNo8 = new MonthUserNo("Avgust", august, "#911eb4", vacation8, leave8, religion8);
        MonthUserNo monthUserNo9 = new MonthUserNo("Septembar", september, "#f032e6", vacation9, leave9, religion9);
        MonthUserNo monthUserNo10 = new MonthUserNo("Oktobar", october, "#469990", vacation10, leave10, religion10);
        MonthUserNo monthUserNo11 = new MonthUserNo("Novembar", november, "#fabebe", vacation11, leave11, religion11);
        MonthUserNo monthUserNo12 = new MonthUserNo("Decembar", december, "#aaffc3", vacation12, leave12, religion12);

        List<MonthUserNo> monthUserNos = new ArrayList<>();
        monthUserNos.add(monthUserNo1);
        monthUserNos.add(monthUserNo2);
        monthUserNos.add(monthUserNo3);
        monthUserNos.add(monthUserNo4);
        monthUserNos.add(monthUserNo5);
        monthUserNos.add(monthUserNo6);
        monthUserNos.add(monthUserNo7);
        monthUserNos.add(monthUserNo8);
        monthUserNos.add(monthUserNo9);
        monthUserNos.add(monthUserNo10);
        monthUserNos.add(monthUserNo11);
        monthUserNos.add(monthUserNo12);

        return monthUserNos;

    }
}
