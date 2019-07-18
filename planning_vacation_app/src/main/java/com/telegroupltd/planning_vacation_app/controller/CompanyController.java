package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
import com.telegroupltd.planning_vacation_app.model.Company;
import com.telegroupltd.planning_vacation_app.model.LeaveRequest;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestDate;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.CompanyRepository;

import com.telegroupltd.planning_vacation_app.repository.LeaveRequestDateRepository;
import com.telegroupltd.planning_vacation_app.repository.LeaveRequestRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import com.telegroupltd.planning_vacation_app.util.MonthUserNo;
import com.telegroupltd.planning_vacation_app.util.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.Month;
import java.util.*;


@RequestMapping(value = "/hub/company")
@Controller
@Scope("request")
@SuppressWarnings("ALL")
public class CompanyController extends GenericController<Company, Integer> {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveRequestDateRepository leaveRequestDateRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("Dodavanje nije moguće.")
    private String badRequestInsert;

    @Value("Ažuriranje nije moguće.")
    private String badRequestUpdate;

    @Value("Brisanje nije moguće.")
    private String badRequestDelete;

    @Value("Dužina {tekst} prelazi maksimalnu dužinu od {broj} karaktera.")
    private String badRequestStringMaxLength;

    @Value("Veličina {tekst} prelazi maksimalnu veličinu.")
    private String badRequestBinaryLength;

    @Value("4294967295")
    private Long longblobLength;

    @Autowired
    public CompanyController(CompanyRepository companyRepository, UserRepository userRepository, LeaveRequestRepository leaveRequestRepository, LeaveRequestDateRepository leaveRequestDateRepository) {
        super(companyRepository);
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.leaveRequestDateRepository = leaveRequestDateRepository;
    }

    @Override
    public @ResponseBody
    List<Company> getAll() {
        List<Company> companies = cloner.deepClone(companyRepository.getAllByActiveIs((byte)1));
        return companies;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody
    Company findById(@PathVariable Integer id) {
        Company company = companyRepository.findById(id).orElse(null);
        // if (company != null ) {

        return company;
        //} else {
        //    throw new BadRequestException();
        // }
    }


    /*
    * TODO Needs to check if something is missing of these parameters, needs to check frontend part and than add some functionalities
    * */

    @Override
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    Company insert(@RequestBody Company company) throws BadRequestException{
        if(Validator.stringMaxLength(company.getName(),40)) {
            if (Validator.binaryMaxLength(company.getLogo(), longblobLength)) {

                company.setId(null);
                company.setName(company.getName());
                company.setActive((byte) 1);
                company.setLogo(company.getLogo());
                company.setPin(company.getPin());


                if (repo.saveAndFlush(company) != null) {
                        entityManager.refresh(company);
                        logCreateAction(company);

                    return company;
                }
                throw new BadRequestException(badRequestInsert);
            }
            throw new BadRequestException(badRequestBinaryLength.replace("{tekst}", "slike za logo"));
        }
        throw new BadRequestException(badRequestStringMaxLength.replace("{tekst}", "naziva").replace("{broj}", String.valueOf(40)));
    }



    @Override
    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody Company company) throws BadRequestException {
        if (Validator.stringMaxLength(company.getName(), 40)) {
            if (Validator.binaryMaxLength(company.getLogo(), longblobLength)) {

                Company companyTemp = companyRepository.findById(id).orElse(null);
                Company oldCompany = cloner.deepClone(repo.findById(id).orElse(null));

                companyTemp.setId(company.getId());
                companyTemp.setName(company.getName());
                companyTemp.setActive((byte) 1);
                companyTemp.setLogo(company.getLogo());
                companyTemp.setPin(company.getPin());

                if (companyRepository.saveAndFlush(companyTemp) != null) {
                    entityManager.refresh(companyTemp);
                    logUpdateAction(companyTemp, oldCompany);

                    return "Success";
                }
                throw new BadRequestException(badRequestUpdate);
            }
            throw  new BadRequestException(badRequestBinaryLength.replace("{tekst}", "slike za logo"));
        }
        throw new BadRequestException(badRequestStringMaxLength.replace("{tekst}", "naziva").replace("{broj}", String.valueOf(40)));
    }




    @Override
    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException{
        Company company = companyRepository.findById(id).orElse(null);
        cloner.deepClone(company);
        Objects.requireNonNull(company).setActive((byte)0);
        if(companyRepository.getByIdAndActive(id,(byte)1) != null){
            logDeleteAction(company);
            return "Success";
        }
        throw new BadRequestException(badRequestDelete);
    }

    @RequestMapping(value = "/statistics/user/{id}",method = RequestMethod.GET)
    public @ResponseBody
    List<MonthUserNo> getStatisticsForUser(@PathVariable Integer id) throws BadRequestException{

        Integer companyId = userBean.getUserUserGroupKey().getCompanyId();
        List<LeaveRequest> leaveRequests = leaveRequestRepository.getAllBySenderUserIdAndLeaveRequestStatusIdAndActive(id,2,(byte)1);

        Double vacation = 0.0, religion = 0.0, leave = 0.0;  //kategorija godisnji, odsustvo i praznik

        for(LeaveRequest leaveRequest : leaveRequests){
            switch (leaveRequest.getCategory()){
                case "Godišnji": vacation+=1;
                    System.out.println(vacation); break;
                case "Praznik": religion+=1;
                    System.out.println(religion); break;
                case "Odsustvo": leave+=1; break;
            }
        }
        List<MonthUserNo> monthUserNoList = new ArrayList<>();

        Double sum = vacation + religion + leave;

        if(sum == 0){
            MonthUserNo monthUserNo = new MonthUserNo("Nema podataka",0,"000000");
            return monthUserNoList;
        }

        MonthUserNo monthUserNo1 = new MonthUserNo(vacation/sum * 100,"Godišnji","#e6194B");
        MonthUserNo monthUserNo2 = new MonthUserNo(religion/sum * 100,"Praznik","#42d4f4");
        MonthUserNo monthUserNo3 = new MonthUserNo(leave/sum * 100,"Odsustvo","#bfef45");

        monthUserNoList.add(monthUserNo1);
        monthUserNoList.add(monthUserNo2);
        monthUserNoList.add(monthUserNo3);

        return monthUserNoList;
    }

