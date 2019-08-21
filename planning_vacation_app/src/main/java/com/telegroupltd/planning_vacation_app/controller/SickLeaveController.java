package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.SickLeave;
import com.telegroupltd.planning_vacation_app.model.SickLeaveUserSickLeaveStatus;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.SickLeaveRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import com.telegroupltd.planning_vacation_app.util.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@RequestMapping(value = "/hub/sickLeave")
@RestController
@Scope("request")
public class SickLeaveController extends GenericHasActiveController<SickLeave, Integer> {
    private final SickLeaveRepository sickLeaveRepository;

    @Autowired
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    Notification emailNotification;

    @Value("Brisanje nije moguće.")
    private String badRequestDelete;

    @Autowired
    SickLeaveController(SickLeaveRepository sickLeaveRepository) {
        super(sickLeaveRepository);
        this.sickLeaveRepository = sickLeaveRepository;
    }

    @Override
    public @ResponseBody
    List<SickLeave> getAll() {
        List<SickLeave> sickLeaveList = cloner.deepClone(sickLeaveRepository.getAllByActiveIs((byte) 1));
        return sickLeaveList;
    }

    @RequestMapping(value = "/sickLeaveInfo/{key}", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSectorsInformation(@PathVariable Integer key) {
        return sickLeaveRepository.getSickLeaveUserSickLeaveStatusInformation(userBean.getUserUserGroupKey().getId(), key);
    }

    @RequestMapping(value = "/sickLeaveInfoWait/{key}", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveUserSickLeaveStatusInformationForWait(@PathVariable Integer key) {
        return sickLeaveRepository.getSickLeaveUserSickLeaveStatusInformationForWait(userBean.getUserUserGroupKey().getId(), key);
    }

    @RequestMapping(value = "/sickLeaveFilteredBySickLeaveStatusStatus/{key}/{companyId}", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredBySickLeaveStatus(@PathVariable Integer key, @PathVariable Integer companyId) {
        return sickLeaveRepository.getSickLeaveFilteredBySickLeaveStatus(userBean.getUserUserGroupKey().getId(), key, companyId);
    }

    @RequestMapping(value = "/getSickLeaveFilteredByUserId/{key}", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredByUserId(@PathVariable Integer key) {
        return sickLeaveRepository.getSickLeaveFilteredByUserId(userBean.getUserUserGroupKey().getId(), key);
    }

    @Transactional
    @RequestMapping(value = "/addSickLeaveRequest", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    String insert(@RequestBody List<Date> dates) throws BadRequestException {
        if (dates.size() > 0) {
            dates.sort(Comparator.comparing(Date::toLocalDate));
            User user = userRepository.getByIdAndActive(userBean.getUserUserGroupKey().getId(), (byte) 1);
            List<User> users = userRepository.getAllByCompanyIdAndUserGroupIdAndActive(userBean.getUserUserGroupKey().getCompanyId(), 4, (byte) 1);
            Calendar cal = Calendar.getInstance();
            cal.roll(Calendar.DATE, -1);
            if (dates.get(0).before(cal.getTime())) {
                SickLeave sickLeave = new SickLeave();
                sickLeave.setActive((byte) 1);
                sickLeave.setUserId(userBean.getUserUserGroupKey().getId());
                sickLeave.setDateFrom(new Timestamp(dates.get(0).getTime()));
                sickLeave.setDateTo(new Timestamp(dates.get(dates.size() - 1).getTime()));
                sickLeave.setSickLeaveStatusId(1);
                String notificationText = "Korisnik " + user.getFirstName() + " " + user.getLastName() + " je poslao zahtjev za bolovanje " +
                        "u perioudu od " + dates.get(0) + " do " + dates.get(dates.size() - 1) + ".";
                for (User element : users) {
                    emailNotification.createNotification(element, "Bolovanje", notificationText, (byte) 4);
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
    void updateSickLeaveStatusUnjustified(@PathVariable Integer sickLeaveId) throws BadRequestException {
        sickLeaveRepository.updateSickLeaveStatusUnjustified(sickLeaveId);
        SickLeave sickLeave = sickLeaveRepository.getByIdAndActive(sickLeaveId, (byte) 1);
        User user = userRepository.getByIdAndActive(sickLeave.getUserId(), (byte) 1);
        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy.");
        String dateFrom = format.format(sickLeave.getDateFrom());
        String dateTo = format.format(sickLeave.getDateTo());
        emailNotification.createNotification(user, "Bolovanje", "Bolovanje u periodu od " + dateFrom + " do " + dateTo + " nije opravdano.", (byte) 4);
    }

    @RequestMapping(value = "/updateSickLeaveStatusJustified/{sickLeaveId}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateSickLeaveStatusJustified(@PathVariable Integer sickLeaveId) throws BadRequestException {
        sickLeaveRepository.updateSickLeaveStatusJustified(sickLeaveId);
        SickLeave sickLeave = sickLeaveRepository.getByIdAndActive(sickLeaveId, (byte) 1);
        User user = userRepository.getByIdAndActive(sickLeave.getUserId(), (byte) 1);
        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy.");
        String dateFrom = format.format(sickLeave.getDateFrom());
        String dateTo = format.format(sickLeave.getDateTo());
        emailNotification.createNotification(user, "Bolovanje", "Bolovanje u periodu od " + dateFrom + " do " + dateTo + " je opravdano.", (byte) 4);
    }

    @Override
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException {
        SickLeave sickLeave = sickLeaveRepository.findById(id).orElse(null);
        cloner.deepClone(sickLeave);
        Objects.requireNonNull(sickLeave).setActive((byte) 0);
        if (sickLeaveRepository.getByIdAndActive(id, (byte) 1) == null) {
            logDeleteAction(sickLeave);
            return "Success";
        } else throw new BadRequestException(badRequestDelete);
    }

    @RequestMapping(value = "/sickLeaveFilteredBySickLeaveStatus/{key}/{userId}", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredBySickLeaveStatusForSelected(@PathVariable String key, @PathVariable Integer userId) {
        ArrayList<SickLeaveUserSickLeaveStatus> leaves = (ArrayList) getSickLeaveFilteredByUserId(userId);
        ArrayList<SickLeaveUserSickLeaveStatus> remove = new ArrayList<>();

        for (SickLeaveUserSickLeaveStatus sl : leaves) {
            if (!sl.getStatusName().equals(key))
                remove.add(sl);
        }
        for (SickLeaveUserSickLeaveStatus rsl : remove) {
            leaves.remove(rsl);
        }
        return leaves;
    }
}

