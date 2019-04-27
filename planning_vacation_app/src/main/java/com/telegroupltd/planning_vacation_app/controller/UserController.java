package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public UserController(UserRepository userRepository){
    super(userRepository); //genericki kontroler ima u sebi privatno polje JpaRepository (spring kreira upite nad bazom)
    this.userRepository=userRepository;
}
//Override metoda: insert, update, delete, getAll(ne smije se vidjeti sifra), getById(ne smije se vidjeti sifra)
//Implementirati metode: login, logout, ...


    /*

    @Override
    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    User insert(@RequestBody User user) throws BadRequestException {
     ////   if(userRepository.countAllByCompanyIdAndEmail(userBean.getUser().getCompanyId(), user.getEmail()).compareTo(Integer.valueOf(0)) == 0){
          //  if(Validator.validateEmail(user.getEmail())){
                //String randomToken = Util.randomString(randomStringLength);
                User newUser = new User();
                newUser.setUsername(null);  //stavicemo prvi dio iz e-mail-a I dodati neki random dio ->metoda
                newUser.setPassword(null); //generisacemo ranodm sifru  i random salt  ->metode
                newUser.setEmail(user.getEmail());

               // newUser.setFirstName(null);
              //  newUser.setLastName(null);

               // newUser.setPhoto(null);


                newUser.setCompanyId(user.getCompanyId());
              //  newUser.setRoleId(user.getRoleId());
                newUser.setActive((byte) 1);

                if(repo.saveAndFlush(newUser) != null){
                    entityManager.refresh(newUser);
                    logCreateAction(newUser);
                //    Notification.sendRegistrationLink(user.getEmail().trim(), randomToken);  //slacemo username,password i PIN ompanije na email adresu

                    return newUser;
                }
                throw new BadRequestException(badRequestInsert);
         //   }
          //  throw new BadRequestException(badRequestValidateEmail);
        ////}
       //// throw new BadRequestException(badRequestEmailExists);
    }


    @Override
    public @ResponseBody
    List<User> getAll() {
      //  List<User> users = cloner.deepClone(userRepository.getAllByCompanyIdAndActive(userBean.getUser().getCompanyId(), (byte)1));
        for(User user : users){
            user.setPassword(null);
           // user.setSalt(null);
        }
        return users;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody
    User login(@RequestBody UserInformation userInformation) throws ForbiddenException {
        User user = userRepository.login(userInformation);
        if (user == null) {
            throw new ForbiddenException("Forbidden");
        }
        else{
            user.setPassword(null);
            user.setPin(null);
            userBean.setUser(user);
            userBean.setLoggedIn(true);
            return userBean.getUser();
        }
    }

*/

}
