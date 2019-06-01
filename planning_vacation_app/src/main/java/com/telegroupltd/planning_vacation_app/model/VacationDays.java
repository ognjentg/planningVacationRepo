package com.telegroupltd.planning_vacation_app.model;

import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "vacation_days", schema = "planning_vacation_db", catalog = "")
public class VacationDays implements HasActive {
    private Integer id;
    private Integer year;
    private Integer usedDays;
    private Integer totalDays;
    private Integer userId;
    private Byte active;

    @Id
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "year", nullable = false)
    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    @Basic
    @Column(name = "used_days", nullable = false)
    public Integer getUsedDays() {
        return usedDays;
    }

    public void setUsedDays(Integer usedDays) {
        this.usedDays = usedDays;
    }

    @Basic
    @Column(name = "total_days", nullable = false)
    public Integer getTotalDays() {
        return totalDays;
    }

    public void setTotalDays(Integer totalDays) {
        this.totalDays = totalDays;
    }

    @Basic
    @Column(name = "user_id", nullable = false)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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
        VacationDays that = (VacationDays) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(year, that.year) &&
                Objects.equals(usedDays, that.usedDays) &&
                Objects.equals(totalDays, that.totalDays) &&
                Objects.equals(userId, that.userId) &&
                Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, year, usedDays, totalDays, userId, active);
    }
}
