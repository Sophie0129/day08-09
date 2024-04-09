const service = require("../service/page_service")
const views = {
    index : (req,res) => {
        res.render("index");
    },
    list : async (req, res)=>{
        console.log("req.query.start : ", req.query.start)
        const totalContent = await service.pageRead.totalContent();//글의 총 갯수를 가져옴
        
        const data = await service.pageRead.list(req.query.start, totalContent);
        
        //const list = await service.pageRead.list();
        res.render("list", {list : data.list, page : data.page,
            start : data.start, totalContent : data.page.totPage});
            //totalContent : data.page.totPage}

    },
    writeForm : (req, res) => {
        res.render("write_form");
    },
    content : async (req, res) => {
        const data = await service.pageRead.content(req.params.num);
        res.render("content", {data});
    }
}
const process = {
    write : async (req, res) => {
        //console.log("req.body : ",req.body);
        const msg = await service.pageInsert.write(req.body);
        res.redirect("/page/list")
    }
}
module.exports = {views, process};