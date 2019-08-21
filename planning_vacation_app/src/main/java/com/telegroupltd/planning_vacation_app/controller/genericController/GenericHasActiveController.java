package com.telegroupltd.planning_vacation_app.controller.genericController;


import com.telegroupltd.planning_vacation_app.common.HasActive;
import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.Serializable;
import java.util.List;

public class GenericHasActiveController<T extends HasActive, ID extends Serializable> extends GenericController<T, ID> {

    @PersistenceContext
    private EntityManager entityManager;
    private HasActiveRepository<T, ID> repository;

    public GenericHasActiveController(JpaRepository<T, ID> repo) {
        super(repo);
        if (repo instanceof HasActiveRepository)
            repository = (HasActiveRepository) repo;
        else throw new RuntimeException("Repository must implement " + HasActiveRepository.class.getSimpleName());
    }


    @Override
    @Transactional
    public List<T> getAll() throws ForbiddenException {
        return repository.getAllByActiveIs((byte) 1);
    }

    @Override
    public T findById(@PathVariable("id") ID id) throws ForbiddenException {
        return repository.getByIdAndActive(id, (byte) 1);
    }

    @Override
    @Transactional
    public String update(@PathVariable ID id, @RequestBody T object) throws BadRequestException, ForbiddenException {
        T objectDb = repository.getByIdAndActive(id, (byte) 1);
        if (objectDb != null) {
            if (object.getActive() == null)
                object.setActive(objectDb.getActive());
            return super.update(id, object);
        }
        throw new BadRequestException("Bad Request");
    }

    @Override
    @Transactional
    public String delete(@PathVariable ID id) throws BadRequestException, ForbiddenException {
        T object = null;
        if ((object = repository.getByIdAndActive(id, (byte) 1)) != null) {
            object.setActive((byte) 0);
            repo.saveAndFlush(object);
            logDeleteAction(object);
            return "Success";
        }
        throw new BadRequestException("Bad Request");
    }


}
