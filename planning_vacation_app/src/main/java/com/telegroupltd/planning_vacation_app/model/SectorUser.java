package com.telegroupltd.planning_vacation_app.model;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;

@SqlResultSetMapping(
        name = "SectorUserMapping",
        classes = @ConstructorResult(
                targetClass = SectorUser.class,
                columns = {
                        //@ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name="max_percentage_absent_people", type=Double.class),
                        @ColumnResult(name = "first_name", type = String.class),
                        @ColumnResult(name = "last_name", type = String.class)
                }
        )
)

@MappedSuperclass
public class SectorUser {
    private Integer id;
    private String name;
    private Double max_percentage_absent_people;
    private String first_name;
    private String last_name;

    public SectorUser(){}

    public SectorUser(Integer id, String name, Double max_percentage_absent_people, String first_name, String last_name) {
        this.id=id;
        this.name=name;
        this.max_percentage_absent_people=max_percentage_absent_people;
        this.first_name = first_name;
        this.last_name = last_name;
    }


    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getMax_percentage_absent_people() {
        return max_percentage_absent_people;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMax_percentage_absent_people(Double max_percentage_absent_people) {
        this.max_percentage_absent_people = max_percentage_absent_people;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }
}
