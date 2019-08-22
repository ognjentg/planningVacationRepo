package com.telegroupltd.planning_vacation_app.util;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Notification {

    @Autowired
    EmailService emailService;

    @Autowired
    NotificationRepository notificationRepository;

    @Value("User is null.")
    private String noUser;

    @Value("Pogrešan je naslov.")
    private String noTitle;

    @Value("Pogrešan je tekst.")
    private String noText;

    public void sendLoginLink(String emailReceiver, String username, String password, String companyPin) {
        String prettyText = "Vaša šifra: "+ password + "\n" +"Vaš PIN broj: "+ companyPin;
        new Thread(() -> emailService.sendMail(emailReceiver,"Vaši korisnički podaci.", prettyText)).start();
    }

    public void sendNotification(String emailReceiver, String title, String text){
        new Thread(() -> emailService.sendMail(emailReceiver, title, text)).start();
    }

    public void createNotification(User user, String title, String text, Byte leaveType) throws BadRequestException {
        if(user == null)
            throw new BadRequestException(noUser);
        if(title == null)
            throw new BadRequestException(noTitle);
        if(text == null)
            throw new BadRequestException(noText);
        com.telegroupltd.planning_vacation_app.model.Notification notification = new com.telegroupltd.planning_vacation_app.model.Notification();
        notification.setSeen((byte) 0);
        notification.setCompanyId(user.getCompanyId());
        notification.setActive((byte) 1);
        notification.setText(text);
        notification.setTitle(title);
        notification.setReceiverUserId(user.getId());
        notification.setLeaveType(leaveType);
        notificationRepository.saveAndFlush(notification);
        if(user.getReceiveMail() != null && user.getReceiveMail() == (byte)1 && user.getEmail() != null)
            try {
                sendNotification(user.getEmail(), title, text);
            }
            catch (Throwable thr){
                thr.printStackTrace();
            }
    }


}
