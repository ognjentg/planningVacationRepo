package com.telegroupltd.planning_vacation_app.model;

import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "day_in_week", schema = "planning_vacation_db", catalog = "")
public class DayInWeek implements HasActive {
    private Integer id;
    private String dayKey;
    private Integer javaValue;
    private Byte active;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "dayKey", nullable = false, length = 45)
    public String getDayKey() {
        return dayKey;
    }

    public void setDayKey(String dayKey) {
        this.dayKey = dayKey;
    }

    @Basic
    @Column(name = "java_value", nullable = false)
    public Integer getJavaValue() {
        return javaValue;
    }

    public void setJavaValue(Integer javaValue) {
        this.javaValue = javaValue;
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
        DayInWeek dayInWeek = (DayInWeek) o;
        return Objects.equals(id, dayInWeek.id) &&
                Objects.equals(dayKey, dayInWeek.dayKey) &&
                Objects.equals(javaValue, dayInWeek.javaValue) &&
                Objects.equals(active, dayInWeek.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dayKey, javaValue, active);
    }
}
