select * from role;
insert into role (role_id, description)
values('0','admin');

insert into role (role_id, description)
values('1','user');
select * from role;



select * from "user";
insert into "user" (role_id, name, username, email, password)
values('0','Jackson Qian Jie','qianjie','qianjie93@gmail.com', 'qwerty');

insert into "user" (role_id, name, username, email, password)
values('1','Tania Tan Rui Ying','taniatry','taniatry95@gmail.com', 'jamjamjam');
select * from "user";