package com.telegroupltd.planning_vacation_app.model;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;
import java.sql.Timestamp;
import java.util.Date;

@SqlResultSetMapping(
        name = "AbsenceHistoryUserMapping",
        classes = @ConstructorResult(
                targetClass = AbsenceHistoryUser.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "date_from"),
                        @ColumnResult(name = "date_to"),
                }
        )
)
@MappedSuperclass
public class AbsenceHistoryUser extends LeaveRequest {

    private Timestamp dateFrom;
    private Timestamp dateTo;

    public AbsenceHistoryUser() {}

    public AbsenceHistoryUser(Integer id, Date dateFrom, Date dateTo) {
        this.setId(id);
        this.setDateFrom(dateFrom == null ? null : new Timestamp(dateFrom.getTime()));
        this.setDateTo(dateTo == null ? null : new Timestamp(dateTo.getTime()));
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
