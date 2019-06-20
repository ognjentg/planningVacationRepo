package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.Sector;
import com.telegroupltd.planning_vacation_app.model.SectorUser;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.SectorRepositoryCustom;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class SectorRepositoryImpl implements SectorRepositoryCustom {
    private static final String SQL_MANAGER="SELECT s.id,s.name,s.max_percentage_absent_people,u.id as sectorManagerId,u.first_name,u.last_name " +
            "FROM sector s JOIN user u ON s.sector_manager_id = u.id " +
            "WHERE s.active=1 AND s.company_id=?;";

    private static final String SQL_UPDATE_SECTOR="UPDATE user u SET u.sector_id=null WHERE u.sector_id=?";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<SectorUser> getSectorsInformation(Integer companyId){
        return entityManager.createNativeQuery(SQL_MANAGER,"SectorUserMapping").setParameter(1,companyId).getResultList();
    }

    @Override
    @Transactional
    public void updateUsersFromSector(Integer sectorId){
        try{
            entityManager.createNativeQuery(SQL_UPDATE_SECTOR).setParameter(1,sectorId).executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
