package com.telegroupltd.planning_vacation_app.model;


import javax.persistence.*;

import java.sql.Timestamp;
import java.util.Date;


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
                        @ColumnResult(name = "first_name", type = String.class),
                        @ColumnResult(name = "last_name",type = String.class),
                        @ColumnResult(name = "status_name", type = String.class),
                        @ColumnResult(name = "date_from"),
                        @ColumnResult(name = "date_to"),
                        @ColumnResult(name = "type_name", type = String.class)
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
    private String typeName;

    public LeaveRequestUserLeaveRequestStatus(Integer id, String category, String senderComment, String approverComment,Integer senderUserId, String firstName, String lastName, String statusName, Date dateFrom, Date dateTo, String typeName) {
        this.setId(id);
        this.setCategory(category);
        this.setSenderComment(senderComment);
        this.setApproverComment(approverComment);
        this.setSenderUserId(senderUserId);
        this.statusName = statusName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.setDateFrom(dateFrom == null ? null : new Timestamp(dateFrom.getTime()));
        this.setDateTo(dateTo == null ? null : new Timestamp(dateTo.getTime()));
        this.typeName=typeName;
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

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
}
