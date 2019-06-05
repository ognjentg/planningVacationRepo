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

    public LeaveRequestUserLeaveRequestStatus(Integer id, String category, String senderComment, String approverComment, String statusName, String firstName, String lastName) {
        this.setId(id);
        this.setCategory(category);
        this.setSenderComment(senderComment);
        this.setApproverComment(approverComment);
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
