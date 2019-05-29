package com.telegroupltd.planning_vacation_app.util;

public class PasswordInformation {
    private String oldPassword;
    private String newPassword;
    private String newPasswordConfirmation;

    public PasswordInformation() {
    }

    public PasswordInformation(String oldPassword, String newPassword, String repeatedNewPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.newPasswordConfirmation = repeatedNewPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewPasswordConfirmation() {
        return newPasswordConfirmation;
    }

    public void setNewPasswordConfirmation(String newPasswordConfirmation) {
        this.newPasswordConfirmation = newPasswordConfirmation;
    }
}
