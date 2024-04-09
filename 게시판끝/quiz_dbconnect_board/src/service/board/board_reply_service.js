const dao = require("../../database/board/board_reply_dao");
repInsert = { 
    register : async (body) => {
        const result = await dao.repInsert.register( body );
        return result.rowsAffected;
    } 
}
const common = require("../ser_common");
repRead = { 
    replyData : async ( groupNum ) => {
        let result = await dao.repRead.replyData( groupNum );
        result = common.timeModify( result.rows );
        return result;
    }
}
module.exports = { repRead , repInsert };