package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.SickLeave;
import com.telegroupltd.planning_vacation_app.model.SickLeaveUserSickLeaveStatus;
import com.telegroupltd.planning_vacation_app.repository.SickLeaveRepository;
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

    @PersistenceContext
    private EntityManager entityManager;

    @Value("Brisanje nije moguće.")
    private String badRequestDelete;

    @Autowired
    SickLeaveController(SickLeaveRepository sickLeaveRepository)
    {
        super(sickLeaveRepository);
        this.sickLeaveRepository = sickLeaveRepository;
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
        return sickLeaveRepository.getSickLeaveUserSickLeaveStatusInformation(userBean.getUser().getId());
    }

    @RequestMapping(value = "/sickLeaveInfoWait", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveUserSickLeaveStatusInformationForWait(){
        return sickLeaveRepository.getSickLeaveUserSickLeaveStatusInformationForWait(userBean.getUser().getId());
    }

    @RequestMapping(value = "/sickLeaveFilteredBySickLeaveStatus/{key}", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredBySickLeaveStatus(@PathVariable Integer key ){
        return sickLeaveRepository.getSickLeaveFilteredBySickLeaveStatus(userBean.getUser().getId(), key);
    }

    @RequestMapping(value = "/getSickLeaveFilteredByUserId/{key}", method = RequestMethod.GET)
    public @ResponseBody
    List<SickLeaveUserSickLeaveStatus> getSickLeaveFilteredByUserId(@PathVariable Integer key ){
        return sickLeaveRepository.getSickLeaveFilteredByUserId(userBean.getUser().getId(), key);
    }

    @Transactional
    @RequestMapping(value = "/addSickLeaveRequest", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    String insert(@RequestBody List<Date> dates) throws ParseException {
        if (dates.size() > 0) {
            dates.sort(Comparator.comparing(Date::toLocalDate));

            Calendar cal = Calendar.getInstance();
            cal.roll(Calendar.DATE, -1);
            if (dates.get(0).before(cal.getTime())) {
                SickLeave sickLeave = new SickLeave();
                sickLeave.setActive((byte) 1);
                sickLeave.setUserId(userBean.getUser().getId());
                sickLeave.setDateFrom(new Timestamp(dates.get(0).getTime()));
                sickLeave.setDateTo(new Timestamp(dates.get(dates.size() - 1).getTime()));
                sickLeave.setSickLeaveStatusId(1);
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
    }

    @RequestMapping(value = "/updateSickLeaveStatusJustified/{sickLeaveId}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateSickLeaveStatusJustified(@PathVariable Integer sickLeaveId){
        sickLeaveRepository.updateSickLeaveStatusJustified(sickLeaveId);
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
    void getSickLeaveFilteredBySickLeaveStatusForSelected(@PathVariable Integer key, @PathVariable Integer userId){
        ArrayList<SickLeave> leaves =(ArrayList) getAll();
        for (SickLeave sl: leaves) {
            System.out.println("user id " + sl.getUserId()+ " i jos " + sl.getSickLeaveStatusId());
        }
    }
}

