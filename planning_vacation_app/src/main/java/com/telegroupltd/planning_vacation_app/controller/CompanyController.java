package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
import com.telegroupltd.planning_vacation_app.model.Company;
import com.telegroupltd.planning_vacation_app.repository.CompanyRepository;

import com.telegroupltd.planning_vacation_app.util.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Objects;

@RequestMapping(value = "/hub/company")
@Controller
@Scope("request")
public class CompanyController extends GenericController<Company, Integer> {

    private final CompanyRepository companyRepository;


    @PersistenceContext
    private EntityManager entityManager;

    @Value("Dodavanje nije moguće.")
    private String badRequestInsert;

    @Value("Ažuriranje nije moguće.")
    private String badRequestUpdate;

    @Value("Brisanje nije moguće.")
    private String badRequestDelete;

    @Value("Dužina {tekst} prelazi maksimalnu dužinu od {broj} karaktera.")
    private String badRequestStringMaxLength;

    @Value("Veličina {tekst} prelazi maksimalnu veličinu.")
    private String badRequestBinaryLength;

    @Value("4294967295")
    private Long longblobLength;

    @Autowired
    public CompanyController(CompanyRepository companyRepository) {
        super(companyRepository);
        this.companyRepository = companyRepository;
    }

    @Override
    public @ResponseBody
    List<Company> getAll() {
        List<Company> companies = cloner.deepClone(companyRepository.getAllByActiveIs((byte)1));
        return companies;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody
    Company findById(@PathVariable Integer id) {
        Company company = companyRepository.findById(id).orElse(null);
        // if (company != null ) {

        return company;
        //} else {
        //    throw new BadRequestException();
        // }
    }


    /*
    * TODO Needs to check if something is missing of these parameters, needs to check frontend part and than add some functionalities
    * */

    @Override
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    Company insert(@RequestBody Company company) throws BadRequestException{
        if(Validator.stringMaxLength(company.getName(),40)) {
            if (Validator.binaryMaxLength(company.getLogo(), longblobLength)) {

                Company newCompany = new Company();
                newCompany.setId(null);
                newCompany.setName(company.getName());
                newCompany.setActive((byte) 1);
                newCompany.setLogo(company.getLogo());
                newCompany.setPin(company.getPin());


                if (repo.saveAndFlush(newCompany) != null) {
                        entityManager.refresh(newCompany);
                        logCreateAction(newCompany);

                    return newCompany;
                }
                throw new BadRequestException(badRequestInsert);
            }
            throw new BadRequestException(badRequestBinaryLength.replace("{tekst}", "slike za logo"));
        }
        throw new BadRequestException(badRequestStringMaxLength.replace("{tekst}", "naziva").replace("{broj}", String.valueOf(40)));
    }



    @Override
    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody Company company) throws BadRequestException {
        if (Validator.stringMaxLength(company.getName(), 40)) {
            if (Validator.binaryMaxLength(company.getLogo(), longblobLength)) {

                Company companyTemp = companyRepository.findById(id).orElse(null);
                Company oldCompany = cloner.deepClone(repo.findById(id).orElse(null));

                companyTemp.setId(company.getId());
                companyTemp.setName(company.getName());
                companyTemp.setActive((byte) 1);
                companyTemp.setLogo(company.getLogo());
                companyTemp.setPin(company.getPin());

                if (companyRepository.saveAndFlush(companyTemp) != null) {
                    entityManager.refresh(companyTemp);
                    logUpdateAction(companyTemp, oldCompany);

                    return "Success";
                }
                throw new BadRequestException(badRequestUpdate);
            }
            throw  new BadRequestException(badRequestBinaryLength.replace("{tekst}", "slike za logo"));
        }
        throw new BadRequestException(badRequestStringMaxLength.replace("{tekst}", "naziva").replace("{broj}", String.valueOf(40)));
    }




    @Override
    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(@PathVariable Integer id) throws BadRequestException{
        Company company = companyRepository.findById(id).orElse(null);
        cloner.deepClone(company);
        Objects.requireNonNull(company).setActive((byte)0);
        if(companyRepository.getByIdAndActive(id,(byte)1) != null){
            logDeleteAction(company);
            return "Success";
        }
        throw new BadRequestException(badRequestDelete);
    }
}
