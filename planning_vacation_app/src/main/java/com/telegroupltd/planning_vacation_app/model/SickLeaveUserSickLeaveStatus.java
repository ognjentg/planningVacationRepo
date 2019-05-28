package com.telegroupltd.planning_vacation_app.model;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;
import java.sql.Timestamp;
import java.util.Date;

@SqlResultSetMapping(
        name = "SickLeaveUserSickLeaveStatusMapping",
        classes = @ConstructorResult(
                targetClass = SickLeaveUserSickLeaveStatus.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "date_from"),
                        @ColumnResult(name = "date_to"),
                        @ColumnResult(name = "first_name", type = String.class),
                        @ColumnResult(name = "last_name",type = String.class),
                        @ColumnResult(name = "status_name", type = String.class)
                }
        )
)

@MappedSuperclass
public class SickLeaveUserSickLeaveStatus extends SickLeave {
    private String statusName;
    private String firstName;
    private String lastName;

    public SickLeaveUserSickLeaveStatus(){}

    public SickLeaveUserSickLeaveStatus(Integer id, Date dateFrom, Date dateTo,String firstName,String lastName, String statusName) {
        this.setId(id);
        this.setDateFrom(dateFrom == null ? null : new Timestamp(dateFrom.getTime()));
        this.setDateTo(dateTo == null ? null : new Timestamp(dateTo.getTime()));
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

    public String getLastName() {
        return lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
