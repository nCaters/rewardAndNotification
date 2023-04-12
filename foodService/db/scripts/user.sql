select * from role;
insert into role (role_id, description)
values('0','admin');

insert into role (role_id, description)
values('1','user');
select * from role;

select * from "user";
insert into "user" (user_id, role_id, name, username, password)
values('1','0','Jackson Qian Jie','qianjie','qwerty');

insert into "user" (user_id, role_id, name, username, password)
values('2','1','Tania Tan Rui Ying','taniatry','jamjamjam')
select * from "user";