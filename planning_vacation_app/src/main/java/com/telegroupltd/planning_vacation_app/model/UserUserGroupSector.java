package com.telegroupltd.planning_vacation_app.model;


import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;

@SqlResultSetMapping(
        name = "UserUserGroupSectorMapping",
        classes = @ConstructorResult(
                targetClass = UserUserGroupSector.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "first_name", type = String.class),
                        @ColumnResult(name = "last_name", type = String.class),
                        @ColumnResult(name = "email", type = String.class),
                        @ColumnResult(name = "position", type = String.class),
                        @ColumnResult(name = "sector_name", type = String.class)
                }
        )
)

@MappedSuperclass
public class UserUserGroupSector extends User{
    private String position;
    private String sector_name;

    public UserUserGroupSector() {

    }

    public UserUserGroupSector(Integer id, String firstName, String lastName, String email, String position, String sector_name) {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        this.position = position;
        this.sector_name = sector_name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getSector_name() {
        return sector_name;
    }

    public void setSector_name(String sector_name) {
        this.sector_name = sector_name;
    }
}

