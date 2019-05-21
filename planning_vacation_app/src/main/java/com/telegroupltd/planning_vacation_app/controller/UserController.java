package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.repository.CompanyRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import com.telegroupltd.planning_vacation_app.session.UserBean;
import com.telegroupltd.planning_vacation_app.util.Notification;
import com.telegroupltd.planning_vacation_app.util.UserLoginInformation;
import com.telegroupltd.planning_vacation_app.util.Util;
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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequestMapping(value = "hub/user")
@Controller
@Scope("request")
public class UserController extends GenericController<User, Integer> {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    @PersistenceContext
    private EntityManager entityManager;

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


    @Value("Postoji korisnik sa ovim korisničkim imenom.")
    private String badRequestUsernameExists;
    @Value("Postoji korisnik sa ovom e-mail adresom.")
    private String badRequestEmailExists;
    @Value("Nije dobar e-mail.")
    private String badRequestValidateEmail;
    @Value("Duzina {tekst} prelazi maksimalnu duzinu od {broj} karaktera.")
    private String badRequestStringMaxLength;
    @Value("Veličina {tekst} prelazi maksimalnu veličinu.")
    private String badRequestBinaryLength;
    @Value("Ažuriranje nije moguće.")
    private String badRequestUpdate;
    @Value("Dodavanje nije moguće.")
    private String badRequestInsert;
    @Value("Brisanje nije moguće.")
    private String badRequestDelete;
    @Value("4294967295")
    private Long longblobLength;
    @Value("Ne postoji user.")
    private String badRequestNoUser;
    @Autowired
    public UserController(UserRepository userRepository, CompanyRepository companyRepository){
    super(userRepository);
    this.userRepository=userRepository;
    this.companyRepository=companyRepository;
}
//Override metoda: insert*, update*, delete*, getAll*(ne smije se vidjeti sifra), getById(ne smije se vidjeti sifra)
//Implementirati metode: login*, logout*, ...


    @Override
    public @ResponseBody
    List<User> getAll() throws ForbiddenException {
        List<User> users = cloner.deepClone(userRepository.getAllByActiveIs((byte) 1));  //List<T> getAllByActiveIs(Byte active);

        if (superAdmin == userBean.getUser().getUserGroupId()) {
            for (User u : users) {
                u.setPassword("");
                u.setSalt("");
            }
            return users.stream().filter(u -> admin == u.getUserGroupId()).collect(Collectors.toList()); //od aktivnih usera, filtriram sve admine kompanija
        }


        users = cloner.deepClone(userRepository.getAllByCompanyIdAndActive(userBean.getUser().getCompanyId(), ((byte) 1)));
        if (admin == userBean.getUser().getUserGroupId()){
            for (User u : users) {
                u.setPassword("");
                u.setSalt("");
            }
        return users.stream().filter(u -> superAdmin != u.getUserGroupId() && admin != u.getUserGroupId()).collect(Collectors.toList());
    }else if(director == userBean.getUser().getUserGroupId()) {
            for (User u : users) {
                u.setPassword("");
                u.setSalt("");
            }
            return users.stream().filter(u ->  admin != u.getUserGroupId() && director != u.getUserGroupId()).collect(Collectors.toList());
        }else if(secretary == userBean.getUser().getUserGroupId()) {
            for(User u:users){ u.setPassword(""); u.setSalt(""); }
            return users.stream().filter(u -> sectorManager == u.getUserGroupId() || worker == u.getUserGroupId()).collect(Collectors.toList());
        } else if(sectorManager== userBean.getUser().getUserGroupId()) {
            users = cloner.deepClone(userRepository.getAllByCompanyIdAndSectorIdAndActive(userBean.getUser().getCompanyId(), userBean.getUser().getSectorId(), ((byte)1)));
             for(User u:users){ u.setPassword(""); u.setSalt(""); }
            return users.stream().filter(u-> worker == u.getUserGroupId()).collect(Collectors.toList());
        }
        throw new ForbiddenException("Forbidden");
    }

    @Override
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody
    User findById(@PathVariable("id") Integer id) throws BadRequestException {
        User user = userRepository.findById(id).orElse(null);
        if (user != null && Objects.equals(user.getCompanyId(), userBean.getUser().getCompanyId())) {
            user.setPassword("");
            user.setSalt("");
            return user;
        } else {
            throw new BadRequestException(badRequestNoUser);
        }
    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody
    User login(@RequestBody UserLoginInformation userLoginInformation) throws ForbiddenException {
        User user = userRepository.login(userLoginInformation.getEmail(), userLoginInformation.getPassword(), userLoginInformation.getCompanyPin());
        if (user == null) {
            throw new ForbiddenException("Forbidden");
        } else {
            userBean.setUser(user);
          //  userBean.setLoggedIn(true);
            return userBean.getUser();
        }
    }

    @SuppressWarnings("SameReturnValue")
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public @ResponseBody
    String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "Success";
    }

