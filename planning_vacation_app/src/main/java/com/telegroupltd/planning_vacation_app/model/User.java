package com.telegroupltd.planning_vacation_app.model;


import com.telegroupltd.planning_vacation_app.common.HasActive;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "user")
public class User implements HasActive {

    private Integer id;
    private Integer companyId;
    private String username;
    private String password;
    private String email;
    private Integer userGroupId;
    private Byte active;
    private Byte pauseFlag;
    private Date startDate;
    private String firstName;
    private String lastName;
    private String salt;
    private Byte receiveMail;
    private Integer sectorId;
    private byte[] photo;

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
    @Column(name = "company_id", nullable = false)
    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    @Basic
    @Column(name = "username", nullable = false, length = 45)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "password", nullable = false, length = 128)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "email", nullable = false, length = 45)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "user_group_id", nullable = false)
    public Integer getUserGroupId() {
        return userGroupId;
    }

    public void setUserGroupId(Integer userGroupId) {
        this.userGroupId = userGroupId;
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
        User user = (User) o;
        return Objects.equals(id, user.id) &&
                Objects.equals(companyId, user.companyId) &&
                Objects.equals(username, user.username) &&
                Objects.equals(password, user.password) &&
                Objects.equals(email, user.email) &&
                Objects.equals(userGroupId, user.userGroupId) &&
                Objects.equals(active, user.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, email, userGroupId, companyId, active);
    }

    @Basic
    @Column(name = "pause_flag", nullable = false)
    public Byte getPauseFlag() {
        return pauseFlag;
    }

    public void setPauseFlag(Byte pauseFlag) {
        this.pauseFlag = pauseFlag;
    }

    @Basic
    @Column(name = "start_date", nullable = false)
    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    @Basic
    @Column(name = "first_name", nullable = false, length = 128)
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "last_name", nullable = false, length = 128)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "salt", nullable = false, length = 45)
    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    @Basic
    @Column(name = "receive_mail", nullable = false)
    public Byte getReceiveMail() {
        return receiveMail;
    }

    public void setReceiveMail(Byte receiveMail) {
        this.receiveMail = receiveMail;
    }

    @Basic
    @Column(name = "sector_id", nullable = true)
    public Integer getSectorId() {
        return sectorId;
    }

    public void setSectorId(Integer sectorId) {
        this.sectorId = sectorId;
    }

    @Basic
    @Column(name = "photo", nullable = false)
    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }
}
