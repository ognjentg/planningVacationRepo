package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
import com.telegroupltd.planning_vacation_app.model.User;
//import com.telegroupltd.planning_vacation_app.repository.CompanyRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import com.telegroupltd.planning_vacation_app.session.UserBean;
import com.telegroupltd.planning_vacation_app.util.Notification;
import com.telegroupltd.planning_vacation_app.util.UserLoginInformation;
import com.telegroupltd.planning_vacation_app.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.Timestamp;
import java.util.List;

@RequestMapping(value = "/user")
@Controller
@Scope("request")
public class UserController extends GenericController<User, Integer> {

    private final UserRepository userRepository;
   // private final CompanyRepository companyRepository;

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    protected UserBean userBean;

    @Value("1")
    private Integer superAdmin;
    @Value("2")
    private Integer admin;
    @Value("3")
    private Integer director;
    @Value("4")
    private Integer secretary;
    @Value("5")
    private Integer sectorManager;
    @Value("6")
    private Integer worker;


    @Value("Postoji korisnik sa ovim korisnickim imenom.")
    private String badRequestUsernameExists;
    @Value("${badRequest.validateEmail}")
    private String badRequestValidateEmail;



    @Autowired
    public UserController(UserRepository userRepository/*, CompanyRepository companyRepository*/){
    super(userRepository);
    this.userRepository=userRepository;
   // this.companyRepository=companyRepository;
}
//Override metoda: insert, update, delete, getAll(ne smije se vidjeti sifra), getById(ne smije se vidjeti sifra)
//Implementirati metode: login, logout, ...


    @Override
    public @ResponseBody
    List<User> getAll() {
        List<User> users = cloner.deepClone(userRepository.getAllByCompanyIdAndActive(userBean.getUser().getCompanyId(), (byte)1));
        for(User user : users){
            user.setPassword("");
            user.setSalt("");
        }
        return users;
    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody
    User login(@RequestBody UserLoginInformation userLoginInformation) throws ForbiddenException {
        User user = userRepository.login(userLoginInformation);
        if (user == null) {
            throw new ForbiddenException("Forbidden");
        } else {
            userBean.setUser(user);
            userBean.setLoggedIn(true);
            return userBean.getUser();
        }
    }

/*
//validacija duzina unesenih informacija za update!
    @Override
    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody User user) throws BadRequestException {
        if(userBean.getUser().getId().equals(id)){
            if (Validator.stringMaxLength(user.getFirstName(), 100)) {
                if (Validator.stringMaxLength(user.getLastName(), 100)) {
                    if(Validator.binaryMaxLength(user.getPhoto(), longblobLength)){
                        User userTemp = userRepository.findById(id).orElse(null);
                        User oldUser = cloner.deepClone(repo.findById(id).orElse(null));

                        userTemp.setFirstName(user.getFirstName());
                        userTemp.setLastName(user.getLastName());
                        userTemp.setPhoto(user.getPhoto());
                        logUpdateAction(user, oldUser);

                        return "Success";
                    }
                    throw new BadRequestException(badRequestBinaryLength.replace("{tekst}", "slike"));
                }
                throw new BadRequestException(badRequestStringMaxLength.replace("{tekst}", "prezimena").replace("{broj}", String.valueOf(100)));
            }
            throw new BadRequestException(badRequestStringMaxLength.replace("{tekst}", "imena").replace("{broj}", String.valueOf(100)));
        }
        throw new BadRequestException(badRequestUpdate);
    }
*/

    @Override
    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    User insert(@RequestBody User user) throws BadRequestException {
     ////   if(userRepository.countAllByCompanyIdAndEmail(userBean.getUser().getCompanyId(), user.getEmail()).compareTo(Integer.valueOf(0)) == 0){
            if(Util.validateEmail(user.getEmail())){
                User newUser = new User();
                String salt=Util.randomSalt();
                String newPassword=Util.randomPassword();
                String username=Util.generateUsername(user.getEmail());

                newUser.setFirstName(null);
                newUser.setLastName(null);
                if(user.getUserGroupId()!=superAdmin && user.getUserGroupId()!=admin ) {  //Svi primaju mail-ove osim superadmina i admina, prvi put
                    newUser.setPauseFlag(user.getPauseFlag());
                    newUser.setStartDate(user.getStartDate());
                    newUser.setReceiveMail((byte) 1);
                }else {
                    newUser.setPauseFlag(null);
                    newUser.setStartDate(null);
                    newUser.setReceiveMail((byte) 0);
                }
                newUser.setSectorId(null);  //It is sector manager's job
                newUser.setPhoto(null);
                newUser.setUserGroupId(user.getUserGroupId());
                if(user.getUserGroupId()!=superAdmin) {
                    newUser.setCompanyId(user.getCompanyId());
                }else newUser.setCompanyId(null);
                newUser.setActive((byte) 1);

                if(user.getUserGroupId()!=superAdmin) {   //Ako nije superadmin, imace e-mail na koji ce dobiti username i password
                    newUser.setEmail(user.getEmail());

                    User userWithUsername = userRepository.getByUsernameAndCompanyId(username, user.getCompanyId());
                    if (userWithUsername == null) {
                        newUser.setUsername(username);
                        newUser.setPassword(Util.hashPassword(salt + newPassword));
                        newUser.setSalt(salt);
                    } else {
                        throw new BadRequestException(badRequestUsernameExists);  //postoji ovaj username u  ovoj kompaniji                    }
                    }
                }
                //Superadmin will be added from workbench.




                if(repo.saveAndFlush(newUser) != null){
                    entityManager.refresh(newUser);
                    logCreateAction(newUser);
                    if(user.getUserGroupId()!=superAdmin) {
                        Notification.sendLoginLink(user.getEmail().trim(), newUser.getUsername(),  newPassword , (companyRepository.getById(newUser.getCompanyId())).getPin());  //slacemo username,password i PIN kompanije na email adresu
                         }
                    return newUser;
                }
                throw new BadRequestException(badRequestInsert);
            }
            throw new BadRequestException(badRequestValidateEmail);
        ////}
       //// throw new BadRequestException(badRequestEmailExists);
    }




    @RequestMapping(value = "/logedInFirstTime", method = RequestMethod.POST)
    public @ResponseBody
    String logedInFirstTime(@RequestBody User newUser) throws BadRequestException {

        User user = entityManager.find(User.class, newUser.getId());

        user.setUsername(newUser.getUsername());
        user.setPassword(Util.hashPassword(newUser.getPassword()));

        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());

        newUser.setReceiveMail(newUser.getReceiveMail());
        user.setPhoto(newUser.getPhoto());

        user.setActive((byte) 1);

        if (repo.saveAndFlush(user) != null) {
            return "Success";
        }
        throw new BadRequestException(badRequestRegistration);
    }

        }





}
