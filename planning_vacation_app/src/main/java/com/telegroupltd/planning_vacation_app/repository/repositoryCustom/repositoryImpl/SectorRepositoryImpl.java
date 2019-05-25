package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.Sector;
import com.telegroupltd.planning_vacation_app.model.SectorUser;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.SectorRepositoryCustom;
import com.telegroupltd.planning_vacation_app.util.SectorInformation;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class SectorRepositoryImpl implements SectorRepositoryCustom {
    private static final String SQL_Manager="SELECT s.id,s.name,s.max_percentage_absent_people,u.first_name,u.last_name " +
            "FROM sector s JOIN user u ON s.sector_manager_id = u.id " +
            "WHERE s.active=1;";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<SectorUser> getSectorsInformation(){
        return entityManager.createNativeQuery(SQL_Manager,"SectorUserMapping").getResultList();
    }
}
