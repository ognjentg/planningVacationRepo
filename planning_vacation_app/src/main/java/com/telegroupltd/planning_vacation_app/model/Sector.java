package com.telegroupltd.planning_vacation_app.model;

import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "sector")
public class Sector implements HasActive {
    private Integer id;
    private String name;
    private Integer maxAbsentPeople;
    private Double maxPercentageAbsentPeople;
    private Integer sectorManagerId;
    private Integer companyId;
    private Byte active;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = false, length = 45)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "max_absent_people", nullable = false)
    public Integer getMaxAbsentPeople() {
        return maxAbsentPeople;
    }

    public void setMaxAbsentPeople(Integer maxAbsentPeople) {
        this.maxAbsentPeople = maxAbsentPeople;
    }

    @Basic
    @Column(name = "max_percentage_absent_people", nullable = false, precision = 0)
    public Double getMaxPercentageAbsentPeople() {
        return maxPercentageAbsentPeople;
    }

    public void setMaxPercentageAbsentPeople(Double maxPercentageAbsentPeople) {
        this.maxPercentageAbsentPeople = maxPercentageAbsentPeople;
    }

    @Basic
    @Column(name = "sector_manager_id", nullable = false)
    public Integer getSectorManagerId() {
        return sectorManagerId;
    }

    public void setSectorManagerId(Integer sectorManagerId) {
        this.sectorManagerId = sectorManagerId;
    }

    @Basic
    @Column(name = "company_id", nullable = false)
    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    @Basic
    @Column(name = "active", nullable = false)
    public Byte getActive() {
        return active;
    }

    public void setActive(Byte active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sector sector = (Sector) o;
        return Objects.equals(id, sector.id) &&
                Objects.equals(name, sector.name) &&
                Objects.equals(maxAbsentPeople, sector.maxAbsentPeople) &&
                Objects.equals(maxPercentageAbsentPeople, sector.maxPercentageAbsentPeople) &&
                Objects.equals(sectorManagerId, sector.sectorManagerId) &&
                Objects.equals(companyId, sector.companyId) &&
                Objects.equals(active, sector.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, maxAbsentPeople, maxPercentageAbsentPeople, sectorManagerId, companyId, active);
    }
}