    @SuppressWarnings("SameReturnValue")
    @RequestMapping(value = "/numberOfAdmins", method = RequestMethod.GET)
    public @ResponseBody
    long numberOfAdmins(HttpServletRequest request) throws ForbiddenException{
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        List<User> users = cloner.deepClone(userRepository.getAllByActiveIs((byte) 1));  //List<T> getAllByActiveIs(Byte active);

        if (superAdmin == userBean.getUser().getUserGroupId()) {
        return users.stream().filter(u -> admin == u.getUserGroupId()).count();
        }else  throw new ForbiddenException("Forbidden");
    }

    /*
    * Superadmin can get number of everybody on sistem except admins
    * Admin can get number of everybody(workers, secretary, sector managers and director)
    * Director can get number of secretary+sector managers+workers
    * secretary can get number of sector managers+workers
    * sector manager can get number of workers in his sector
    * */
    @SuppressWarnings("SameReturnValue")
    @RequestMapping(value = "/numberOfWorkers", method = RequestMethod.GET)
    public @ResponseBody
    long numberOfWorkers(HttpServletRequest request) throws ForbiddenException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        List<User> users = cloner.deepClone(userRepository.getAllByActiveIs((byte) 1));  //List<T> getAllByActiveIs(Byte active);

        if (superAdmin == userBean.getUser().getUserGroupId())
            return users.stream().filter(u -> superAdmin != u.getUserGroupId() && admin != u.getUserGroupId()).count();
        else {
            users = cloner.deepClone(userRepository.getAllByCompanyIdAndActive(userBean.getUser().getCompanyId(), ((byte) 1)));

            if (admin == userBean.getUser().getUserGroupId())
                return users.stream().filter(u -> superAdmin != u.getUserGroupId() && admin != u.getUserGroupId()).count();
            else if (director == userBean.getUser().getUserGroupId())
                return users.stream().filter(u -> superAdmin != u.getUserGroupId() && admin != u.getUserGroupId() && director != u.getUserGroupId()).count();
            else if (secretary == userBean.getUser().getUserGroupId())
                return users.stream().filter(u -> sectorManager == u.getUserGroupId() || worker == u.getUserGroupId()).count();
            else if (sectorManager == userBean.getUser().getUserGroupId()) {
                users = cloner.deepClone(userRepository.getAllByCompanyIdAndSectorIdAndActive(userBean.getUser().getCompanyId(), userBean.getUser().getSectorId(), ((byte) 1)));
                return users.stream().filter(u -> worker == u.getUserGroupId()).count();
            } else
                throw new ForbiddenException("Forbidden");
        }
    }


    @Override
    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String update(@PathVariable Integer id, @RequestBody User user) throws BadRequestException {
        if(userBean.getUser().getId().equals(id)){
            if (Validator.stringMaxLength(user.getFirstName(), 100)) {
                if (Validator.stringMaxLength(user.getLastName(), 100)) {
                    if(Validator.binaryMaxLength(user.getPhoto(), longblobLength)){
                        if(Util.validateEmail(user.getEmail())) {
                            if(user.getUsername().equals(userRepository.findById(id).orElse(null).getUsername()) || userRepository.getByUsernameAndCompanyId(user.getUsername(), user.getCompanyId()) == null) {
                                if(userRepository.getByEmail(user.getEmail()) == null) {
                                    User userTemp = userRepository.findById(id).orElse(null);
                                    User oldUser = cloner.deepClone(repo.findById(id).orElse(null));

                                    userTemp.setFirstName(user.getFirstName());
                                    userTemp.setLastName(user.getLastName());
                                    userTemp.setUsername(user.getUsername());
                                    userTemp.setReceiveMail(user.getReceiveMail());
                                    userTemp.setPhoto(user.getPhoto());
                                    logUpdateAction(user, oldUser);

                                    return "Success";
                                }
                                throw new BadRequestException(badRequestEmailExists);
                            }
                            throw new BadRequestException(badRequestUsernameExists);
                        }
                        throw new BadRequestException(badRequestValidateEmail);
                    }
                    throw new BadRequestException(badRequestBinaryLength.replace("{tekst}", "slike"));
                }
                throw new BadRequestException(badRequestStringMaxLength.replace("{tekst}", "prezimena").replace("{broj}", String.valueOf(100)));
            }
            throw new BadRequestException(badRequestStringMaxLength.replace("{tekst}", "imena").replace("{broj}", String.valueOf(100)));
        }
        throw new BadRequestException(badRequestUpdate);
    }



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
                        newUser.setPassword(Util.hashPasswordSalt(newPassword,salt));
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
        //}
       // throw new BadRequestException(badRequestEmailExists);
    }
        }

