const database = require("../models/User_infoModel");

//create main model
const User_info = database.users_info;

//create user_info
const addUserinfo = async (req, res) => {
  let info = {
    id: req.body.id,
    name: req.body.name,
    phone_number: req.body.phone_number,
  };

  const user_info = await User_info.create(info);
  res.status(200).send(user_info);
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
  let id = req.params.id;
  let info = {
    name: req.body.name,
    phone_number: req.body.phone_number,
  };
  let user_info = await User_info.update(info, { where: { id: id } });
  res.status(200).send(user_info);
};

// delete a user
const deleteUserinfo = async (req, res) => {
  let id = req.params.id;
  let user_info = await User_info.destroy({ where: { id: id } });
  res.status(200).send("User Deleted");
};

module.exports = {
  addUserinfo,
  getAllUserinfo,
  getUserinfo,
  updateUserinfo,
  deleteUserinfo,
};
