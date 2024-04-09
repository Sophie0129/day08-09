module.exports = (app)=>{
    const memberRouter = require("./member/member_router");
    app.use("/member", memberRouter );
    
    const boardRouter = require("./board/board_router")
    app.use("/board", boardRouter );

    const boardreplyRouter = require("./board/board_reply_router")
    app.use("/boardrep", boardreplyRouter );

    const router = require("express").Router();
    router.get("/", (req, res)=>{
        //res.send("connect test");
        if(req.session.username){
            res.cookie("isLogin",true);
        }
        res.render("index",{username : req.session.username});
    })
    return router;
}

