const router = require("express").Router();
const boardCtrl = require("../../controller/board/board_ctrl");

router.get("/list", boardCtrl.board_views.list);
router.get("/write_form", boardCtrl.board_views.writeForm);

const upload = require("../../../config/file/file_config");
router.post("/write" , upload.single("image_file_name") ,
                                    boardCtrl.board_process.write );

router.get("/data/:num", boardCtrl.board_views.data );
router.get("/download/:imgName", boardCtrl.file_process.download );
router.get("/delete/:writeNo/:imgName", 
                    boardCtrl.board_process.delete );
router.get("/modify_form/:writeNo", boardCtrl.board_views.modifyForm );

router.post("/modify", upload.single('image_file_name'),
                            boardCtrl.board_process.modify);

module.exports = router;