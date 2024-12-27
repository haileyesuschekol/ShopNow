import User from "../models/userModel"

const authUser = async (req, res) => {
  res.send("auth user")
}

const registerUser = async (req, res) => {
  res.send("register user")
}

const logoutUser = async (req, res) => {
  res.send("logout user")
}

const getUserProfile = async (req, res) => {
  res.send("user profile")
}

const updateUserProfile = async (req, res) => {
  res.send("update user profile")
}

const getUsers = async (req, res) => {
  res.send("get user")
}

const deleteUser = async (req, res) => {
  res.send("delete user")
}

const getUserById = async (req, res) => {
  res.send("get user by id")
}

const updateUser = async (req, res) => {
  res.send("update user")
}

export {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
}
