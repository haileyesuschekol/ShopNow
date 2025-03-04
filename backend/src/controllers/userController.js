import User from "../models/userModel.js"
import createToken from "../utils/createToken.js"
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    createToken(res, user._id)

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
        _id: user._id,
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
  const user = await User.findById(req.user._id)
  try {
    if (user) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      throw new Error("User not found!")
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
  try {
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email

      if (req.body.password) {
        user.password = req.body.password
      }

      const updateUser = await user.save()

      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
      })
    } else {
      throw new Error("User not found")
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getUsers = async (req, res) => {
  const users = await User.find({})
  try {
    if (users) {
      res.status(200).json(users)
    } else {
      throw new Error("Something error")
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)

  try {
    if (user) {
      res.status(200).json(user)
    } else {
      throw new Error("User not found!")
    }
  } catch (error) {
    res.status(404).json(user)
  }
}

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  try {
    if (user) {
      if (user.isAdmin) {
        res.status(400)
        throw new Error("Cannot delete Admin!")
      }

      await User.deleteOne({ _id: req.params.id })
      res.status(200).json({ message: "User delete successfully" })
    } else {
      throw new Error("User not found!")
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  try {
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = Boolean(req.body.isAdmin)

      const updatedUser = await user.save()

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      throw new Error("User not found")
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
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
