package com.telegroupltd.planning_vacation_app.model;

import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user_has_colective_vacation", schema = "planning_vacation_db", catalog = "")
public class UserHasColectiveVacation implements HasActive {
    private Integer id;
    private Integer userId;
    private Integer colectiveVacationId;
    private Byte active;

    @Id
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "user_id", nullable = false)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "colective_vacation_id", nullable = false)
    public Integer getColectiveVacationId() {
        return colectiveVacationId;
    }

    public void setColectiveVacationId(Integer colectiveVacationId) {
        this.colectiveVacationId = colectiveVacationId;
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
        UserHasColectiveVacation that = (UserHasColectiveVacation) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(userId, that.userId) &&
                Objects.equals(colectiveVacationId, that.colectiveVacationId) &&
                Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, colectiveVacationId, active);
    }
}
