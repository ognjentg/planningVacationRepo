package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.*;
import com.telegroupltd.planning_vacation_app.repository.*;
import com.telegroupltd.planning_vacation_app.session.UserBean;
import com.telegroupltd.planning_vacation_app.util.LeaveRequestCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.*;

@RequestMapping(value = "hub/leave_request")
@RestController
@Scope("request")
public class LeaveRequestController extends GenericHasActiveController<LeaveRequest, Integer> {
    private final LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VacationDaysRepository vacationDaysRepository;
    @Autowired
    private LeaveRequestDateRepository leaveRequestDateRepository;
    @Autowired
    private ReligionLeaveRepository religionLeaveRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private SectorRepository sectorRepository;
    @Autowired
    com.telegroupltd.planning_vacation_app.util.Notification emailNotification;

    @Value("Dodavanje nije moguće")
    private String badRequestInsert;

    @Value("Ažuriranje nije moguće")
    private String badRequestUpdate;

    @Value("Brisanje nije moguće.")
    private String badRequestDelete;

    @Value("Korisnik nema dovoljno godišnjeg")
    private String notEnoughDays;

    @Value("Dani odabrani u godišnjem su prezauzeti.")
    private String tooMuchAbsent;

    @Autowired
    public LeaveRequestController(LeaveRequestRepository leaveRequestRepository) {
        super(leaveRequestRepository);
        this.leaveRequestRepository = leaveRequestRepository;
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @Override
    public @ResponseBody
    LeaveRequest insert(@RequestBody LeaveRequest leaveRequest) throws BadRequestException {
        //Check if category length is equal or greater than 45
        System.out.println("Kreiranje zahtjeva");
        Integer sectorId = userBean.getUserUserGroupKey().getSectorId();
        System.out.println("Sector id = " + sectorId);
        if("direktor".equals(userBean.getUserUserGroupKey().getUserGroupKey())){
            leaveRequest.setLeaveRequestStatusId(2);
            if ((leaveRequest = repo.saveAndFlush(leaveRequest)) == null)
                throw new BadRequestException(badRequestInsert);
            return leaveRequest;
        }
        if (leaveRequest.getCategory().length() >= 45)
            throw new BadRequestException(badRequestInsert);
        if (repo.saveAndFlush(leaveRequest) == null)
            throw new BadRequestException(badRequestInsert);

        logCreateAction(leaveRequest);
        String notificationTitle = "";
        Byte leaveType = 0;
        User userTemp = userRepository.getByIdAndActive(leaveRequest.getSenderUserId(), (byte)1);
        String notificationText = "Korisnik " + userTemp.getFirstName() + " " + userTemp.getLastName() + " je poslao zahtjev za ";
        if ("Godišnji".equals(leaveRequest.getCategory())) {
            notificationTitle = "Zahtjev za godišnji odmor";
            notificationText += "godišnji odmor.";
            leaveType = 1;
        } else if ("Odsustvo".equals(leaveRequest.getCategory())) {
            notificationTitle = "Zahtjev za odsustvo";
            leaveType = 2;
            notificationText += "odsustvo.";
        } else if ("Praznik".equals(leaveRequest.getCategory())) {
            notificationTitle = "Zahtjev za praznik";
            leaveType = 3;
            notificationText += "praznik.";
        }
        notificationText += " " + leaveRequest.getSenderComment();
        if (sectorId != null && userTemp.getUserGroupId() == 6) {
            Sector s = sectorRepository.getByIdAndActive(sectorId, (byte)1);
            User user = userRepository.getByIdAndActive(s.getSectorManagerId(), (byte)1);
            emailNotification.createNotification(user, notificationTitle, notificationText, leaveType);
        } else {
            List<User> admins = userRepository.getAllByCompanyIdAndUserGroupIdAndActive(userBean.getUserUserGroupKey().getCompanyId(),
                    2, (byte) 1);
            List<User> directors = userRepository.getAllByCompanyIdAndUserGroupIdAndActive(userBean.getUserUserGroupKey().getCompanyId(),
                    3, (byte) 1);
            for (User user1 : directors) {
                emailNotification.createNotification(user1, notificationTitle, notificationText, leaveType);
            }
            for (User user : admins) {
                emailNotification.createNotification(user, notificationTitle, notificationText, leaveType);
            }

        }

        return leaveRequest;
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @Override
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody LeaveRequest leaveRequest) throws BadRequestException, ForbiddenException {
        if (leaveRequest.getCategory().length() >= 45)
            throw new BadRequestException(badRequestInsert);
        return super.update(id, leaveRequest);
    }

    @Override
    public @ResponseBody
    List<LeaveRequest> getAll() {
        return leaveRequestRepository.getAllByActiveIs((byte) 1);
    }

    @Override
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id).orElse(null);
        cloner.deepClone(leaveRequest);
        Objects.requireNonNull(leaveRequest).setActive((byte) 0);
        if (leaveRequestRepository.getByIdAndActive(id, (byte) 1) == null) {
            logDeleteAction(leaveRequest);
            return "Success";
        } else throw new BadRequestException(badRequestDelete);

    }

    @RequestMapping(value = "/leaveRequestByUserId/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestInformationByUserId(@PathVariable Integer id){
        return leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationByUserId(id);
    }

    @RequestMapping(value = "/leaveRequestInfo", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestInformation() {
        List<LeaveRequestUserLeaveRequestStatus> list=new ArrayList();
        if(userBean.getUserUserGroupKey().getUserGroupKey()=="menadzer"){
            List<User> users= userRepository.getAllByCompanyIdAndSectorIdAndActive(userBean.getUserUserGroupKey().getCompanyId(),userBean.getUserUserGroupKey().getSectorId(), (byte)1);
            for(var i=0;i< users.size();i++){
                User user=users.get(i);
                List<LeaveRequestUserLeaveRequestStatus> pom=leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationByUserId(user.getId());
                list.addAll(pom);
            }
        }else{
            list = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformation(userBean.getUserUserGroupKey().getId());
        }

        for(LeaveRequestUserLeaveRequestStatus s:list){
            List<LeaveRequestDate> dates= leaveRequestDateRepository.getAllByLeaveRequestIdAndActive(s.getId(), (byte)1);
            s.setNumberOfDays(dates.size());
        }

        return list;

    }

    @RequestMapping(value = "/leaveRequestInfo/{id}", method = RequestMethod.GET)
    public @ResponseBody
    LeaveRequestUserLeaveRequestStatus getLeaveRequestInformationById(@PathVariable Integer id) {
        LeaveRequestUserLeaveRequestStatus lrs = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationById(id).get(0);
         List<LeaveRequestDate> dates= leaveRequestDateRepository.getAllByLeaveRequestIdAndActive(lrs.getId(), (byte)1);
         lrs.setNumberOfDays(dates.size());
        return lrs;
    }

    @RequestMapping(value = "/canGoOnVacationByDates/{dates}", method = RequestMethod.GET)
    public @ResponseBody
    void canGoOnVacationByDates(@PathVariable List<Date> dates) throws BadRequestException{
        if(userBean.getUserUserGroupKey().getSectorId() != null){
            Integer numOfUsersInSector = sectorRepository.getNumberOfUsersInSector(userBean.getUserUserGroupKey().getSectorId());
            for(Date date : dates){
                Double maxPercentageAbsentPeople = sectorRepository.getByIdAndActive(userBean.getUserUserGroupKey().getSectorId(), (byte)1).getMaxPercentageAbsentPeople();
                if(maxPercentageAbsentPeople == null)
                    return;
                Double percentage = ((double)leaveRequestRepository.getNumOfAbsentPeopleFilteredBySectorIdAndDate(userBean.getUserUserGroupKey().getSectorId(), date) + 1) / (double)numOfUsersInSector * 100;
                if(percentage > maxPercentageAbsentPeople)
                    throw new BadRequestException(tooMuchAbsent);
            }
        }
    }

    @RequestMapping(value = "/leaveRequestInfoWait", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestUserLeaveRequestStatusInformationForWait() {
        return leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationForWait(userBean.getUserUserGroupKey().getId());
    }

    @RequestMapping(value = "/getAbsenceHistoryUserInfo/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<AbsenceHistoryUser> getAbsenceHistoryUserInfo(@PathVariable Integer id) {
        return leaveRequestRepository.getAbsenceHistoryUserInfo(userBean.getUserUserGroupKey().getId(), id);
    }

    @RequestMapping(value = "/leaveRequestFilteredByLeaveRequestStatus/{key}", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestFilteredByLeaveRequestStatus(@PathVariable String key) {
        List<LeaveRequestUserLeaveRequestStatus> list= leaveRequestRepository.getLeaveRequestFilteredByLeaveRequestStatus(userBean.getUserUserGroupKey().getId(), key);
        for(LeaveRequestUserLeaveRequestStatus s:list){
            List<LeaveRequestDate> dates= leaveRequestDateRepository.getAllByLeaveRequestIdAndActive(s.getId(), (byte)1);
            s.setNumberOfDays(dates.size());
        }
        return list;
    }

    ///////////////////////////////////////////////////////////////////////updateLeaveRequestStatusCancellation
    @RequestMapping(value = "/updateLeaveRequestStatusToCancellation/{leaveRequestId}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateLeaveRequestStatusToCancellation(@PathVariable Integer leaveRequestId){
        leaveRequestRepository.updateLeaveRequestStatusToCancellation(leaveRequestId);
        /*LeaveRequestUserLeaveRequestStatus lrs = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationById(leaveRequestId).get(0);
        User user = userRepository.getByIdAndActive(lrs.getSenderUserId(), (byte)1);
        Notification notification = new Notification();
        notification.setReceiverUserId(lrs.getSenderUserId());
        notification.setTitle("Bolovanje");
        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy.");
        String dateFrom = format.format(lrs.getDateFrom());
        String dateTo = format.format(lrs.getDateTo());
        notification.setText("Bolovanje u periodu od " + dateFrom + " do " + dateTo + " je opravdano.");
        notification.setSeen((byte) 0);
        notification.setCompanyId(userBean.getUserUserGroupKey().getCompanyId());
        notification.setLeaveType((byte) 4);
        notification.setActive((byte) 1);
        notificationRepository.saveAndFlush(notification);
        if(user.getReceiveMail() == (byte)1)
            emailNotification.sendNotification(user.getEmail(), notification.getTitle(), notification.getText());*/
    }
    ///////////////////////////////////////////////////////////////////////////

    @RequestMapping(value = "/updateLeaveRequestStatusToApproved/{leaveRequestId}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateLeaveRequestStatusToApproved(@PathVariable Integer leaveRequestId){
        leaveRequestRepository.updateLeaveRequestStatusToApproved(leaveRequestId);
        /*LeaveRequestUserLeaveRequestStatus lrs = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationById(leaveRequestId).get(0);
        User user = userRepository.getByIdAndActive(lrs.getSenderUserId(), (byte)1);
        Notification notification = new Notification();
        notification.setReceiverUserId(lrs.getSenderUserId());
        notification.setTitle("Bolovanje");
        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy.");
        String dateFrom = format.format(lrs.getDateFrom());
        String dateTo = format.format(lrs.getDateTo());
        notification.setText("Bolovanje u periodu od " + dateFrom + " do " + dateTo + " je opravdano.");
        notification.setSeen((byte) 0);
        notification.setCompanyId(userBean.getUserUserGroupKey().getCompanyId());
        notification.setLeaveType((byte) 4);
        notification.setActive((byte) 1);
        notificationRepository.saveAndFlush(notification);
        if(user.getReceiveMail() == (byte)1)
            emailNotification.sendNotification(user.getEmail(), notification.getTitle(), notification.getText());*/
    }

    /////////////////////////////////////////////////////////////////////////////

    @RequestMapping(value = "/updateLeaveRequestStatusRejected/{leaveRequestId}/comment/{approverComment}", method = RequestMethod.GET)
    public @ResponseBody
    void updateLeaveRequestStatusRejected(@PathVariable Integer leaveRequestId, @PathVariable String approverComment) throws BadRequestException {
        leaveRequestRepository.updateLeaveRequestStatusRejected(leaveRequestId, approverComment);
        LeaveRequestUserLeaveRequestStatus lrs = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationById(leaveRequestId).get(0);
        LeaveRequest leaveRequest = leaveRequestRepository.getByIdAndActive(leaveRequestId, (byte)1);
        User user = userRepository.getByIdAndActive(lrs.getSenderUserId(), (byte)1);
        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy.");
        Date dateFrom = new Date(lrs.getDateFrom().getTime());
        Date dateTo = new Date(lrs.getDateTo().getTime());
        String date1 = formatter.format(dateFrom.getTime());
        String date2 = formatter.format(dateTo.getTime());
        String notificationTitle = "";
        String notificationText = "";
        if ("Godišnji".equals(lrs.getCategory())) {
            notificationTitle = "Zahtjev za godišnji odmor";
            notificationText = "Godišnji odmor u periodu od " + date1 + " do "
                        + date2 + " je odbijen.";
        } else if ("Odsustvo".equals(lrs.getCategory())) {
            notificationTitle = "Zahtjev za odsustvo";
            notificationText = "Odsustvo u periodu od " + date1 + " do "
                        + date2 + " je odbijeno.";
        } else if ("Praznik".equals(lrs.getCategory())) {
            notificationTitle = "Zahtjev za praznik";
            notificationText = "Praznik u periodu od " + date1 + " do "
                        + date2 + " je odbijen.";
        }
        emailNotification.createNotification(user, notificationTitle, notificationText, (byte)(int)leaveRequest.getLeaveTypeId());
    }

    @RequestMapping(value = "/updateLeaveRequestStatusApproved/{leaveRequestId}/{leaveRequestTypeId}/{paid}", method = RequestMethod.GET)
    public @ResponseBody
    void updateLeaveRequestStatusApproved(@PathVariable Integer leaveRequestId, @PathVariable Integer leaveRequestTypeId, @PathVariable Byte paid) throws BadRequestException{
        LeaveRequest leaveRequest = leaveRequestRepository.getByIdAndActive(leaveRequestId, (byte)1);
        List<LeaveRequestDate> leaveRequestDates = leaveRequestDateRepository.getAllByLeaveRequestIdAndActive(leaveRequest.getId(), (byte)1);
        //Povećavanje broja iskorištenog godišnjeg u tabeli vacation_days
        User user = userRepository.getByIdAndActive(leaveRequest.getSenderUserId(), (byte)1);
        if(leaveRequest.getCategory().equals(LeaveRequestCategory.Godišnji.toString())){
            Integer numOfVacationDays = leaveRequestDates.size();
            VacationDays oldVacationDays = vacationDaysRepository.getByUserIdAndYearAndActive(leaveRequest.getSenderUserId(), Calendar.getInstance().get(Calendar.YEAR) - 1, (byte)1);
            VacationDays vacationDays = vacationDaysRepository.getByUserIdAndYearAndActive(leaveRequest.getSenderUserId(), Calendar.getInstance().get(Calendar.YEAR), (byte)1);
            if(oldVacationDays == null || oldVacationDays.getTotalDays() - oldVacationDays.getUsedDays() <= 0){
                if(vacationDays.getTotalDays() - vacationDays.getUsedDays() < numOfVacationDays){
                    throw new BadRequestException(notEnoughDays);
                }
                else {
                    vacationDays.setUsedDays(vacationDays.getUsedDays() + numOfVacationDays);
                    vacationDaysRepository.saveAndFlush(vacationDays);
                }
            }
            else{
                Integer maxOldDays = oldVacationDays.getTotalDays() - oldVacationDays.getUsedDays();
                Integer maxDays = maxOldDays + vacationDays.getTotalDays() - vacationDays.getUsedDays();
                if(maxDays <= numOfVacationDays)
                    throw new BadRequestException(notEnoughDays);
                Integer leftDays = numOfVacationDays - maxOldDays;
                if(leftDays > 0){
                    oldVacationDays.setUsedDays(oldVacationDays.getTotalDays());
                    vacationDaysRepository.saveAndFlush(oldVacationDays);
                    vacationDays.setUsedDays(vacationDays.getUsedDays() + leftDays);
                    vacationDaysRepository.saveAndFlush(vacationDays);
                }
                else{
                    oldVacationDays.setUsedDays(oldVacationDays.getUsedDays() + numOfVacationDays);
                    vacationDaysRepository.saveAndFlush(oldVacationDays);
                }
            }
        }
        //Povećavanje broja iskorištenih praznika u tabeli religion_leave
        else if(leaveRequest.getCategory().equals(LeaveRequestCategory.Praznik.toString())){
            ReligionLeave religionLeave = religionLeaveRepository.getByUserIdAndActive(leaveRequest.getSenderUserId(), (byte)1);
            religionLeave.setNumberOfDaysUsed(religionLeave.getNumberOfDaysUsed() + leaveRequestDates.size());
            religionLeaveRepository.saveAndFlush(religionLeave);
        }
        leaveRequestRepository.updateLeaveRequestStatusApproved(leaveRequestId,leaveRequestTypeId, paid, userBean.getUserUserGroupKey().getId());
        LeaveRequestUserLeaveRequestStatus lrs = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationById(leaveRequestId).get(0);
        lrs.setLeaveTypeId(leaveRequestTypeId);

        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy.");
        Date dateFrom = new Date(lrs.getDateFrom().getTime());
        Date dateTo = new Date(lrs.getDateTo().getTime());
        String date1 = formatter.format(dateFrom.getTime());
        String date2 = formatter.format(dateTo.getTime());
        String notificationTitle = "";
        String notificationText = "";
        if ("Godišnji".equals(lrs.getCategory())) {
            notificationTitle = "Zahtjev za godišnji odmor";
            notificationText = "Godišnji odmor u periodu od " + date1 + " do "
                    + date2 + " je odobren.";
        } else if ("Odsustvo".equals(lrs.getCategory())) {
            notificationTitle = "Zahtjev za odsustvo";
            notificationText = "Odsustvo u periodu od " + date1 + " do "
                    + date2 + " je odobreno.";
        } else if ("Praznik".equals(lrs.getCategory())) {
            notificationTitle = "Zahtjev za praznik";
            notificationText = "Praznik u periodu od " + date1 + " do "
                    + date2 + " je odobreno.";
        }
        emailNotification.createNotification(user, notificationTitle, notificationText, (byte)(int)leaveRequest.getLeaveTypeId());
    }

    /*@RequestMapping(value = "/updateLeaveRequestStatusToCancel/{leaveRequestId}/{leaveRequestTypeId}/{paid}", method = RequestMethod.GET)
    public @ResponseBody
   void updateLeaveRequestStatusToCancel(@PathVariable Integer leaveRequestId, @PathVariable Integer leaveRequestTypeId, @PathVariable Byte paid) throws BadRequestException{
        LeaveRequest leaveRequest = leaveRequestRepository.getByIdAndActive(leaveRequestId, (byte)1);
        List<LeaveRequestDate> leaveRequestDates = leaveRequestDateRepository.getAllByLeaveRequestIdAndActive(leaveRequest.getId(), (byte)1);
        //Povećavanje broja iskorištenog godišnjeg u tabeli vacation_days
        if(leaveRequest.getCategory().equals(LeaveRequestCategory.Godišnji.toString())){
            Integer numOfVacationDays = leaveRequestDates.size();
            VacationDays oldVacationDays = vacationDaysRepository.getByUserIdAndYearAndActive(leaveRequest.getSenderUserId(), Calendar.getInstance().get(Calendar.YEAR) - 1, (byte)1);
            VacationDays vacationDays = vacationDaysRepository.getByUserIdAndYearAndActive(leaveRequest.getSenderUserId(), Calendar.getInstance().get(Calendar.YEAR), (byte)1);
            if(oldVacationDays == null || oldVacationDays.getTotalDays() - oldVacationDays.getUsedDays() <= 0){
                if(vacationDays.getTotalDays() - vacationDays.getUsedDays() < numOfVacationDays){
                    throw new BadRequestException(notEnoughDays);
                }
                else {
                    //vacationDays.setUsedDays(vacationDays.getUsedDays() + numOfVacationDays);
                    System.out.println("num of vocation days: "+numOfVacationDays);
                    System.out.println("vacationDays.getUsedDays()"+vacationDays.getUsedDays());
                    vacationDays.setUsedDays(numOfVacationDays - vacationDays.getUsedDays());
                    vacationDaysRepository.saveAndFlush(vacationDays);
                }
            }
            else{
                Integer maxOldDays = oldVacationDays.getTotalDays() - oldVacationDays.getUsedDays();
                Integer maxDays = maxOldDays + vacationDays.getTotalDays() - vacationDays.getUsedDays();
                if(maxDays <= numOfVacationDays)
                    throw new BadRequestException(notEnoughDays);
                Integer leftDays = numOfVacationDays - maxOldDays;
                if(leftDays > 0){
                    oldVacationDays.setUsedDays(oldVacationDays.getTotalDays());
                    vacationDaysRepository.saveAndFlush(oldVacationDays);
                    vacationDays.setUsedDays(vacationDays.getUsedDays() + leftDays);
                    vacationDaysRepository.saveAndFlush(vacationDays);
                }
                else{
                    oldVacationDays.setUsedDays(oldVacationDays.getUsedDays() + numOfVacationDays);
                    vacationDaysRepository.saveAndFlush(oldVacationDays);
                }
            }
        }
        //Povećavanje broja iskorištenih praznika u tabeli religion_leave
        else if(leaveRequest.getCategory().equals(LeaveRequestCategory.Praznik.toString())){
            ReligionLeave religionLeave = religionLeaveRepository.getByUserIdAndActive(leaveRequest.getSenderUserId(), (byte)1);
            //religionLeave.setNumberOfDaysUsed(religionLeave.getNumberOfDaysUsed() + leaveRequestDates.size());
            religionLeave.setNumberOfDaysUsed(leaveRequestDates.size() - religionLeave.getNumberOfDaysUsed());
            religionLeaveRepository.saveAndFlush(religionLeave);
        }
        leaveRequestRepository.updateLeaveRequestStatusToCancel(leaveRequestId,leaveRequestTypeId, paid, userBean.getUserUserGroupKey().getId());
        LeaveRequestUserLeaveRequestStatus lrs = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationById(leaveRequestId).get(0);
        lrs.setLeaveTypeId(leaveRequestTypeId);
        Notification notification = new Notification();
        System.out.println(lrs.getSenderUserId());

        notification.setCompanyId(userBean.getUserUserGroupKey().getCompanyId());
        notification.setSeen((byte) 0);
        notification.setActive((byte) 1);
        notification.setReceiverUserId(lrs.getSenderUserId());
        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy.");
        Date dateFrom = new Date(lrs.getDateFrom().getTime());
        Date dateTo = new Date(lrs.getDateTo().getTime());
        String date1 = formatter.format(dateFrom.getTime());
        String date2 = formatter.format(dateTo.getTime());
        if ("Godišnji".equals(lrs.getCategory())) {
            notification.setTitle("Zahtjev za godišnji odmor");
            notification.setText("Godišnji odmor u periodu od " + date1 + " do "
                    + date2 + " je otkazan.");
        } else if ("Odsustvo".equals(lrs.getCategory())) {
            notification.setTitle("Zahtjev za odsustvo");
            notification.setText("Odsustvo u periodu od" + date1 + " do "
                    + date2 + " je otkazan.");
        } else if ("Praznik".equals(lrs.getCategory())) {
            notification.setTitle("Zahtjev za praznik");
            notification.setText("Praznik u periodu od" + date1 + " do "
                    + date2 + " je otkazan.");
        }
        notificationRepository.saveAndFlush(notification);
    }*/

    ///////////////////////////////////////////////////////////////////////////////
    @RequestMapping(value = "/updateLeaveRequestStatusToCancel/{leaveRequestId}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateLeaveRequestStatusToCancel(@PathVariable Integer leaveRequestId){
        leaveRequestRepository.updateLeaveRequestStatusToCancel(leaveRequestId);
        /*LeaveRequestUserLeaveRequestStatus lrs = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationById(leaveRequestId).get(0);
        User user = userRepository.getByIdAndActive(lrs.getSenderUserId(), (byte)1);
        Notification notification = new Notification();
        notification.setReceiverUserId(lrs.getSenderUserId());
        notification.setTitle("Bolovanje");
        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy.");
        String dateFrom = format.format(lrs.getDateFrom());
        String dateTo = format.format(lrs.getDateTo());
        notification.setText("Bolovanje u periodu od " + dateFrom + " do " + dateTo + " je opravdano.");
        notification.setSeen((byte) 0);
        notification.setCompanyId(userBean.getUserUserGroupKey().getCompanyId());
        notification.setLeaveType((byte) 4);
        notification.setActive((byte) 1);
        notificationRepository.saveAndFlush(notification);
        if(user.getReceiveMail() == (byte)1)
            emailNotification.sendNotification(user.getEmail(), notification.getTitle(), notification.getText());*/
    }

    ///////////////////////////////////////////////////////////////////////////////


    @RequestMapping(value = "/leaveRequestFilteredByLeaveRequestStatus/{key}/{userId}", method = RequestMethod.GET)
    public @ResponseBody
    Leaves getLeaveRequestFilteredByLeaveRequestStatusForSelected(@PathVariable String key, @PathVariable Integer userId) {

        boolean isAbsent = false;
        ArrayList<LeaveRequestUserLeaveRequestStatus> removeReq = new ArrayList<>();
        ArrayList<LeaveRequestUserLeaveRequestStatus> leaveRequests = (ArrayList<LeaveRequestUserLeaveRequestStatus>)
                leaveRequestRepository.getLeaveRequestFilteredByLeaveRequestStatus(userId, key);
        Date now = new Date();
        for (LeaveRequestUserLeaveRequestStatus lr : leaveRequests) {
            if (lr.getSenderUserId() != userId) {
                removeReq.add(lr);
            }
        }
        for (LeaveRequestUserLeaveRequestStatus req : removeReq)
            leaveRequests.remove(req);

        for (LeaveRequestUserLeaveRequestStatus lr : leaveRequests) {
            if (now.after(lr.getDateFrom()) && now.before(lr.getDateTo())) {
                isAbsent = true;
                break;
            }
        }
        Leaves leaves = new Leaves(leaveRequests, isAbsent);
        return leaves;
    }

    @RequestMapping(value = "/numOfAbsentPeople/{sectorId}", method = RequestMethod.GET)
    public @ResponseBody
    Integer numOfAbsentPeopleInSector(@PathVariable Integer sectorId){
        Integer tmp = leaveRequestRepository.getNumOfAbsentPeopleFilteredBySectorIdAndDate(sectorId, new Date());
        return tmp;
    }


   /* @RequestMapping(value = "/leaveRequestFilteredBySectorId/{sectorId}", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestFilteredBySectorId( @PathVariable Integer sectorId) {
         List<LeaveRequestUserLeaveRequestStatus> leaveRequestUserLeaveRequestStatuses = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformation(userBean.getUserUserGroupKey().getId());
        List<User> users =  userRepository.getAllByCompanyIdAndActive(userBean.getUserUserGroupKey().getCompanyId(),(byte)1);
        List<LeaveRequestUserLeaveRequestStatus> list=new ArrayList();
        if(userBean.getUserUserGroupKey().getUserGroupKey()=="menadzer"){
            List<User> users= userRepository.getAllByCompanyIdAndSectorIdAndActive(userBean.getUserUserGroupKey().getCompanyId(),sectorId, (byte)1);
            for(var i=0;i< users.size();i++){
                User user=users.get(i);
                List<LeaveRequestUserLeaveRequestStatus> pom=leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationByUserId(user.getId());
                list.addAll(pom);
            }
        }else{
            list = leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformation(userBean.getUserUserGroupKey().getId());
        }
        return list;
    }*/


    @RequestMapping(value = "/leaveRequestFilteredBySectorIdAndLeaveRequestStatus/{key}/{sectorId}", method = RequestMethod.GET)
    public @ResponseBody
    List<LeaveRequestUserLeaveRequestStatus> getLeaveRequestFilteredBySectorIdAndLeaveRequestStatus( @PathVariable String key, @PathVariable Integer sectorId) {
        List<User> users= userRepository.getAllByCompanyIdAndSectorIdAndActive(userBean.getUserUserGroupKey().getCompanyId(),sectorId, (byte)1);
        List<LeaveRequestUserLeaveRequestStatus> list=new ArrayList(); //=leaveRequestRepository.getLeaveRequestFilteredByLeaveRequestStatusForUser(, key);
        for(var i=0;i< users.size();i++){
            User user=users.get(i);
            List<LeaveRequestUserLeaveRequestStatus> pom=leaveRequestRepository.getLeaveRequestUserLeaveRequestStatusInformationByUserIdByStatus(user.getId(),key);
            list.addAll(pom);
        }
        for(LeaveRequestUserLeaveRequestStatus s:list){
            List<LeaveRequestDate> dates= leaveRequestDateRepository.getAllByLeaveRequestIdAndActive(s.getId(), (byte)1);
            s.setNumberOfDays(dates.size());
        }
        return list;
    }

    }

