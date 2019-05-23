package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.SectorRepositoryCustom;
import com.telegroupltd.planning_vacation_app.util.SectorInformation;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class SectorRepositoryImpl implements SectorRepositoryCustom {
    private static final String SQL_Manager="SELECT s.id,s.name,s.max_percentage_absent_people,s.sector_manager_id,u.first_name,u.last_name\n" +
            "FROM sector s JOIN user u ON s.sector_manager_id = u.id\n" +
            "WHERE s.active=1;";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<SectorInformation> getSectorsInformation(){
        List result=entityManager.createNativeQuery(SQL_Manager).getResultList();

    }
}
