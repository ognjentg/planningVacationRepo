package com.telegroupltd.planning_vacation_app.controller.genericController;


import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericLogger.GenericLogger;
import com.telegroupltd.planning_vacation_app.session.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.Serializable;
import java.util.List;

/**
 * Created by drstjepanovic on 7/22/2017.
 */

public class GenericController<T, ID extends Serializable> extends GenericLogger<T> {

    protected JpaRepository<T, ID> repo;
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    protected UserBean userBean;


    @Value("Dodavanje nije moguće.")
    private String badRequestInsert;

    @Value("Ažuriranje nije moguće.")
    private String badRequestUpdate;

    @Value("Brisanje nije moguće.")
    private String badRequestDelete;
/*
    @Value("superadmin")
    protected String superAdmin;
    @Value("admin")
    protected String admin;
    @Value("direktor")
    protected String director;
    @Value("sekretar")
    protected String secretary;
    @Value("menadzer")
    protected String sectorManager;
    @Value("zaposleni")
    protected String worker;
*/

    public GenericController(JpaRepository<T, ID> repo) {
        this.repo = repo;
    }

    @Transactional
    @RequestMapping(method = RequestMethod.GET)
    public List<T> getAll() throws ForbiddenException {
        return repo.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public T findById(@PathVariable("id") ID id)  throws BadRequestException,ForbiddenException {
        return repo.findById(id).orElse(null);
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public T insert(@RequestBody T object) throws BadRequestException, ForbiddenException {
        T ret = null;
        if ((ret = repo.saveAndFlush(object)) != null) {
            entityManager.refresh(ret);
            logCreateAction(object);
            return ret;
        }
        throw new BadRequestException("Bad Request");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public String update(@PathVariable ID id, @RequestBody T object) throws BadRequestException, ForbiddenException {
        T oldObject = cloner.deepClone(repo.findById(id).orElse(null));
        if (repo.saveAndFlush(object) != null) {
            logUpdateAction(object, oldObject);
            return "Success";
        }
        throw new BadRequestException("Bad Request");
    }

    @RequestMapping(value = {"/{id}"}, method = RequestMethod.DELETE)
    public String delete(@PathVariable ID id) throws BadRequestException, ForbiddenException {
        try {
            T object = repo.findById(id).orElse(null);
            repo.deleteById(id);
            logDeleteAction(object);
            return "Success";
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new BadRequestException("Bad Request");
        }
    }

}