    @RequestMapping(value = "/statistics/all",method = RequestMethod.GET)
    public @ResponseBody
    List<MonthUserNo> getStatisticAll(Integer id) throws BadRequestException{

        Integer companyId = userBean.getUserUserGroupKey().getCompanyId();
        List<User> usersInCompany = new ArrayList<>();
        List<LeaveRequest> leaveRequests = new ArrayList<>();


        if(userBean.getUserUserGroupKey().getUserGroupKey()=="admin" || userBean.getUserUserGroupKey().getUserGroupKey()=="direktor" || userBean.getUserUserGroupKey().getUserGroupKey()=="sekretar"){
            usersInCompany = userRepository.getAllByCompanyIdAndActive(companyId,(byte)1);
            leaveRequests = leaveRequestRepository.getAllByCompanyIdAndActiveAndLeaveRequestStatusId(companyId, (byte)1, 2);
        }else if(userBean.getUserUserGroupKey().getUserGroupKey()=="menadzer"){
            Integer sectorId = userBean.getUserUserGroupKey().getSectorId();
            usersInCompany = userRepository.getAllByCompanyIdAndSectorIdAndActive(companyId, sectorId,(byte)1);
            leaveRequests = leaveRequestRepository.getAllByCompanyIdAndActiveAndLeaveRequestStatusId(companyId, (byte)1, 2);
            int i=0;
            for(LeaveRequest leaveRequest : leaveRequests){
                if(!usersInCompany.contains(userRepository.getByIdAndActive(leaveRequest.getSenderUserId(),(byte)1))){
                    leaveRequests.remove(i);
                }
                i++;
            }
        }


        List<Integer> numberOfWorkersOnVacationByMonthsAndVerticalScale = new ArrayList<>();
        Integer january = 0, february = 0, march = 0, april = 0, may = 0, jun = 0, july = 0, august = 0, september = 0, october = 0, november = 0, december = 0, verticalScale = 0;

        for(LeaveRequest leaveRequest : leaveRequests){
            List<LeaveRequestDate> leaveRequestDates = leaveRequestDateRepository.getAllByLeaveRequestIdAndActive(leaveRequest.getId(),(byte)1);
            leaveRequestDates.sort(Comparator.comparing(LeaveRequestDate::getDate));
            Date firstDay = leaveRequestDates.get(0).getDate();
            Date lastDay = leaveRequestDates.get(leaveRequestDates.size()-1).getDate();

            if(firstDay.getMonth()== lastDay.getMonth()){
                Date date = firstDay;
                if(date.getYear()== new Date().getYear()){
                    switch (date.getMonth()){
                        case 1: january++; break;
                        case 2: february++; break;
                        case 3: march++; break;
                        case 4: april++; break;
                        case 5: may++; break;
                        case 6: jun++; break;
                        case 7: july++; break;
                        case 8: august++; break;
                        case 9: september++; break;
                        case 10: october++; break;
                        case 11: november++; break;
                        case 12: december++; break;
                    }
                }

            }else{
                Date date = firstDay;
                Date date2 = lastDay;
                if(date.getYear()== new Date().getYear()){
                    switch (date.getMonth()){
                        case 1: january++; break;
                        case 2: february++; break;
                        case 3: march++; break;
                        case 4: april++; break;
                        case 5: may++; break;
                        case 6: jun++; break;
                        case 7: july++; break;
                        case 8: august++; break;
                        case 9: september++; break;
                        case 10: october++; break;
                        case 11: november++; break;
                        case 12: december++; break;
                    }
                }
                if(date2.getYear()== new Date().getYear()){
                    switch (date2.getMonth()){
                        case 1: january++; break;
                        case 2: february++; break;
                        case 3: march++; break;
                        case 4: april++; break;
                        case 5: may++; break;
                        case 6: jun++; break;
                        case 7: july++; break;
                        case 8: august++; break;
                        case 9: september++; break;
                        case 10: october++; break;
                        case 11: november++; break;
                        case 12: december++; break;
                    }
                }
            }

        }

        verticalScale = usersInCompany.size();

        MonthUserNo monthUserNo1 = new MonthUserNo("Januar", january,"#e6194B");
        MonthUserNo monthUserNo2 = new MonthUserNo("Februar",february,"#f58231");
        MonthUserNo monthUserNo3 = new MonthUserNo("Mart",march,"#ffe119");
        MonthUserNo monthUserNo4 = new MonthUserNo("April",april,"#bfef45");
        MonthUserNo monthUserNo5 = new MonthUserNo("Maj",may,"3cb44b");
        MonthUserNo monthUserNo6 = new MonthUserNo("Jun",jun,"42d4f4");
        MonthUserNo monthUserNo7 = new MonthUserNo("Jul",july,"#4363d8");
        MonthUserNo monthUserNo8 = new MonthUserNo("Avgust",august,"#911eb4");
        MonthUserNo monthUserNo9 = new MonthUserNo("Septembar",september,"#f032e6");
        MonthUserNo monthUserNo10 = new MonthUserNo("Oktobar",october,"#469990");
        MonthUserNo monthUserNo11 = new MonthUserNo("Novembar",november,"#fabebe");
        MonthUserNo monthUserNo12 = new MonthUserNo("Decembar",december,"#aaffc3");

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
