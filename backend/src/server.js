import path from "path"
import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDb from "./config/db.js"
import productRoute from "./routes/productRoutes.js"
import userRoute from "./routes/userRoutes.js"
import orderRoute from "./routes/orderRoutes.js"
import uploadRoute from "./routes/uploadRoutes.js"
import products from "./data/product.js"
import Product from "./models/productModel.js"
import { notFound, errorHandler } from "./middleware/errorHandler.js"
connectDb() //connect to database
const app = express()
const port = process.env.PORT || 8000

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
)

app.use("/api/products", productRoute)
app.use("/api/users", userRoute)
app.use("/api/orders", orderRoute)
app.use("/api/upload", uploadRoute)

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  //any route that is not api will be redirected to index.html
  app.get(
    ("*",
    (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
  )
} else {
  app.get("/", (req, res) => {
    res.send("Api is running ....")
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`running on port ${port}`)
})
