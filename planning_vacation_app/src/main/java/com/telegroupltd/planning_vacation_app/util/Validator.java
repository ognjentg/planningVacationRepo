package com.telegroupltd.planning_vacation_app.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validator {

    /*
     Metoda vraca true ako je duzina teksta manja ili jednaka vrijednosti maxLength, u suprotnom false
 */
    public static Boolean stringMaxLength(String text, Integer maxLength) {
        if (text != null)
            return Integer.valueOf(text.length()).compareTo(maxLength) <= 0;
        return true;
    }

    /*
        Metoda vraca true ako je duzina niza bajtova jednaka vrijednosti length, u suprotnom false
        Ako je tip u bazi LONGBLOB, za length se koristi vrijednost longblob.length iz application.properties
     */
    public static Boolean binaryMaxLength(byte[] bytes, Long maxLength) {
        if (bytes != null)
            return Long.valueOf(bytes.length).compareTo(maxLength) <= 0;
        return true;
    }
    public static Boolean passwordChecking(PasswordInformation passwordInfo) {
        String password = passwordInfo.getNewPassword();
        if(password.equals(passwordInfo.getOldPassword()))
            return false;
        if (password != null){
            String regex = "(?=.*[a-z])((?=.*[A-Z])|(?=.*[@#$%^&+=])|(?=.*[0-9]))(?=\\S+$).{8,}";
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(password);
            System.out.println(matcher.matches());
            return matcher.matches();
        }
        return true;
    }
}
