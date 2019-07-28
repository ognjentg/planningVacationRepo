package com.telegroupltd.planning_vacation_app.util;

public class MonthUserNo {
    private String month;
    private int number;
    private double procentage;
    private String category;
    private String color;
    private int vacation;
    private int leave;
    private int religion;

    public int getVacation() {
        return vacation;
    }

    public void setVacation(int vacation) {
        this.vacation = vacation;
    }

    public int getLeave() {
        return leave;
    }

    public void setLeave(int leave) {
        this.leave = leave;
    }

    public int getReligion() {
        return religion;
    }

    public void setReligion(int religion) {
        this.religion = religion;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public MonthUserNo(double procentage, String category,String color) {
        this.procentage = procentage;
        this.category = category;
        this.color=color;
    }

    public MonthUserNo(String month, int number,String color, int vacation, int leave, int religion) {
        this.month = month;
        this.number = number;
        this.color=color;
        this.vacation=vacation;
        this.leave=leave;
        this.religion=religion;
    }

    public double getProcentage() {
        return procentage;
    }

    public void setProcentage(double procentage) {
        this.procentage = procentage;
    }

    public MonthUserNo(String month, int number, String colors) {
        this.month = month;
        this.number = number;
        this.color=colors;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
