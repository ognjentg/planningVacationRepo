package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestLeaveRequestDays;
import com.telegroupltd.planning_vacation_app.model.NonWorkingDay;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.model.VacationDays;
import com.telegroupltd.planning_vacation_app.repository.LeaveRequestRepository;
import com.telegroupltd.planning_vacation_app.repository.NonWorkingDayRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import com.telegroupltd.planning_vacation_app.repository.VacationDaysRepository;
import com.telegroupltd.planning_vacation_app.util.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping(value = "/hub/nonWorkingDay")
@Scope("request")
public class NonWorkingDayController extends GenericHasActiveController<NonWorkingDay, Integer> {
    private final NonWorkingDayRepository nonWorkingDayRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    @Autowired
    private VacationDaysRepository vacationDaysRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Notification emailNotification;

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

    public NonWorkingDayController(NonWorkingDayRepository nonWorkingDayRepository) {
        super(nonWorkingDayRepository);
        this.nonWorkingDayRepository = nonWorkingDayRepository;
    }

    @Override
    @Transactional
    public List<NonWorkingDay> getAll() {
        return nonWorkingDayRepository.getAllByActiveIs((byte) 1);
    }

    @RequestMapping(value = "/getNonWorkingDayByCompany/{companyId}", method = RequestMethod.GET)
    public List<NonWorkingDay> getNonWorkingDayForCompany(@PathVariable Integer companyId) {
        List<NonWorkingDay> nonWorkingDayList = nonWorkingDayRepository.getAllByActiveAndCompanyId((byte) 1, companyId);
        List<NonWorkingDay> result = new ArrayList<>();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String currentDate = dateFormat.format(date);
        for (NonWorkingDay nonWorkingDay : nonWorkingDayList) {
            String nonWorkingDate = nonWorkingDay.getDay().toString();
            if (currentDate.compareTo(nonWorkingDate) <= 0) {
                result.add(nonWorkingDay);
            }
        }
        return result;
    }

    @RequestMapping(value = "/getNonWorkingDayByCompanyString/{companyId}", method = RequestMethod.GET)
    public List<String> getNonWorkingDayForCompanyString(@PathVariable Integer companyId) throws ParseException {
        List<String> dates = new ArrayList<>();
        List<NonWorkingDay> nonWorkingDayList = nonWorkingDayRepository.getAllByActiveAndCompanyId((byte) 1, companyId);
        for (NonWorkingDay nonWorkingDay : nonWorkingDayList) {
            String startDate = nonWorkingDay.getDay().toString();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date date = simpleDateFormat.parse(startDate);

            String patter = "dd.MM.yyyy";
            SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat(patter);
            String dateString = simpleDateFormat1.format(date);
            dates.add(dateString);
        }
        return dates;
    }

    @Transactional
    @RequestMapping(value = "/addNonWorkingDays", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    void insert(@RequestBody List<NonWorkingDay> nonWorkingDays) throws ParseException, BadRequestException {

        for (NonWorkingDay nonWorkingDay : nonWorkingDays) {
            NonWorkingDay newNonWorkingDay = new NonWorkingDay();
            newNonWorkingDay.setDay(nonWorkingDay.getDay());
            newNonWorkingDay.setCompanyId(nonWorkingDay.getCompanyId());
            newNonWorkingDay.setActive((byte) 1);

            List<NonWorkingDay> nonWorkingDayList = getNonWorkingDayForCompany(nonWorkingDay.getCompanyId());
            boolean isExist = false;
            for (NonWorkingDay nonWorkingDay1 : nonWorkingDayList) {
                String date1 = nonWorkingDay1.getDay().toString();
                String date2 = nonWorkingDay.getDay().toString();

                if (nonWorkingDay1.getActive() == 1 && date1.equals(date2)
                        && nonWorkingDay1.getCompanyId() == newNonWorkingDay.getCompanyId()) {
                    isExist = true;
                    delete(nonWorkingDay);
                }
            }

            if (!isExist) {
                if (repo.saveAndFlush(newNonWorkingDay) != null) {
                    entityManager.refresh(newNonWorkingDay);
                    nonWorkingDays.forEach(element -> {
                        List<LeaveRequestLeaveRequestDays> leaveRequestLeaveRequestDays = leaveRequestRepository.getAllLeaveRequestDaysDaysFilteredByPeriodAndCompanyId(element.getDay(), element.getDay(), userBean.getUserUserGroupKey().getCompanyId());
                        leaveRequestLeaveRequestDays.forEach(elementTemp -> {
                            VacationDays vacationDays = vacationDaysRepository.getByUserIdAndYearAndActive(elementTemp.getUserId(), Calendar.getInstance().get(Calendar.YEAR), (byte) 1);
                            Integer numOfUsedDays = vacationDays.getUsedDays() - 1;
                            if (numOfUsedDays < 0)
                                numOfUsedDays = 0;
                            vacationDays.setUsedDays(numOfUsedDays);
                            vacationDaysRepository.saveAndFlush(vacationDays);
                        });
                    });
                    SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy.");
                    String dates = "";
                    for (NonWorkingDay temp : nonWorkingDays) {
                        dates += formatter.format(temp.getDay()) + ", ";
                    }
                    for (User user : userRepository.getAllByCompanyIdAndActive(userBean.getUserUserGroupKey().getCompanyId(), (byte) 1)) {
                        emailNotification.createNotification(user, "Neradni dani", " Dani: " + dates + "će biti neradni.", null);
                    }
                }
            }
        }
    }

    @Override
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException {
        NonWorkingDay nonWorkingDay = nonWorkingDayRepository.findById(id).orElse(null);
        cloner.deepClone(nonWorkingDay);
        Objects.requireNonNull(nonWorkingDay).setActive((byte) 0);
        return "Uspjesno";
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable NonWorkingDay nonWorkingDay1) throws BadRequestException {

        List<NonWorkingDay> nonWorkingDaysList = getNonWorkingDayForCompany(nonWorkingDay1.getCompanyId());
        for (NonWorkingDay nonWorkingDay : nonWorkingDaysList) {
            String date1 = nonWorkingDay1.getDay().toString();
            String date2 = nonWorkingDay.getDay().toString();
            if (nonWorkingDay.getActive() == 1 && date1.equals(date2)) {
                nonWorkingDay.setActive((byte) 0);
                SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy.");
                if (repo.saveAndFlush(nonWorkingDay) != null) {
                    for (User user : userRepository.getAllByCompanyIdAndActive(userBean.getUserUserGroupKey().getCompanyId(), (byte) 1)) {
                        emailNotification.createNotification(user, "Neradni dan", "Neadni dan " + formatter.format(nonWorkingDay1.getDay()) + " je promijenjen u radni.", null);
                    }
                    return "Uspjesno";
                }
            }
        }
        return "Neuspjesno";
    }

}
