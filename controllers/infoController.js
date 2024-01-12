const db1 = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const base64 = require("base64-img");
const jwt = require("jsonwebtoken");
const secret = "Sohom@2023";

//create main model
const User_info = db1.users_info;

//create user_info
const addUserinfo = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      phone_number: req.body.phone_number,
    };

    const user_info = await db1.users_info.create(info);

    // create a JWT token
    const token = jwt.sign({ id: user_info.id }, secret, { expiresIn: "1h" });

    res.status(200).send({ user: user_info, token: token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//get all users
const getAllUserinfo = async (req, res) => {
  let user_info = await User_info.findAll({});
  res.status(200).send(user_info);
};

//get a user
const getUserinfo = async (req, res) => {
  let id = req.params.id;
  let user_info = await User_info.findOne({ where: { id: id } });
  res.status(200).send(user_info);
};

//update a user info
const updateUserinfo = async (req, res) => {
  try {
    const token = req.headers?.Authorization || req.headers?.authorization;
    const decoded = jwt.verify(token, secret);
    const userId = decoded.id;

    let info = {
      name: req.body.name,
      phone_number: req.body.phone_number,
    };

    await User_info.update(info, { where: { id: userId } });
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Multer configuration
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      req.fileValidationError = "Wrong extension";
      return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
  },
});

// Upload user image
const UploadUserImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ message: "Single File Uploaded", file: req.file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Encode base64 image
const encodeBase64Img = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const encodedImage = await base64.base64Sync(imagePath);

    res.status(200).json({ base64Image: encodedImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//decode base64 img
const decodeBase64Img = async (req, res) => {
  try {
    const base64String = req.body.image;
    const filename = req.body.filename;
    base64.img(
      base64String,
      "./uploads",
      filename,
      async function (err, filepath) {
        if (err) {
          throw new Error("Failed to save image");
        }
        // Convert the relative path to absolute path
        const absolutePath = path.resolve(filepath);
        // Check if the file exists before sending
        if (fs.existsSync(absolutePath)) {
          res.sendFile(absolutePath);
        } else {
          throw new Error("File not found");
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user image
const GetUserImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join("images", filename);

    if (fs.existsSync(filePath)) {
      res.status(200).download(filePath, filename);
    } else {
      throw new Error("File not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete a user
const deleteUserinfo = async (req, res) => {
  let id = req.params.id;
  await User_info.destroy({ where: { id: id } });
  res.status(200).send({ message: "User deleted" });
};

module.exports = {
  addUserinfo,
  getAllUserinfo,
  getUserinfo,
  updateUserinfo,
  deleteUserinfo,
  UploadUserImage,
  GetUserImage,
  upload,
  decodeBase64Img,
  encodeBase64Img,
};
