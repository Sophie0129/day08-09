const service = require("../../service/board/board_service");
const common = require("../../service/ser_common")

const board_view = {
    modify_form : async (req, res) => {
        const data = await service.boardRead.data(req.params.writeNo);
        res.render("board/modify_form", {data})
    },
    data : async (req, res) => {
        const data = await service.boardRead.data(req.params.num);
        const username = req.session.username;
        res.render("board/data", {data, username});
    },
    list : async (req,res) => {
        //const list = await service.boardRead.list();
        const data = await service.boardRead.list(req.query.start);
        res.render("board/list", {list : data.list,
            start : data.start, totalPage : data.totalPage});

    },
    writeForm : async (req,res) => {
        const session = req.session;
        const msg = common.sessionCheck(session);
        if (msg !==0){
            return res.send(msg);

        }
        res.render("board/write_form", {username : session.username})

    }
}
const board_process = {
    modify : async (req,res) => {
        const deleteFile = req.body.change_file_name;
        const message = 
        await service.boardUpdate.modify(req.body, req.file);
        if(req.file !== undefined && message.result === 1) {
            this.file_process.delete(deleteFile)
;        }
        res.send(message.msg);
        
    },
    write : async (req, res) => {
        const msg = await service.boardInsert.write(
            req.body, req.file, req.fileValidation
        );
        res.send(msg)
    },
    delete : (req,res)=>{
        //DB에서 삭제 성공했을 시에만 file을 삭제하도록 함
        file_process.delete(req.params.imgName);
        service.boardUpdate.delete(req.params.writeNo);
        res.redirect("/board/list");
    }
}
const fs = require("fs")
file_process ={
    delete : (imgName) => {
        if(imgName !== 'nan'){
            try{
            fs.unlinkSync(`./upload_file/${imgName}`)
            }catch(err){
                console.log(err)
            }
        }
    },
    download : (req, res)=>{
        const filePath = `./upload_file/${req.params.imgName}`
        res.download(filePath)

}
}

module.exports = {board_view, board_process, file_process};