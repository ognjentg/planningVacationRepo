package com.telegroupltd.planning_vacation_app.controller;


import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.LeaveRequestUserLeaveRequestStatus;
import com.telegroupltd.planning_vacation_app.model.Notification;
import com.telegroupltd.planning_vacation_app.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Objects;

@RequestMapping(value = "/hub/notification")
@RestController
@Scope("request")
public class NotificationController extends GenericHasActiveController<Notification, Integer> {
    private final NotificationRepository notificationRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("Dodavanje nije moguće.")
    private String badRequestInsert;

    public NotificationController(NotificationRepository notificationRepository) {
        super(notificationRepository);
        this.notificationRepository = notificationRepository;
    }

    @Override
    @Transactional
    public List<Notification> getAll() {
        return notificationRepository.getAllByActiveIs((byte) 1);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody
    Notification findById(@PathVariable Integer id) {
        return notificationRepository.getById(id);
    }

    @RequestMapping(value = "/getNotificationByCompany/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<Notification> getNotificationByCompay(@PathVariable Integer id) {
        return notificationRepository.getAllByCompanyIdAndActive(id, (byte) 1);
    }

    @RequestMapping(value = "/getAllNotificationByUser/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<Notification> getAllNotificationByUser(@PathVariable Integer id) {
        List<Notification> notifications = notificationRepository.getAllByReceiverUserIdAndActive(id, (byte) 1);
        if("sekretar".equals(userBean.getUserUserGroupKey().getUserGroupKey()))
            notifications.addAll(notificationRepository.getAllByReceiverUserIdAndLeaveTypeAndCompanyIdAndActive(null, (byte) 4, userBean.getUserUserGroupKey().getCompanyId(), (byte)1));
        return notifications;
    }

    @RequestMapping(value = "/getNotSeenNotificationByUser/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<Notification> getNotSeenNotificationByUser(@PathVariable Integer id) {
        List<Notification> notifications = notificationRepository.getAllByReceiverUserIdAndActiveAndSeen(id, (byte) 1, (byte) 0);
        if("sekretar".equals(userBean.getUserUserGroupKey().getUserGroupKey()))
            notifications.addAll(notificationRepository.getAllByReceiverUserIdAndLeaveTypeAndCompanyIdAndActive(null, (byte) 4, userBean.getUserUserGroupKey().getCompanyId(), (byte)1));
        return notifications;
    }

    // promjena seen-a u zavisnosti od toga da li je korisnik procitao notifikaciju ili je postavio da nije procitana
    @Override
    @Transactional
    @RequestMapping(method = RequestMethod.PUT)
    public String update(Integer notificationId, @RequestBody Notification newNotification) throws BadRequestException, ForbiddenException {
        Notification notification = notificationRepository.getById(notificationId);
        if (notification != null) {
            if (notification.getSeen() == 0)
                newNotification.setSeen((byte) 1);
            else
                newNotification.setSeen((byte) 0);
            if (repo.saveAndFlush(newNotification) != null)
                return "uspjesno";
        }
        throw new BadRequestException("Bad Request");
    }

    @Transactional
    @RequestMapping(value = "/updateNotifications", method = RequestMethod.PUT)
    public @ResponseBody
    void update(@RequestBody List<Notification> notifications) throws BadRequestException, ForbiddenException {
        for (Notification notification : notifications) {
            Notification notificationBase = notificationRepository.getById(notification.getId());
            if (notificationBase != null) {
                if (notificationBase.getSeen() == 0)
                    notification.setSeen((byte) 1);
                else
                    notification.setSeen((byte) 0);
                if (repo.saveAndFlush(notification) != null);
            }
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) {
        Notification notification = notificationRepository.getById(id);
        cloner.deepClone(notification);
        Objects.requireNonNull(notification).setActive((byte)0);
        return "Uspjesno";
    }

    @Transactional
    @RequestMapping(value = "/addNotification", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    void insertNotification(@RequestBody LeaveRequestUserLeaveRequestStatus leaveRequestUserLeaveRequestStatus, Integer reject) throws ParseException {
        Notification notification = null;
        notification.setReceiverUserId(leaveRequestUserLeaveRequestStatus.getSenderUserId());
        notification.setCompanyId(userBean.getUserUserGroupKey().getCompanyId());
        notification.setSeen((byte) 0);
        notification.setActive((byte) 1);
        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy.");
        String dateFrom = format.format(leaveRequestUserLeaveRequestStatus.getDateFrom());
        String dateTo = format.format((leaveRequestUserLeaveRequestStatus.getDateTo()));
        if ("Godišnji".equals(leaveRequestUserLeaveRequestStatus.getCategory())) {
            notification.setTitle("Zahtjev za godišnji odmor");
            if (reject == 0)
                notification.setTitle("Godišnji odmor u periodu od " + dateFrom + " do "
                + dateTo + " je odbijen.");
            else
                notification.setText("Godišnji odmor u periodu od " + dateFrom + " do "
                        + dateTo + " je odobren.");
        } else if ("Odsustvo".equals(leaveRequestUserLeaveRequestStatus.getCategory())) {
            notification.setTitle("Zahtjev za odsustvo");
            if (reject == 0)
                notification.setTitle("Odsustvo u periodu od " + dateFrom + " do "
                        + dateTo + " je odbijeno.");
            else
                notification.setText("Odsustvo u periodu od " + dateFrom + " do "
                        + dateTo + " je odobreno");
        } else if ("Praznik".equals(leaveRequestUserLeaveRequestStatus.getCategory())) {
            notification.setTitle("Zahtjev za praznik");
            if (reject == 0)
                notification.setTitle("Praznik u periodu od " + dateFrom + " do "
                        + dateTo + " je odbijen.");
            else
                notification.setText("Praznik u periodu od " + dateFrom + " do "
                        + dateTo + " je odobren.");
        }
    }
}
