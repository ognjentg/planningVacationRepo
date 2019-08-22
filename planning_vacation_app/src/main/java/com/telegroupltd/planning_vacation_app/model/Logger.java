package com.telegroupltd.planning_vacation_app.model;


import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "logger")
public class Logger{
    private Integer id;
    private Timestamp created;
    private Integer userId;
    private Integer companyId;
    private String actionType;
    private String actionDetails;
    private String tableName;
    private Byte atomic;

    public Logger() {
    }

    public Logger(Integer userId,String actionType, String actionDetails, String tableName, Byte atomic, Integer companyId) {
        this.userId = userId;
        this.companyId=companyId;
        this.actionType = actionType;
        this.actionDetails = actionDetails;
        this.tableName = tableName;
        this.atomic = atomic;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "created", nullable = true, insertable = false, updatable = false)
    public Timestamp getCreated() {
        return created;
    }

    public void setCreated(Timestamp created) {
        this.created = created;
    }

    @Basic
    @Column(name = "company_id", nullable = true)
    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
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
    @Column(name = "action_type", nullable = false, length = 128)
    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    @Basic
    @Column(name = "action_details", nullable = false, length = -1)
    public String getActionDetails() {
        return actionDetails;
    }

    public void setActionDetails(String actionDetails) {
        this.actionDetails = actionDetails;
    }

    @Basic
    @Column(name = "table_name", nullable = false, length = 128)
    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    @Basic
    @Column(name = "atomic", nullable = false)
    public Byte getAtomic() {
        return atomic;
    }

    public void setAtomic(Byte atomic) {
        this.atomic = atomic;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Logger logger = (Logger) o;
        return Objects.equals(id, logger.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }

    public enum ActionType {
        CREATE("create"),
        UPDATE("update"),
        READ("read"),
        DELETE("delete");

        private final String text;

        ActionType(final String text) {
            this.text = text;
        }

        @Override
        public String toString() {
            return text;
        }
    }

}
