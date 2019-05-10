package com.telegroupltd.planning_vacation_app.controller;


import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericHasActiveController;
import com.telegroupltd.planning_vacation_app.model.Constraints;
import com.telegroupltd.planning_vacation_app.repository.ConstraintsRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping(value = "/constarints")
@Controller
@Scope("request")
public class ConstraintsController extends GenericHasActiveController<Constraints, Integer> {

    private final ConstraintsRepository constraintsRepository;


    public ConstraintsController(ConstraintsRepository constraintsRepository) {
        super(constraintsRepository);
        this.constraintsRepository=constraintsRepository;
    }



    //Obzirom da imam jedan (aktivan) zapis u bazi za odredjenu kompaniju, kontam da nikad necu traziti taj zapis po njegovom id
    // nego po id kompanije, pa sam zato samo redefinisala
    @Override
    public Constraints findById(@PathVariable("companyId") Integer id) throws ForbiddenException {
        return constraintsRepository.getByIdAndActive(id, (byte) 1);
    }

    //Obzirom da imam jedan zapis za jednu firmu, da li u update trebam samo updatovati taj zapis
    // ili da stari zapis obrisem(setujem active), a ubacim novi zapis?
    @Override
    @Transactional
    public String update(@PathVariable("companyId") Integer id, @RequestBody Constraints object) throws BadRequestException, ForbiddenException {
        Constraints objectDb = constraintsRepository.getByIdAndActive(id, (byte) 1);
        if (objectDb != null) {
            if (object.getActive() == null)
                object.setActive(objectDb.getActive());
            return super.update(id,object);
        }
        throw new BadRequestException("Bad Request");
    }


    @Override
    @Transactional
    public String delete(@PathVariable("companyId") Integer id) throws BadRequestException, ForbiddenException {
        Constraints object = null;
        if ((object = constraintsRepository.getByIdAndActive(id, (byte) 1)) != null) {
            object.setActive((byte) 0);
            repo.saveAndFlush(object);
            logDeleteAction(object);
            return "Success";
        }
        throw new BadRequestException("Bad Request");
    }

}
