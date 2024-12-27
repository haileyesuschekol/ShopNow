import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    })

    //set jwt on http only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 1000, //30d
    })
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      throw new Error("Invalid email or password!")
    }
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
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
