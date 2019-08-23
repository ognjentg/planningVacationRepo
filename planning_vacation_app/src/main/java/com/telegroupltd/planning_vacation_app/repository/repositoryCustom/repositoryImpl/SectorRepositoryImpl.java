package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.SectorUser;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.SectorRepositoryCustom;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigInteger;
import java.util.List;

public class SectorRepositoryImpl implements SectorRepositoryCustom {
    private static final String SQL_MANAGER = "SELECT s.id,s.name,s.max_percentage_absent_people,u.id as sectorManagerId,u.first_name,u.last_name " +
            "FROM sector s JOIN user u ON s.sector_manager_id = u.id " +
            "WHERE s.active=1 AND s.company_id=?;";

    private static final String SQL_UPDATE_SECTOR = "UPDATE user u SET u.sector_id=null WHERE u.sector_id=? ";

    private static final String SQL_GET_NUM_OF_USERS_IN_SECTOR = "select count(id) from user where active = 1 and sector_id = ?";
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<SectorUser> getSectorsInformation(Integer companyId) {
        return entityManager.createNativeQuery(SQL_MANAGER, "SectorUserMapping").setParameter(1, companyId).getResultList();
    }

    @Override
    public Integer getNumberOfUsersInSector(Integer sectorId) {
        return ((BigInteger) entityManager.createNativeQuery(SQL_GET_NUM_OF_USERS_IN_SECTOR).setParameter(1, sectorId).getSingleResult()).intValue();
    }

    @Override
    @Transactional
    public void updateUsersFromSector(Integer sectorId) {
        try {
            entityManager.createNativeQuery(SQL_UPDATE_SECTOR).setParameter(1, sectorId).executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
