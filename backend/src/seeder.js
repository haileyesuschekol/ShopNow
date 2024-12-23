import mongoose from "mongoose"
import dotenv from "dotenv"

import users from "./data/user.js"
import products from "./data/product.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDb from "./config/db.js"
dotenv.config()

connectDb()

const importDate = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()

    const createUser = await User.insertMany(users)
    const adminUser = createUser[0]._id

    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProduct)
    console.log("data imported")
    process.exit()
  } catch (error) {
    console.log("error while inserted data", error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()

    console.log("data destroyed")
    process.exit()
  } catch (error) {
    console.log("error while destroyed data", error)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importDate()
}
