package com.telegroupltd.planning_vacation_app.util;

public class UserLoginInformation {
    private String username;
    private String password;
    private String companyPin;

    public UserLoginInformation(){}

    public UserLoginInformation(String username, String password, String companyPin) {
        this.username = username;
        this.password = password;
        this.companyPin = companyPin;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCompanyPin() {
        return companyPin;
    }

    public void setCompanyPin(String companyPin) {
        this.companyPin = companyPin;
    }
}
