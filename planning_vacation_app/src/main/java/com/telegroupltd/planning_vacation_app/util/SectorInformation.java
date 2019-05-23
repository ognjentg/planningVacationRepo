package com.telegroupltd.planning_vacation_app.util;

public class SectorInformation {
    private Integer id;
    private String name;
    private Double maxPercentageAbsentPeople;
    private String managerName;
    private String managerSurname;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getMaxPercentageAbsentPeople() {
        return maxPercentageAbsentPeople;
    }

    public String getManagerName() {
        return managerName;
    }

    public String getManagerSurname() {
        return managerSurname;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMaxPercentageAbsentPeople(Double maxPercentageAbsentPeople) {
        this.maxPercentageAbsentPeople = maxPercentageAbsentPeople;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public void setManagerSurname(String managerSurname) {
        this.managerSurname = managerSurname;
    }

    public SectorInformation(Integer id, String name, Double maxPercentageAbsentPeople, String managerName, String managerSurname) {
        this.id = id;
        this.name = name;
        this.maxPercentageAbsentPeople = maxPercentageAbsentPeople;
        this.managerName = managerName;
        this.managerSurname = managerSurname;
    }
}
