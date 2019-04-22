package com.telegroupltd.planning_vacation_app.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "non_working_day_in_week", schema = "planning_vacation_db", catalog = "")
public class NonWorkingDayInWeek {
    private Integer id;
    private Date from;
    private Date to;
    private Integer dayInWeekId;
    private Integer companyId;
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
    @Column(name = "from", nullable = false)
    public Date getFrom() {
        return from;
    }

    public void setFrom(Date from) {
        this.from = from;
    }

    @Basic
    @Column(name = "to", nullable = true)
    public Date getTo() {
        return to;
    }

    public void setTo(Date to) {
        this.to = to;
    }

    @Basic
    @Column(name = "day_in_week_id", nullable = false)
    public Integer getDayInWeekId() {
        return dayInWeekId;
    }

    public void setDayInWeekId(Integer dayInWeekId) {
        this.dayInWeekId = dayInWeekId;
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
        NonWorkingDayInWeek that = (NonWorkingDayInWeek) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(from, that.from) &&
                Objects.equals(to, that.to) &&
                Objects.equals(dayInWeekId, that.dayInWeekId) &&
                Objects.equals(companyId, that.companyId) &&
                Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, from, to, dayInWeekId, companyId, active);
    }
}
