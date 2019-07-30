package com.telegroupltd.planning_vacation_app.model;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;

@SqlResultSetMapping(
        name = "LeaveRequestLeaveRequestDaysMapping",
        classes = @ConstructorResult(
                targetClass = LeaveRequestLeaveRequestDays.class,
                columns = {
                        @ColumnResult(name = "user_id", type = Integer.class),
                        @ColumnResult(name = "leave_request_id", type = Integer.class),
                        @ColumnResult(name = "leave_request_date_id", type = Integer.class),
                }
        )
)
@MappedSuperclass
public class LeaveRequestLeaveRequestDays {
    private Integer userId;
    private Integer leaveRequestId;
    private Integer leaveRequestDateId;

    public LeaveRequestLeaveRequestDays() {}

    public LeaveRequestLeaveRequestDays(Integer userId, Integer leaveRequestId, Integer leaveRequestDateId) {
        this.userId = userId;
        this.leaveRequestId = leaveRequestId;
        this.leaveRequestDateId = leaveRequestDateId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getLeaveRequestId() {
        return leaveRequestId;
    }

    public void setLeaveRequestId(Integer leaveRequestId) {
        this.leaveRequestId = leaveRequestId;
    }

    public Integer getLeaveRequestDateId() {
        return leaveRequestDateId;
    }

    public void setLeaveRequestDateId(Integer leaveRequestDateId) {
        this.leaveRequestDateId = leaveRequestDateId;
    }
}
