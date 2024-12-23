import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import connectDb from "./config/db.js"
import productRoute from "./routes/productRoutes.js"
import products from "./data/product.js"
import Product from "./models/productModel.js"
import { notFound, errorHandler } from "./middleware/errorHandler.js"
connectDb() //connect to database
const app = express()
const port = process.env.PORT || 8000

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
)

app.get("/", (req, res) => {
  console.log("ShopNow")
})

app.use("/api/products", productRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`running on port ${port}`)
})
