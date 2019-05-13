package com.telegroupltd.planning_vacation_app.model;

import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "leave_request_date", schema = "planning_vacation_db", catalog = "")
public class LeaveRequestDate implements HasActive {
    private Integer id;
    private Date date;
    private Byte canceled;
    private Byte paid;
    private Integer leaveRequestId;
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
    @Column(name = "date", nullable = false)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Basic
    @Column(name = "canceled", nullable = false)
    public Byte getCanceled() {
        return canceled;
    }

    public void setCanceled(Byte canceled) {
        this.canceled = canceled;
    }

    @Basic
    @Column(name = "paid", nullable = false)
    public Byte getPaid() {
        return paid;
    }

    public void setPaid(Byte paid) {
        this.paid = paid;
    }

    @Basic
    @Column(name = "leave_request_id", nullable = false)
    public Integer getLeaveRequestId() {
        return leaveRequestId;
    }

    public void setLeaveRequestId(Integer leaveRequestId) {
        this.leaveRequestId = leaveRequestId;
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
        LeaveRequestDate that = (LeaveRequestDate) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(date, that.date) &&
                Objects.equals(canceled, that.canceled) &&
                Objects.equals(paid, that.paid) &&
                Objects.equals(leaveRequestId, that.leaveRequestId) &&
                Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, canceled, paid, leaveRequestId, active);
    }
}
