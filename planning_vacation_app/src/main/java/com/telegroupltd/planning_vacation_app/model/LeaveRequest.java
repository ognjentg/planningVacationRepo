package com.telegroupltd.planning_vacation_app.model;

import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "leave_request", schema = "planning_vacation_db", catalog = "")
public class LeaveRequest implements HasActive {
    private Integer id;
    private String category;
    private String senderComment;
    private String approverComment;
    private Integer senderUserId;
    private Integer approverUserId;
    private Integer leaveTypeId;
    private Integer leaveRequestStatusId;
    private Integer companyId;
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
    @Column(name = "category", nullable = false, length = 45)
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Basic
    @Column(name = "sender_comment", nullable = true, length = -1)
    public String getSenderComment() {
        return senderComment;
    }

    public void setSenderComment(String senderComment) {
        this.senderComment = senderComment;
    }

    @Basic
    @Column(name = "approver_comment", nullable = true, length = -1)
    public String getApproverComment() {
        return approverComment;
    }

    public void setApproverComment(String approverComment) {
        this.approverComment = approverComment;
    }

    @Basic
    @Column(name = "sender_user_id", nullable = false)
    public Integer getSenderUserId() {
        return senderUserId;
    }

    public void setSenderUserId(Integer senderUserId) {
        this.senderUserId = senderUserId;
    }

    @Basic
    @Column(name = "approver_user_id", nullable = false)
    public Integer getApproverUserId() {
        return approverUserId;
    }

    public void setApproverUserId(Integer approverUserId) {
        this.approverUserId = approverUserId;
    }

    @Basic
    @Column(name = "leave_type_id", nullable = false)
    public Integer getLeaveTypeId() {
        return leaveTypeId;
    }

    public void setLeaveTypeId(Integer leaveTypeId) {
        this.leaveTypeId = leaveTypeId;
    }

    @Basic
    @Column(name = "leave_request_status_id", nullable = false)
    public Integer getLeaveRequestStatusId() {
        return leaveRequestStatusId;
    }

    public void setLeaveRequestStatusId(Integer leaveRequestStatusId) {
        this.leaveRequestStatusId = leaveRequestStatusId;
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
        LeaveRequest that = (LeaveRequest) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(category, that.category) &&
                Objects.equals(senderComment, that.senderComment) &&
                Objects.equals(approverComment, that.approverComment) &&
                Objects.equals(senderUserId, that.senderUserId) &&
                Objects.equals(approverUserId, that.approverUserId) &&
                Objects.equals(leaveTypeId, that.leaveTypeId) &&
                Objects.equals(leaveRequestStatusId, that.leaveRequestStatusId) &&
                Objects.equals(companyId, that.companyId) &&
                Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, category, senderComment, approverComment, senderUserId, approverUserId, leaveTypeId, leaveRequestStatusId, companyId, active);
    }
}
