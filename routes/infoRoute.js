const {
  addUserinfo,
  getAllUserinfo,
  getUserinfo,
  updateUserinfo,
  deleteUserinfo,
  GetUserImage,
  UploadUserImage,
  upload,
  encodeBase64Img,
  decodeBase64Img,
} = require("../controllers/infoController");

const router = require("express").Router();

router.post("/addUserinfo", addUserinfo);

router.get("/getAllUserinfo", getAllUserinfo);

router.post("/uploadSingleImage", upload.single("image"), UploadUserImage);

router.post("/encode", upload.single("image"), encodeBase64Img);

router.post("/decode", decodeBase64Img);

router.get("/getImage/:filename", GetUserImage);

router.get("/getUserinfo/:id", getUserinfo);

router.put("/updateUserinfo/:id", updateUserinfo);

router.delete("/deleteUserinfo/:id", deleteUserinfo);

module.exports = router;
