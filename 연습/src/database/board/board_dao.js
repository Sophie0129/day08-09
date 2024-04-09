const dbConfig = require("../../../config/database/db_config");
const con = require("../common_dao")
const boardRead = {
    list : async () => {
        //const con = oracledb.getConnection(dbConfig) 커먼DAO에 만들어놔서 쓸필요 X
        const sql = "select * from board";
        console.log("con : ", con)
        const list = (await con).execute(sql);
        return list;
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
 module.exports = {boardRead, boardInsert};