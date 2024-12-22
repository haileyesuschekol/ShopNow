import express from "express"
import dotenv from "dotenv"
dotenv.config()
import products from "./data/product.js"
const app = express()
const port = process.env.PORT || 8000

app.get("/", (req, res) => {
  res.send(products)
})

app.get("/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.send(product)
})
app.listen(port, () => {
  console.log(`running on port ${port}`)
})
