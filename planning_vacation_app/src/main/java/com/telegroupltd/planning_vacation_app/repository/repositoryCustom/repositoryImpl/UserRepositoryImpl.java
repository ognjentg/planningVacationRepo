package com.telegroupltd.planning_vacation_app.repository.repositoryCustom.repositoryImpl;

import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.model.UserUserGroupSector;
import com.telegroupltd.planning_vacation_app.repository.repositoryCustom.UserRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;

public class UserRepositoryImpl implements UserRepositoryCustom {

    private static final String SQL_LOGIN = "SELECT DISTINCT u.id, u.username, u.password, u.email, u.pause_flag, u.start_date ,u.first_name, u.last_name, u.salt, u.receive_mail, u.first_login, u.sector_id, u.photo, u.user_group_id, u.company_id, u.active " +
            "FROM user u JOIN company c ON IF(u.user_group_id=1, true, u.company_id=c.id) " +
            "WHERE u.email=? AND u.password=SHA2(concat(u.salt,?), 512) AND IF(u.user_group_id=1, u.company_id IS NULL, c.pin=?)";


    private static final String SQL_GET_ALL_EXTENDED_BY_SECTOR_ID = "SELECT u.id, u.first_name, u.last_name, u.email, u.company_id, ug.name as 'position', s.id as 'sector_id',s.name as 'sector_name'" +
            "FROM user u LEFT JOIN sector s on u.sector_id=s.id JOIN user_group ug ON u.user_group_id=ug.id " +
            "WHERE u.company_id=? AND s.id=? AND u.active=1 ";

    private static final String SQL_GETALL_BY_SECTOR = "SELECT * FROM user u WHERE u.company_id=? AND u.sector_id=? AND (u.user_group_id=6  OR u.user_group_id=5 ) AND u.active=1";
    private static final String SQL_GET_ALL_WITHOUT_SECTOR = "SELECT * FROM user u WHERE u.company_id=? AND u.sector_id is null AND u.user_group_id=6 AND u.active=1";
    private static final String SQL_GET_ALL_EXTENDED_BY_SECTOR_ID_NULL = "SELECT u.id, u.first_name, u.last_name, u.email, u.company_id, ug.name as 'position', s.id as 'sector_id',s.name as 'sector_name'" +
            "FROM user u LEFT JOIN sector s on u.sector_id=s.id JOIN user_group ug ON u.user_group_id=ug.id " +
            "WHERE u.company_id=? AND s.id is null AND u.active=1 ";


    private static final String SQL_GET_ALL_EXTENDED = "SELECT u.id, u.first_name, u.last_name, u.email, u.company_id, ug.name as 'position', s.id as 'sector_id',s.name as 'sector_name'" +
            "FROM user u LEFT JOIN sector s on u.sector_id=s.id JOIN user_group ug ON u.user_group_id=ug.id " +
            "WHERE u.company_id=? AND u.active=1 ";


    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User login(String email, String password, String companyPin) {
        User user = null;
        try {
            Object[] result = (Object[]) entityManager.createNativeQuery(SQL_LOGIN).setParameter(1, email).setParameter(2, password).setParameter(3, companyPin).getSingleResult();
            return new User((Integer) result[0], (String) result[1], (String) result[2], (String) result[3], (Byte) result[4], (Date) result[5], (String) result[6], (String) result[7], (String) result[8], (Byte) result[9], (Byte) result[10], (Integer) result[11], (byte[]) result[12], (Integer) result[13], (Integer) result[14], (Byte) result[15]);
        } catch (NoResultException e) {

        }

        return user;
    }

    @Override
    public List<UserUserGroupSector> getAllExtendedBySectorIdAndActive(Integer companyId, Integer sectorId) {
        return entityManager.createNativeQuery(SQL_GET_ALL_EXTENDED_BY_SECTOR_ID, "UserUserGroupSectorMapping").setParameter(1, companyId).setParameter(2, sectorId).getResultList();
    }

    @Override
    public List<User> getAllUsersFromSectorByUserGroupId(Integer companyId, Integer sectorId) {
        return entityManager.createNativeQuery(SQL_GETALL_BY_SECTOR, User.class).setParameter(1, companyId).setParameter(2, sectorId).getResultList();
    }

    @Override
    public List<User> getAllUsersWithoutSector(Integer companyId) {
        return entityManager.createNativeQuery(SQL_GET_ALL_WITHOUT_SECTOR, User.class).setParameter(1, companyId).getResultList();
    }

    public List<UserUserGroupSector> getAllExtendedBySectorIdNullAndActive(Integer companyId) {
        return entityManager.createNativeQuery(SQL_GET_ALL_EXTENDED_BY_SECTOR_ID_NULL, "UserUserGroupSectorMapping").setParameter(1, companyId).getResultList();
    }

    @Override
    public List<UserUserGroupSector> getAllByCompanyIdAllSectorsAndActive(Integer companyId) {
        return entityManager.createNativeQuery(SQL_GET_ALL_EXTENDED, "UserUserGroupSectorMapping").setParameter(1, companyId).getResultList();
    }


}
