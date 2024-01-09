const infoController = require("../controllers/infoController");

const router = require("express").Router();

router.post("/addUserinfo", infoController.addUserinfo);

router.get("/getAllUserinfo", infoController.getAllUserinfo);

router.get("/getUserinfo/:id", infoController.getUserinfo);

router.put("/updateUserinfo/:id", infoController.updateUserinfo);

router.delete("/deleteUserinfo/:id", infoController.deleteUserinfo);

module.exports = router;
