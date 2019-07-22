package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.Notification;
import com.telegroupltd.planning_vacation_app.model.SickLeave;
import com.telegroupltd.planning_vacation_app.model.SickLeaveUserSickLeaveStatus;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.NotificationRepository;
import com.telegroupltd.planning_vacation_app.repository.SickLeaveRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RequestMapping(value="/hub/sickLeave")
@RestController
@Scope("request")
public class SickLeaveController extends GenericHasActiveController<SickLeave,Integer> {
    private final SickLeaveRepository sickLeaveRepository;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    com.telegroupltd.planning_vacation_app.util.Notification emailNotification;
    @Value("Brisanje nije moguće.")
    private String badRequestDelete;

    @Autowired
    SickLeaveController(SickLeaveRepository sickLeaveRepository, NotificationRepository notificationRepository, UserRepository userRepository)
    {
        super(sickLeaveRepository);
        this.sickLeaveRepository = sickLeaveRepository;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public @ResponseBody
    List<SickLeave> getAll() {
        List<SickLeave> sickLeaveList = cloner.deepClone(sickLeaveRepository.getAllByActiveIs((byte)1));
        return sickLeaveList;
    }

    @RequestMapping(value = "/sickLeaveInfo", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSectorsInformation(){
        return sickLeaveRepository.getSickLeaveUserSickLeaveStatusInformation(userBean.getUserUserGroupKey().getId());
    }

    @RequestMapping(value = "/sickLeaveInfoWait", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveUserSickLeaveStatusInformationForWait(){
        return sickLeaveRepository.getSickLeaveUserSickLeaveStatusInformationForWait(userBean.getUserUserGroupKey().getId());
    }

    @RequestMapping(value = "/sickLeaveFilteredBySickLeaveStatus/{key}", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredBySickLeaveStatus(@PathVariable Integer key ){
        return sickLeaveRepository.getSickLeaveFilteredBySickLeaveStatus(userBean.getUserUserGroupKey().getId(), key);
    }

    @RequestMapping(value = "/getSickLeaveFilteredByUserId/{key}", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredByUserId(@PathVariable Integer key ){
        return sickLeaveRepository.getSickLeaveFilteredByUserId(userBean.getUserUserGroupKey().getId(), key);
    }

    @Transactional
    @RequestMapping(value = "/addSickLeaveRequest", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    String insert(@RequestBody List<Date> dates) throws ParseException {
        if (dates.size() > 0) {
            dates.sort(Comparator.comparing(Date::toLocalDate));
            Notification notification = new Notification();
            User user = userRepository.getByIdAndActive(userBean.getUserUserGroupKey().getId(), (byte)1);
            List<User> users = userRepository.getAllByCompanyIdAndUserGroupIdAndActive(userBean.getUserUserGroupKey().getCompanyId(), 4, (byte)1);
            Calendar cal = Calendar.getInstance();
            cal.roll(Calendar.DATE, -1);
            if (dates.get(0).before(cal.getTime())) {
                SickLeave sickLeave = new SickLeave();
                sickLeave.setActive((byte) 1);
                sickLeave.setUserId(userBean.getUserUserGroupKey().getId());
                sickLeave.setDateFrom(new Timestamp(dates.get(0).getTime()));
                sickLeave.setDateTo(new Timestamp(dates.get(dates.size() - 1).getTime()));
                sickLeave.setSickLeaveStatusId(1);
                notification.setTitle("Bolovanje");
                notification.setLeaveType((byte) 4);
                notification.setText("Korisnik " + user.getFirstName() + " " + user.getLastName() + " je poslao zahtjev za polovanje " +
                         "u perioudu od " + dates.get(0) + " do " + dates.get(dates.size() - 1) + ".");
                notification.setCompanyId(userBean.getUserUserGroupKey().getCompanyId());
                notification.setSeen((byte) 0);
                notification.setActive((byte) 1);
                for(User element : users){
                    Notification temp = cloner.deepClone(notification);
                    temp.setId(null);
                    temp.setReceiverUserId(element.getId());
                    notificationRepository.saveAndFlush(temp);
                    if(user.getReceiveMail() == (byte)1)
                        emailNotification.sendNotification(user.getEmail(), temp.getTitle(), temp.getText());
                    notification = temp;

                }
                if (repo.saveAndFlush(sickLeave) != null) {
                    entityManager.refresh(sickLeave);
                    return "Zahtjev poslat.";
                } else {
                    return "Zahtjev nije poslat. Pokušajte ponovo.";
                }
            }
            return "Datum mora biti stariji od današnjeg datuma.";
        } else {
            return "Morate odabrati minimalno dva datuma.";
        }
    }


    @RequestMapping(value = "/updateSickLeaveStatusUnjustified/{sickLeaveId}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateSickLeaveStatusUnjustified(@PathVariable Integer sickLeaveId){
        sickLeaveRepository.updateSickLeaveStatusUnjustified(sickLeaveId);
        SickLeave sickLeave = sickLeaveRepository.getByIdAndActive(sickLeaveId, (byte) 1);
        User user = userRepository.getByIdAndActive(sickLeave.getUserId(), (byte)1);
        Notification notification = new Notification();
        notification.setReceiverUserId(sickLeave.getUserId());
        notification.setTitle("Bolovanje");
        notification.setText("Bolovanje u periodu od " + sickLeave.getDateFrom() + " do " + sickLeave.getDateTo() + " nije opravdano.");
        notification.setSeen((byte) 0);
        notification.setCompanyId(userBean.getUserUserGroupKey().getCompanyId());
        notification.setLeaveType((byte) 4);
        notification.setActive((byte) 1);
        notificationRepository.saveAndFlush(notification);
        if(user.getReceiveMail() == (byte)1)
            emailNotification.sendNotification(user.getEmail(), notification.getTitle(), notification.getText());
    }

    @RequestMapping(value = "/updateSickLeaveStatusJustified/{sickLeaveId}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateSickLeaveStatusJustified(@PathVariable Integer sickLeaveId){
        sickLeaveRepository.updateSickLeaveStatusJustified(sickLeaveId);
        SickLeave sickLeave = sickLeaveRepository.getByIdAndActive(sickLeaveId, (byte) 1);
        User user = userRepository.getByIdAndActive(sickLeave.getUserId(), (byte)1);
        Notification notification = new Notification();
        notification.setReceiverUserId(sickLeave.getUserId());
        notification.setTitle("Bolovanje");
        notification.setText("Bolovanje u periodu od " + sickLeave.getDateFrom() + " do " + sickLeave.getDateTo() + " je opravdano.");
        notification.setSeen((byte) 0);
        notification.setCompanyId(userBean.getUserUserGroupKey().getCompanyId());
        notification.setLeaveType((byte) 4);
        notification.setActive((byte) 1);
        notificationRepository.saveAndFlush(notification);
        if(user.getReceiveMail() == (byte)1)
            emailNotification.sendNotification(user.getEmail(), notification.getTitle(), notification.getText());
    }

    @Override
    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException {
        SickLeave sickLeave = sickLeaveRepository.findById(id).orElse(null);
        cloner.deepClone(sickLeave);
        Objects.requireNonNull(sickLeave).setActive((byte)0);
        if(sickLeaveRepository.getByIdAndActive(id,(byte)1) == null){
            logDeleteAction(sickLeave);
            return "Success";
        }
        else throw new BadRequestException(badRequestDelete);
    }

    @RequestMapping(value = "/sickLeaveFilteredBySickLeaveStatus/{key}/{userId}", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredBySickLeaveStatusForSelected(@PathVariable String key, @PathVariable Integer userId){
        ArrayList<SickLeaveUserSickLeaveStatus> leaves =(ArrayList) getSickLeaveFilteredByUserId(userId);
        ArrayList<SickLeaveUserSickLeaveStatus> remove = new ArrayList<>();

        for (SickLeaveUserSickLeaveStatus sl: leaves) {
            if (!sl.getStatusName().equals(key))
                remove.add(sl);
        }
        for (SickLeaveUserSickLeaveStatus rsl : remove){
            leaves.remove(rsl);
        }
        for(SickLeaveUserSickLeaveStatus sl :leaves)
            System.out.println("bolovanje od "+sl.getDateFrom()+" do "+sl.getDateTo()+" ime "+sl.getFirstName());
        return leaves;
    }
}

