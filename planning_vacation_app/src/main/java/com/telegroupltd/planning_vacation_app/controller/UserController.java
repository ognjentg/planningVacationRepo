package com.telegroupltd.planning_vacation_app.controller;

import com.telegroupltd.planning_vacation_app.common.exceptions.BadRequestException;
import com.telegroupltd.planning_vacation_app.common.exceptions.ForbiddenException;
import com.telegroupltd.planning_vacation_app.controller.genericController.GenericController;
import com.telegroupltd.planning_vacation_app.model.User;
import com.telegroupltd.planning_vacation_app.model.UserGroup;
import com.telegroupltd.planning_vacation_app.model.UserUserGroupKey;
import com.telegroupltd.planning_vacation_app.model.UserUserGroupSector;
import com.telegroupltd.planning_vacation_app.repository.CompanyRepository;
import com.telegroupltd.planning_vacation_app.repository.UserGroupRepository;
import com.telegroupltd.planning_vacation_app.repository.UserRepository;
import com.telegroupltd.planning_vacation_app.session.UserBean;
import com.telegroupltd.planning_vacation_app.util.*;
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
    private final UserGroupRepository userGroupRepository;

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
    @Value("Stara lozinka nije ispravna.")
    private String badRequestOldPassword;
    @Value("Nova lozinka ne ispunjava pravila.")
    private String badRequestNewPassword;
    @Autowired
    public UserController(UserRepository userRepository, CompanyRepository companyRepository,UserGroupRepository userGroupRepository){
        super(userRepository);
        this.userRepository=userRepository;
        this.companyRepository=companyRepository;
        this.userGroupRepository=userGroupRepository;
    }
    //Used to send login information to the added user
    @Autowired
    Notification notification;

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
    UserUserGroupKey login(@RequestBody UserLoginInformation userLoginInformation) throws ForbiddenException {
        User user = userRepository.login(userLoginInformation.getEmail(), userLoginInformation.getPassword(), userLoginInformation.getCompanyPin());
        if (user == null) {
            throw new ForbiddenException("Forbidden");
        } else {
            userBean.setUser(user);
            userBean.setAuthorized(true);
           // return userBean.getUser();
            UserGroupController userGroupController=new UserGroupController(userGroupRepository);
            UserGroup userGroup= userGroupController.findById(user.getUserGroupId());
            userBean.setKeyUserGroup(userGroup.getKey());
            //  userBean.setLoggedIn(true);

            return new UserUserGroupKey(userBean.getUser(),userBean.getKeyUserGroup());
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
                        User userTemp = userRepository.findById(id).orElse(null);
                        User oldUser = cloner.deepClone(repo.findById(id).orElse(null));

                        userTemp.setFirstName(user.getFirstName());
                        userTemp.setLastName(user.getLastName());
                        userTemp.setReceiveMail(user.getReceiveMail());
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



    @Override
    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    User insert(@RequestBody User user) throws BadRequestException {
        ////   if(userRepository.countAllByCompanyIdAndEmail(userBean.getUser().getCompanyId(), user.getEmail()).compareTo(Integer.valueOf(0)) == 0){
        if(userRepository.getByCompanyIdAndEmailAndActive(user.getCompanyId(), user.getEmail(), (byte)1) != null){
            throw new BadRequestException(badRequestEmailExists);
        }
        if(Util.validateEmail(user.getEmail())){
            User newUser = new User();
            String salt=Util.randomSalt();
            String newPassword=Util.randomPassword();
            String username=Util.generateUsername(user.getEmail());

            newUser.setFirstName(null);
            newUser.setLastName(null);
            if(user.getCompanyId() == null)
                user.setCompanyId(userBean.getUser().getCompanyId());
            else if(user.getUserGroupId()!=superAdmin && user.getUserGroupId()!=admin ) {  //Svi primaju mail-ove osim superadmina i admina, prvi put
                //   newUser.setPauseFlag(user.getPauseFlag());
                //   newUser.setStartDate(user.getStartDate()); - ne kupi dobro na frontu,kupi undefined,pa zato ovako zasada/....
//                newUser.setPauseFlag(null);
//                newUser.setStartDate(null);
                newUser.setReceiveMail((byte) 1);
            }else {
//                newUser.setPauseFlag(null);
//                newUser.setStartDate(null);
                newUser.setReceiveMail((byte) 0);
            }
            newUser.setPauseFlag(user.getPauseFlag());
            newUser.setStartDate(user.getStartDate());
            newUser.setSectorId(user.getSectorId());  //It is sector manager's job
            newUser.setPhoto(null);
            newUser.setUserGroupId(user.getUserGroupId());
            if(user.getUserGroupId()!=superAdmin) {
                newUser.setCompanyId(user.getCompanyId());
            }else newUser.setCompanyId(null);
            newUser.setActive((byte) 1);

            if(user.getUserGroupId()!=superAdmin) {   //Ako nije superadmin, imace e-mail na koji ce dobiti username i password
                newUser.setEmail(user.getEmail());

                //User userWithUsername = userRepository.getByUsernameAndCompanyId(username, user.getCompanyId());
                //if (userWithUsername == null) {
                newUser.setUsername(username);
                newUser.setPassword(Util.hashPasswordSalt(newPassword,salt));
                newUser.setSalt(salt);
                //} else {
                //    throw new BadRequestException(badRequestUsernameExists);  //postoji ovaj username u  ovoj kompaniji                    }
                //}
            }
            //Superadmin will be added from workbench.

            if(repo.saveAndFlush(newUser) != null){
                entityManager.refresh(newUser);
                logCreateAction(newUser);
                if(user.getUserGroupId()!=superAdmin) {
                   notification.sendLoginLink(user.getEmail().trim(), newUser.getUsername(),  newPassword , (companyRepository.getById(newUser.getCompanyId())).getPin());  //slacemo username,password i PIN kompanije na email adresu
                }
                return newUser;
            }
            throw new BadRequestException(badRequestInsert);
        }
        throw new BadRequestException(badRequestValidateEmail);
        //}
        // throw new BadRequestException(badRequestEmailExists);
    }
    @RequestMapping(value = "/admins", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getAdminsOfCompany(){
        List<User> resoult = userRepository.getAllByCompanyIdAndUserGroupIdAndActive(userBean.getUser().getCompanyId(), admin, (byte)1);
        resoult.forEach(user -> user.setPassword(null));
        return resoult;
    }

    @RequestMapping(value = "/nonAdmins", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getNonAdmins(){
        Integer companyId = userBean.getUser().getCompanyId();
        List<User> resoult = userRepository.getAllByCompanyIdAndUserGroupIdAndActive(companyId, 3, (byte)1);
        resoult.addAll(userRepository.getAllByCompanyIdAndUserGroupIdAndActive(companyId, 4, (byte)1));
        resoult.addAll(userRepository.getAllByCompanyIdAndUserGroupIdAndActive(companyId, 5, (byte)1));
        resoult.addAll(userRepository.getAllByCompanyIdAndUserGroupIdAndActive(companyId, 6, (byte)1));
        resoult.forEach(user -> user.setPassword(null));
        return resoult;
    }
    @RequestMapping(value = "/admins/{companyId}", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getAdminsOfCompany(@PathVariable("companyId") Integer companyId){
        List<User> resoult = userRepository.getAllByCompanyIdAndUserGroupIdAndActive(companyId, admin, (byte)1);
        resoult.forEach(user -> user.setPassword(null));
        return resoult;
    }
    @RequestMapping(value = "/nonAdmins/{companyId}", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getNonAdmins(@PathVariable("companyId") Integer companyId){
        List<User> resoult = userRepository.getAllByCompanyIdAndUserGroupIdAndActive(companyId, 3, (byte)1);
        resoult.addAll(userRepository.getAllByCompanyIdAndUserGroupIdAndActive(companyId, 4, (byte)1));
        resoult.addAll(userRepository.getAllByCompanyIdAndUserGroupIdAndActive(companyId, 5, (byte)1));
        resoult.addAll(userRepository.getAllByCompanyIdAndUserGroupIdAndActive(companyId, 6, (byte)1));
        resoult.forEach(user -> user.setPassword(null));
        return resoult;
    }
    @RequestMapping(value = "/deleteAdmin/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String changeUserGroupToUser(@PathVariable("id")Integer id) throws BadRequestException{
        User oldUser = userRepository.findById(id).orElse(null);
        if(oldUser == null)
            throw new BadRequestException(badRequestNoUser);
        User userTemp = cloner.deepClone(oldUser);
        userTemp.setUserGroupId(worker);
        if(repo.saveAndFlush(userTemp) != null){
            logUpdateAction(userTemp, oldUser);
            return "Success";
        }
        else
            throw new BadRequestException(badRequestUpdate);
    }

    @RequestMapping(value = "/addAdmin/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String changeUserGroupToAdmin(@PathVariable("id")Integer id) throws BadRequestException{
        User oldUser = userRepository.findById(id).orElse(null);
        if(oldUser == null)
            throw new BadRequestException(badRequestNoUser);
        User userTemp = cloner.deepClone(oldUser);
        userTemp.setUserGroupId(admin);
        if(repo.saveAndFlush(userTemp) != null){
            logUpdateAction(userTemp, oldUser);
            return "Success";
        }
        else
            throw new BadRequestException(badRequestUpdate);
    }

    @RequestMapping(value = "/changeSector", method = RequestMethod.POST)
    public @ResponseBody
    String changeSector(@RequestBody ChangeSectorInformation changeSectorInformation) throws BadRequestException {
        User user = userRepository.findById(changeSectorInformation.getId()).orElse(null);
        if (user != null) {
            user.setSectorId(changeSectorInformation.getSectorId());
            if (repo.saveAndFlush(user) != null) {
                return "Success";
            }
        } else {
            return "Error";
        }
        return new String();
    }

    @RequestMapping(value = "/changeToManager/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String changeUserGroupToManager(@PathVariable("id")Integer id) throws BadRequestException{
        User oldUser = userRepository.findById(id).orElse(null);
        if(oldUser == null)
            throw new BadRequestException(badRequestNoUser);
        User userTemp = cloner.deepClone(oldUser);
        userTemp.setUserGroupId(sectorManager);
        if(repo.saveAndFlush(userTemp) != null){
            logUpdateAction(userTemp, oldUser);
            return "Success";
        }
        else
            throw new BadRequestException(badRequestUpdate);
    }

    @RequestMapping(value = "/changeToWorker/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String changeUserGroupToWorker(@PathVariable("id")Integer id) throws BadRequestException{
        User oldUser = userRepository.findById(id).orElse(null);
        if(oldUser == null)
            throw new BadRequestException(badRequestNoUser);
        User userTemp = cloner.deepClone(oldUser);
        userTemp.setUserGroupId(worker);
        if(repo.saveAndFlush(userTemp) != null){
            logUpdateAction(userTemp, oldUser);
            return "Success";
        }
        else
            throw new BadRequestException(badRequestUpdate);
    }


    @RequestMapping(value = "/custom/bySector/{sectorId}", method = RequestMethod.GET)
    public @ResponseBody
    List<UserUserGroupSector> getAllExtendedBySectorId(@PathVariable Integer sectorId) {
        if(sectorId==-1) //svi sektori
            return userRepository.getAllByCompanyIdAllSectorsAndActive(userBean.getUser().getCompanyId());
            else if(sectorId==-2) //workers without sector
                return userRepository.getAllExtendedBySectorIdNullAndActive(userBean.getUser().getCompanyId());

        return userRepository.getAllExtendedBySectorIdAndActive(userBean.getUser().getCompanyId(), sectorId);
    }
    @RequestMapping(value = "/deleteUser/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    String deleteUser(@PathVariable Integer id) throws BadRequestException{
        User user = userRepository.getByIdAndActive(id, (byte)1);
        if(user == null)
            throw new BadRequestException(badRequestNoUser);
        User userTemp = cloner.deepClone(user);
        userTemp.setActive((byte) 0);
        if(repo.saveAndFlush(userTemp) != null){
            logUpdateAction(userTemp, user);
            return "Success";
        }
        else
            throw new BadRequestException(badRequestUpdate);
    }

    @RequestMapping(value = "/updatePassword", method = RequestMethod.POST)
    public @ResponseBody
    String updatePassword(@RequestBody PasswordInformation passwordInformation) throws BadRequestException{
        User user = userRepository.findById(userBean.getUser().getId()).orElse(null);
        if(user != null){
            if(passwordInformation.getOldPassword() != null && user.getPassword().trim().toLowerCase().equals(Util.hashPasswordSalt(passwordInformation.getOldPassword().trim(),user.getSalt()))){
                if(passwordInformation.getNewPassword() != null && Validator.passwordChecking(passwordInformation)){
                user.setSalt(Util.randomSalt());
                user.setPassword(Util.hashPasswordSalt(passwordInformation.getNewPassword(),user.getSalt()));
                if(repo.saveAndFlush(user) != null){
                    return "Success";
                }
                throw new BadRequestException(badRequestUpdate);

                 }
                 throw new BadRequestException(badRequestNewPassword);
            }
            throw new BadRequestException(badRequestOldPassword);
        }
        throw new BadRequestException(badRequestNoUser);
    }

    @RequestMapping(value = {"/state"}, method = RequestMethod.GET)
    public @ResponseBody
    User checkState() throws ForbiddenException {
        if (userBean.isAuthorized()) {
            return userBean.getUser();
        } else
            throw new ForbiddenException("Forbidden");
    }




    @RequestMapping(value = "/getAllUsersFromSectorByUserGroupId/{sectorId}", method = RequestMethod.GET)
    public @ResponseBody List<User> getAllUsersFromSectorByUserGroupId(@PathVariable Integer sectorId){
        return userRepository.getAllUsersFromSectorByUserGroupId(userBean.getUser().getCompanyId(),sectorId);
    }

    @RequestMapping(value = "/getAllUsersWithoutSector", method = RequestMethod.GET)
    public @ResponseBody List<User> getAllUsersWithoutSector(){
        Integer companyId=userBean.getUser().getCompanyId();
        return userRepository.getAllUsersWithoutSector(companyId);
    }

}

