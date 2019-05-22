package com.telegroupltd.planning_vacation_app.model;

import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Constraints implements HasActive {
    private Integer id;
    private Integer maxVacationDays;
    private Integer vacationPeriodLength;
    private Integer sickLeaveJustificationPeriodLength;
    private Integer companyId;
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
    @Column(name = "max_vacation_days", nullable = false)
    public Integer getMaxVacationDays() {
        return maxVacationDays;
    }

    public void setMaxVacationDays(Integer maxVacationDays) {
        this.maxVacationDays = maxVacationDays;
    }

    @Basic
    @Column(name = "vacation_period_length", nullable = false)
    public Integer getVacationPeriodLength() {
        return vacationPeriodLength;
    }

    public void setVacationPeriodLength(Integer vacationPeriodLength) {
        this.vacationPeriodLength = vacationPeriodLength;
    }

    @Basic
    @Column(name = "sick_leave_justification_period_length", nullable = false)
    public Integer getSickLeaveJustificationPeriodLength() {
        return sickLeaveJustificationPeriodLength;
    }

    public void setSickLeaveJustificationPeriodLength(Integer sickLeaveJustificationPeriodLength) {
        this.sickLeaveJustificationPeriodLength = sickLeaveJustificationPeriodLength;
    }

    @Basic
    @Column(name = "company_id", nullable = false)
    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
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
        Constraints that = (Constraints) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(maxVacationDays, that.maxVacationDays) &&
                Objects.equals(vacationPeriodLength, that.vacationPeriodLength) &&
                Objects.equals(sickLeaveJustificationPeriodLength, that.sickLeaveJustificationPeriodLength) &&
                Objects.equals(companyId, that.companyId) &&
                Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, maxVacationDays, vacationPeriodLength, sickLeaveJustificationPeriodLength, companyId, active);
    }
}
