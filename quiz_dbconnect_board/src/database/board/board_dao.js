const dbConfig = require("../../../config/database/db_config");

const con = require("../common_dao")

const boardRead = {
    data : async(num) => {
        const sql = `select * from board where write_no='${num}'`;
        const data = await ((await con).execute(sql)); 
        //연산할꺼면 await 2번, 연산을 안하는 서비스쪽에서는 필요없음
        console.log("dao data : ", data)
        return data;
    },
    list : async (start, end) => {
        //const con = oracledb.getConnection(dbConfig) 커먼DAO에 만들어놔서 쓸필요 X
        //const sql = "select * from board";
        const sql = `select * from (select rownum rn, A.* from 
            (select * from board order by write_no desc)A)
            where rn between ${start} and ${end}`;

            console.log("con : ", con)
            const list = (await con).execute(sql);
            return list;
        },
        totalContent : async () => {
            const sql = "select count(*) from board";
            const totalContent = await (await con).execute( sql );
            return  totalContent.rows[0]['COUNT(*)'];
        }         
        
}
const boardInsert = {
    write : async (body)=>{
        const sql = 
        `insert into board(write_no, id, title, content, origin_file_name,
        change_file_name) values(board_seq.nextval, :id, :title, :content,
        :origin_file_name, :change_file_name)`;
        const result = await (await con).execute(sql, body);
        console.log("result : ", result);
        return result;
    }
}
const boardUpdate = {
    modify : async ( body )=>{
        const sql = `update board set title=:title, content=:content, 
            origin_file_name=:origin_file_name, 
            change_file_name=:change_file_name where write_no=:write_no`;
        let result = 0;
        try{
            result = (await con).execute(sql,body)
        }catch(err){
            console.log(err)
        }
            //return (await con).execute( sql, body );
            return result;
    },
    upHit : async (num) => {
        const sql = `update board set hit = hit + 1 where write_no='${num}'`;
        (await con).execute(sql)

    },
    delete : async (writeNo) => {
        const sql = `delete from board where write_no=${writeNo}`
        console.log("sql : ",sql);
        (await con).execute(sql)
    }
}
 module.exports = {boardRead, boardInsert, boardUpdate};