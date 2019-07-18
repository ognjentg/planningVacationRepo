package com.telegroupltd.planning_vacation_app.util;

public class MonthUserNo {
    private String month;
    private int number;
    private double procentage;
    private String category;

    public MonthUserNo(double procentage, String category) {
        this.procentage = procentage;
        this.category = category;
    }

    public double getProcentage() {
        return procentage;
    }

    public void setProcentage(double procentage) {
        this.procentage = procentage;
    }

    public MonthUserNo(String month, int number) {
        this.month = month;
        this.number = number;
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
