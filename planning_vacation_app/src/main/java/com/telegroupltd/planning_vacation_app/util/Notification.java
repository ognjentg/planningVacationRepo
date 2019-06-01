package com.telegroupltd.planning_vacation_app.util;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

@Component
public class Notification {

    @Autowired
    EmailService emailService;
    /*
    Metoda koja ce  na email adresu korisnika slati podatke neophodne za njegovo prijavljivanje: korisnicko ime, lozinku  i PIN kompanije
     */
    /*
    Method which will send an email to the specified email address, containing the username, passoword and company PIN
     */
    public void sendLoginLink(String emailReceiver, String username, String password, String companyPin) {
        //TODO: Add ability to format the message with configuration.
        String prettyText = "Vaše korisničko ime: " + username + "\n" +"Vaša šifra: "+ password + "\n" +"Vaš PIN broj: "+ companyPin;
        emailService.sendMail(emailReceiver,"Vaši korisnički podatci.", prettyText);
    }
}
