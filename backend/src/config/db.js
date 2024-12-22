import mongoose from "mongoose"

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Successfully connected to DB.")
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

export default connectDb