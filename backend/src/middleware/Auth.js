import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const protect = async (req, res, next) => {
  //read jwt from cookies
  let token = req.cookies.jwt

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decode.userId).select("-password")
      next()
      if (!decode) {
        throw new Error("Not authorized, invalid token")
      }
    } catch (error) {
      res.status(401).json({ error: error.message })
    }
  } else {
    res.status(401).json("Not authorized, no token")
  }
}

//admin authorized

const admin = async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      throw new Error("Not authorized access!")
    }
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

export { protect, admin }
