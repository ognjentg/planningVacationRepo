package com.telegroupltd.planning_vacation_app.model;


import javax.persistence.*;

@SqlResultSetMapping(
        name = "LeaveRequestUserLeaveRequestStatusMapping",
        classes = @ConstructorResult(
                targetClass = LeaveRequestUserLeaveRequestStatus.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "category", type = String.class),
                        @ColumnResult(name = "sender_comment", type = String.class),
                        @ColumnResult(name = "approver_comment", type = String.class),
                        @ColumnResult(name = "sender_user_id", type = Integer.class),
                        @ColumnResult(name = "approver_user_id", type = Integer.class),
                        @ColumnResult(name = "leave_type_id", type = Integer.class),
                        @ColumnResult(name = "leave_request_status_id", type = Integer.class),
                        @ColumnResult(name = "company_id", type = Integer.class),
                        @ColumnResult(name = "active", type = Byte.class),
                        @ColumnResult(name = "first_name", type = String.class),
                        @ColumnResult(name = "last_name",type = String.class),
                        @ColumnResult(name = "status_name", type = String.class)
                }
        )
)

@MappedSuperclass
public class LeaveRequestUserLeaveRequestStatus extends LeaveRequest{
    private String statusName;
    private String firstName;
    private String lastName;

    public LeaveRequestUserLeaveRequestStatus(Integer id, String category, String senderComment, String approverComment, Integer senderUserId, Integer approverUserId, Integer leaveTypeId, Integer leaveRequestStatusId, Integer companyId, Byte active, String firstName, String lastName,String statusName) {
        this.setId(id);
        this.setCategory(category);
        this.setSenderComment(senderComment);
        this.setApproverComment(approverComment);
        this.setSenderUserId(senderUserId);
        this.setApproverUserId(approverUserId);
        this.setLeaveTypeId(leaveTypeId);
        this.setLeaveRequestStatusId(leaveRequestStatusId);
        this.setCompanyId(companyId);
        this.setActive(active);
        this.statusName = statusName;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
