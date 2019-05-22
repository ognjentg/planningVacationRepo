package com.telegroupltd.planning_vacation_app.util;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Util {

    static SecureRandom rnd = new SecureRandom();

    //Generate random salt value
    public static String randomSalt() {

        byte[] s = new byte[16];
        rnd.nextBytes(s);
        String salt = Base64.getEncoder().encodeToString(s);
        return salt;

    }

    //Generate random password of 8 characters with letters and numbers
    public static String randomPassword() {

        String password = "";
        for (int i = 0; i < 4; i++) {
            char c = (char) (rnd.nextInt(26) + 'a');
            Integer nb = rnd.nextInt(10);
            password += c + nb.toString();
        }

        return password;
    }

    //Generate username by taking a substring from email till '@' character
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

    //Validate email construction, return true if valid
    public static Boolean validateEmail(String email) {

        String p = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        Pattern pattern = Pattern.compile(p);
        Matcher m = pattern.matcher(email);
        if (m.find())
            return true;
        else
            return false;
    }


    //Hash passwordToHash with given salt
    public static String hashPasswordSalt(String passwordToHash,String salt) {
        try {
            byte[] saltByte = Base64.getDecoder().decode(salt);
            KeySpec spec = new PBEKeySpec(passwordToHash.toCharArray(), saltByte, 65536, 128);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            byte[] hashByte = factory.generateSecret(spec).getEncoded();
            String hash = Base64.getEncoder().encodeToString(hashByte);
            return hash;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    //Calculate password strength. Returns 0 (invalid) and 1-3 for weak,medium and strong.
    public static Integer passwordStrength(String password)
    {
        Integer strength = 0;
        //TODO: expand the pattern to include non punctuation symbols, emojis, control characters,etc.
        String p = "(?:([\\p{Punct}\\p{Space}])|(\\p{L})|(\\p{Digit})){8,}";
        Pattern pattern = Pattern.compile(p);
        Matcher m = pattern.matcher(password);
        if (m.find())
        {
            if(m.group(1)!=null)
                strength += 1;
            if(m.group(2)!=null)
                strength += 1;
            if(m.group(3)!=null)
                strength += 1;
        }
        return strength;
    }

}
