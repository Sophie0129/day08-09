const con = require("../common_dao");
const repInsert = {
    register : async (body) => {
        console.log("body : ", body)
        const sql = 
            `insert into reply(id, title, content, write_group)
            values(:id,:title,:content,:write_no)
            `;
        const result = (await con).execute( sql , body );
        return result;
    }
}
const repRead = {
        replyData : async ( groupNum )=>{
            const sql = `select * from reply where write_group=${groupNum}`;
            const result = (await con).execute( sql );
            return result;
        }
    }
    
module.exports = { repInsert, repRead };