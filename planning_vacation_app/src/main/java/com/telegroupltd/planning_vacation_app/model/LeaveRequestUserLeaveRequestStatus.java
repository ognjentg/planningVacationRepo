package com.telegroupltd.planning_vacation_app.model;


import javax.persistence.*;

import java.sql.Timestamp;

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
                        @ColumnResult(name = "status_name", type = String.class),
                        @ColumnResult(name = "date_from", type = Timestamp.class),
                        @ColumnResult(name = "date_to", type = Timestamp.class)
                }
        )
)

@MappedSuperclass
public class LeaveRequestUserLeaveRequestStatus extends LeaveRequest{
    private String statusName;
    private String firstName;
    private String lastName;
    private Timestamp dateFrom;
    private Timestamp dateTo;

    public LeaveRequestUserLeaveRequestStatus(Integer id, String category, String senderComment, String approverComment, String firstName, String lastName,String statusName, Timestamp dateFrom, Timestamp dateTo) {
        this.setId(id);
        this.setCategory(category);
        this.setSenderComment(senderComment);
        this.setApproverComment(approverComment);
        this.statusName = statusName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateFrom=dateFrom;
        this.dateTo=dateTo;
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

    public Timestamp getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Timestamp dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Timestamp getDateTo() {
        return dateTo;
    }

    public void setDateTo(Timestamp dateTo) {
        this.dateTo = dateTo;
    }
}
