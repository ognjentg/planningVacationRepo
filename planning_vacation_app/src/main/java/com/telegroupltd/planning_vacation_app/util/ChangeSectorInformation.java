package com.telegroupltd.planning_vacation_app.util;

public class ChangeSectorInformation {

    private Integer id, sectorId;

    public ChangeSectorInformation(Integer id, Integer sectorId) {
        this.id = id;
        this.sectorId = sectorId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSectorId() {
        return sectorId;
    }

    public void setSectorId(Integer sectorId) {
        this.sectorId = sectorId;
    }
}
