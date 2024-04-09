const router = require("express").Router();
const boardCtrl = require("../../controller/board/board_ctrl");

router.get("/list", boardCtrl.board_view.list);
router.get("/write_form", boardCtrl.board_view.writeForm);

const upload = require("../../../config/file/file_config")
router.post("/write", upload.single("image_file_name"),
    boardCtrl.board_process.write)

module.exports = router;