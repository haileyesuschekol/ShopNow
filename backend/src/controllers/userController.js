import User from "../models/userModel.js"
import createToken from "../utils/createToken.js"
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    createToken(user._id)

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
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      throw new Error("User already exists!")
    }
    //create user
    const user = await User.create({ name, email, password })
    if (user) {
      //create token
      createToken(res, user._id)

      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    expiresIn: new Date(0),
    httpOnly: true,
  })

  res.status(200).json({ message: "Logout Successfully!" })
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
