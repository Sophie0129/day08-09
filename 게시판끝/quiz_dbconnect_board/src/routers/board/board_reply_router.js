const router = require("express").Router();
const repCtrl = require("../../controller/board/board_reply_ctrl");

router.post("/register", repCtrl.rep_process.register);

router.get("/replyData/:groupNum", repCtrl.rep_views.replyData );

module.exports = router;