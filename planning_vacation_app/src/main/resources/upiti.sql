select * from user;
select * from company;
select * from user_group;
#update user set id=5 where id=37;
#delete from user where id=38;
#delete from user_group where id=3;
#update user_group  set id=7 where id=10;

#SELECT DISTINCT u.id, u.username, u.password, u.email, u.pause_flag, u.start_date ,u.first_name, u.last_name, u.salt, u.receive_mail, u.sector_id, u.photo, u.user_group_id, u.company_id, u.active 
 #           FROM user u JOIN company c ON IF(u.user_group_id=1, true, u.company_id=c.id) 
 #           WHERE u.username='superadmin' AND u.password=SHA2(concat(u.salt,'password'), 512) AND IF(u.user_group_id=1, u.company_id IS NULL, c.pin="")
 #           ;
   
   
   
insert into user_group values(1, '1', 'superadmin', 1);
insert into user values(null, 'superadmin', '2908D2C28DFC047741FC590A026FFADE237AB2BA7E1266F010FE49BDE548B5987A534A86655A0D17F336588E540CD66F67234B152BBB645B4BB85758A1325D64', null, null,null,null,null, 'salt',null,null,null,1,null,1);  

insert into user_group values(2, '2', 'admin', 1);
insert into user values(null, 'admin1', '2908D2C28DFC047741FC590A026FFADE237AB2BA7E1266F010FE49BDE548B5987A534A86655A0D17F336588E540CD66F67234B152BBB645B4BB85758A1325D64', null, null,null,null,null, 'salt',null,null,null,2,1,1);

insert into user_group values(3, '3', 'direktor', 1);
insert into user values(null, 'direktor1', '2908D2C28DFC047741FC590A026FFADE237AB2BA7E1266F010FE49BDE548B5987A534A86655A0D17F336588E540CD66F67234B152BBB645B4BB85758A1325D64', null, null,null,null,null, 'salt',null,null,null,3,1,1);

insert into user_group values(4, '4', 'sekretar', 1);
insert into user values(null, 'sekretar1', '2908D2C28DFC047741FC590A026FFADE237AB2BA7E1266F010FE49BDE548B5987A534A86655A0D17F336588E540CD66F67234B152BBB645B4BB85758A1325D64', null, null,null,null,null, 'salt',null,null,null,4,1,1);

insert into user_group values(5, '5', 'menadzer', 1);
insert into user values(null, 'menadzer1', '2908D2C28DFC047741FC590A026FFADE237AB2BA7E1266F010FE49BDE548B5987A534A86655A0D17F336588E540CD66F67234B152BBB645B4BB85758A1325D64', null, null,null,null,null, 'salt',null,null,null,5,1,1);

insert into user_group values(6, '6', 'zaposleni', 1);
insert into user values(6, 'zaposleni1', '2908D2C28DFC047741FC590A026FFADE237AB2BA7E1266F010FE49BDE548B5987A534A86655A0D17F336588E540CD66F67234B152BBB645B4BB85758A1325D64', null, null,null,null,null, 'salt',null,null,null,6,1,1);
