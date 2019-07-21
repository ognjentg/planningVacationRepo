package com.telegroupltd.planning_vacation_app.model;

import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.util.Objects;


@Entity
public class Notification implements HasActive {
    private Integer id;
    private Integer receiverUserId;
    private Integer companyId;
    private String title;
    private String text;
    private Byte leaveType;
    private Byte seen;
    private Byte active;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id", nullable = false, unique = true)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "receiver_user_id")
    public Integer getReceiverUserId() {
        return receiverUserId;
    }

    public void setReceiverUserId(Integer receiverUserId) {
        this.receiverUserId = receiverUserId;
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
    @Column(name = "title", nullable = false)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "text", nullable = false)
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Basic
    @Column(name = "leave_type", nullable = false)
    public Byte getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(Byte leaveType) {
        this.leaveType = leaveType;
    }

    @Basic
    @Column(name = "seen", nullable = false)
    public Byte getSeen() {
        return seen;
    }

    public void setSeen(Byte seen) {
        this.seen = seen;
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
        Notification that = (Notification) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(receiverUserId, that.receiverUserId) &&
                Objects.equals(companyId, that.companyId) &&
                Objects.equals(title, that.title) &&
                Objects.equals(text, that.text) &&
                Objects.equals(leaveType, that.leaveType) &&
                Objects.equals(seen, that.seen) &&
                Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, receiverUserId, companyId, title, text, leaveType, seen, active);
    }
}
