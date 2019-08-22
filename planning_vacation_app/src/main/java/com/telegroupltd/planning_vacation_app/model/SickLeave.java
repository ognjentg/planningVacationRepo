package com.telegroupltd.planning_vacation_app.model;

import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@Table(name = "sick_leave", schema = "planning_vacation_db", catalog = "")
public class SickLeave implements HasActive  {
    private Integer id;
    private Timestamp dateFrom;
    private Timestamp dateTo;
    private Integer sickLeaveStatusId;
    private Integer userId;
    private Byte active;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "date_from", nullable = false)
    public Timestamp getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Timestamp dateFrom) {
        this.dateFrom = dateFrom;
    }

    @Basic
    @Column(name = "date_to", nullable = false)
    public Timestamp getDateTo() {
        return dateTo;
    }

    public void setDateTo(Timestamp dateTo) {
        this.dateTo = dateTo;
    }

    @Basic
    @Column(name = "sick_leave_status_id", nullable = false)
    public Integer getSickLeaveStatusId() {
        return sickLeaveStatusId;
    }

    public void setSickLeaveStatusId(Integer sickLeaveStatusId) {
        this.sickLeaveStatusId = sickLeaveStatusId;
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
        SickLeave sickLeave = (SickLeave) o;
        return Objects.equals(id, sickLeave.id) &&
                Objects.equals(dateFrom, sickLeave.dateFrom) &&
                Objects.equals(dateTo, sickLeave.dateTo) &&
                Objects.equals(sickLeaveStatusId, sickLeave.sickLeaveStatusId) &&
                Objects.equals(userId, sickLeave.userId) &&
                Objects.equals(active, sickLeave.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dateFrom, dateTo, sickLeaveStatusId, userId, active);
    }
}
