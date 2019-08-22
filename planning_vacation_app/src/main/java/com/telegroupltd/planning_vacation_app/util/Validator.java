package com.telegroupltd.planning_vacation_app.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validator {

    public static Boolean stringMaxLength(String text, Integer maxLength) {
        if (text != null)
            return Integer.valueOf(text.length()).compareTo(maxLength) <= 0;
        return true;
    }

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
            return matcher.matches();
        }
        return true;
    }
}
