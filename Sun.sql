create table paging(
num number not null,
title varchar2(30) not null,
pdate varchar2(10) not null,
count number not null,
primary key(num)
);
create sequence test_num;
select rownum, num, title, from,paging

select *from paging;
select *from paging order by desc;
select rownum, num, title from paging;

//select from paging where num between 1 and 3;
select from paging where rownum between 1 and 3;
//중간삭제를 빼먹지 않고 게시물 숫자를 세려면 rownum

delet from paging where num='2'; 

commit;

select B.* from(select rownum rn, //별칭부여해야 괄호밖 변수와 연산,값주고받기 가능
A.* from(select * from paging order by num desc)A)B where rn between 3 and 5;


create table board(
write_no number(10) primary key,
title varchar2(100),
content varchar2(300),
save_date date default sysdate,
hit number(10) default 0,
origin_file_name varchar(100),
change_file_name varchar(100),
id varchar(20) not null,
constraint fk_test foreign key(id) references members(id) on delete cascade
);
//외래키로 회원만 글쓰기 가능.회원 탈퇴하면 글도 삭제됨
create sequence board_seq; 


create table reply(
id varchar(20),
title varchar(50),
content varchar(300),
write_group number(10),
save_date date default sysdate,

constraint fk_test1 foreign key(write_group) references board(write_no) on delete cascade,

constraint fk_test2 foreign key(id) references members(id) on delete cascade
);