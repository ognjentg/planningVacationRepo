package com.telegroupltd.planning_vacation_app.util;

public class ChangeManagerInformation {

    private Integer newManager, newEmployee;

    public ChangeManagerInformation(Integer newManager,Integer bla) {
        this.newManager = newManager;
    }

    public Integer getNewManager() { return newManager; }

    public void setNewManager(Integer newManager) { this.newManager = newManager; }

    public Integer getNewEmployee() { return newEmployee; }

    public void setNewEmployee(Integer newEmployee) { this.newEmployee = newEmployee; }
}
