package com.telegroupltd.planning_vacation_app.model;

import javax.persistence.*;
import java.time.Year;
import java.util.Objects;

@Entity
@Table(name = "religion_leave", schema = "planning_vacation_db", catalog = "")
public class ReligionLeave {
    private Integer id;
    private Year year;
    private Integer numberOfDaysUsed;
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
    public Year getYear() {
        return year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    @Basic
    @Column(name = "number_of_days_used", nullable = false)
    public Integer getNumberOfDaysUsed() {
        return numberOfDaysUsed;
    }

    public void setNumberOfDaysUsed(Integer numberOfDaysUsed) {
        this.numberOfDaysUsed = numberOfDaysUsed;
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
        ReligionLeave that = (ReligionLeave) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(year, that.year) &&
                Objects.equals(numberOfDaysUsed, that.numberOfDaysUsed) &&
                Objects.equals(userId, that.userId) &&
                Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, year, numberOfDaysUsed, userId, active);
    }
}
