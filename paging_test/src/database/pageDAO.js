const oracledb = require("oracledb");
const dbConfig = require("../../config/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const daoRead = {
    list : async (s, e) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select B.* from(select rownum rn, A.* from(select * 
            from paging order by num desc)A)B where rn between ${s} and ${e}`

            //문자열의 세미콜론; 삭제

        let result = await con.execute(sql);
        return result;
    },
    content : async (num) => {
        const con = await oracledb.getConnection(dbConfig);
        //반면 db는 마지막으로 값을 받아오는거라 무조건 async,await이 필요하다
        const sql = `select * from paging where num='${num}'`;
        const data = await con.execute(sql);
        return data;
    },
    totalContent : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = "select count(*) from paging";
        const totalContent = await con.execute(sql);
        return totalContent;
    }
}
const daoInsert = {
    write : async (body) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = 
        `insert into paging values(test_num.nextval,:title, sysdate, 0)`;
        // sysdate 쓴 날짜, 최초 조회수 0
        let result = 0;
        try {
            result = await con.execute(sql , body);
        }catch(err){
            console.log(err);
        }
    }
}

const daoUpdate = {
    upHit : async (num) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql =
        `update paging set count=count+1 where num='${num}'`;
        await con.execute(sql);
    }
}

module.exports = {daoRead, daoInsert, daoUpdate};