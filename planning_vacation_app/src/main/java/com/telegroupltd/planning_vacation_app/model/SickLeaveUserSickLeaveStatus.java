package com.telegroupltd.planning_vacation_app.model;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;
import java.sql.Date;

@SqlResultSetMapping(
        name = "SickLeaveUserSickLeaveStatusMapping",
        classes = @ConstructorResult(
                targetClass = SickLeaveUserSickLeaveStatus.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "date_from", type = Date.class),
                        @ColumnResult(name="date_to", type=Date.class),
                }
        )
)

@MappedSuperclass
public class SickLeaveUserSickLeaveStatus {
    private Integer id;
    private Date date_from;
    private Date date_to;

    public SickLeaveUserSickLeaveStatus(){}

    public SickLeaveUserSickLeaveStatus(Integer id, Date date_from, Date date_to) {
        this.id = id;
        this.date_from = date_from;
        this.date_to = date_to;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDate_from(Date date_from) {
        this.date_from = date_from;
    }

    public void setDate_to(Date date_to) {
        this.date_to = date_to;
    }

    public Integer getId() {
        return id;
    }

    public Date getDate_from() {
        return date_from;
    }

    public Date getDate_to() {
        return date_to;
    }


}
