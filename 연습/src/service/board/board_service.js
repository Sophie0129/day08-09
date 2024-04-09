const dao = require("../../database/board/board_dao");
const common = require("../ser_common")

const boardRead = {
    list : async () => {
        let list = await dao.boardRead.list();
        list = common.timeModify(list.rows)
        return list;
    }
}
const boardInsert = {
    write : async (body, file, fileValidation) => {
        let msg, url;
        if(fileValidation){
            msg = fileValidation;
            url = "/board/write_form";
            return common.getMessage(msg, url);
        }
        console.log("file : ", file)
        if(file !== undefined){
            body.origin_file_name = file.originalname;
            body.change_file_name = file.filename;
        }else{
            body.origin_file_name = "nan";
            body.change_file_name = "nan";
        }
        console.log("body : ", body)
        const result = await dao.boardInsert.write(body);
        if(result. rowsAffected === 1){
            msg = "등록되었습니다!";
            url = "/board/write_form"
        }
        return common.getMessage(msg, url)
    }
}


module.exports = {boardRead, boardInsert};