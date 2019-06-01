package com.telegroupltd.planning_vacation_app.model;

import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "non_working_day_in_week", schema = "planning_vacation_db", catalog = "")
public class NonWorkingDayInWeek  implements HasActive {
    private Integer id;
    private Date fromDate;
    private Date toDate;
    private Integer dayInWeekId;
    private Integer companyId;
    private Byte active;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "from_date", nullable = false)
    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date from) {
        this.fromDate = from;
    }

    @Basic
    @Column(name = "to_date", nullable = true)
    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date to) {
        this.toDate = to;
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
                Objects.equals(fromDate, that.fromDate) &&
                Objects.equals(toDate, that.toDate) &&
                Objects.equals(dayInWeekId, that.dayInWeekId) &&
                Objects.equals(companyId, that.companyId) &&
                Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fromDate, toDate, dayInWeekId, companyId, active);
    }
}
