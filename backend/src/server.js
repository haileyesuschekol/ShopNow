import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import products from "./data/product.js"
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
app.get("/api/products", (req, res) => {
  res.send(products)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.send(product)
})
app.listen(port, () => {
  console.log(`running on port ${port}`)
})
