package com.telegroupltd.planning_vacation_app.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Util {

    static SecureRandom rnd = new SecureRandom();

    public static String randomSalt() {

        byte[] s = new byte[16];
        rnd.nextBytes(s);
        String salt = Base64.getEncoder().encodeToString(s);
        return salt;

    }

    public static String randomPassword() {

        String password = "";
        for (int i = 0; i < 4; i++) {
            char c = (char) (rnd.nextInt(26) + 'a');
            Integer nb = rnd.nextInt(10);
            password += c + nb.toString();
        }

        return password;
    }

    public static String generateUsername(String email) {

        String addition = "";
        for (int i = 0; i < 2; i++) {
            char c = (char) (rnd.nextInt(26) + 'a');
            Integer nb = rnd.nextInt(10);
            addition += c + nb.toString();
        }
        String username = email.substring(0, email.indexOf('@')) + addition;
        return username;
    }

    public static Boolean validateEmail(String email) {

        String p = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        Pattern pattern = Pattern.compile(p);
        Matcher m = pattern.matcher(email);
        if (m.find())
            return true;
        else
            return false;
    }

    public static String hashPasswordSalt(String passwordToHash, String salt) {
        String generatedPassword = null;
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-512");
            messageDigest.update(salt.getBytes());
            byte[] bytes = messageDigest.digest(passwordToHash.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }

            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return generatedPassword;
    }

    public static Integer passwordStrength(String password) {
        Integer strength = 0;
        String p = "(?:([\\p{Punct}\\p{Space}])|(\\p{L})|(\\p{Digit})){8,}";
        Pattern pattern = Pattern.compile(p);
        Matcher m = pattern.matcher(password);
        if (m.find()) {
            if (m.group(1) != null)
                strength += 1;
            if (m.group(2) != null)
                strength += 1;
            if (m.group(3) != null)
                strength += 1;
        }
        return strength;
    }

}
