import mongoose from "mongoose"
import Product from "../models/productModel.js"

//get all products
const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find({})
    if (!product) {
      res.status(400)
      throw new Error("Resourse Not found")
    }
    res.status(200).json(product)
  } catch (error) {
    res.send(error)
  }
}

// get single product
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(400)
      throw new Error("Resourse Not Found")
    }
    res.status(200).json(product)
  } catch (error) {
    res.send(error)
  }
}

//create product
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numOfReviews: 0,
      description: "Sample description",
    })

    if (product) {
      const createdProduct = await product.save()
      res.status(201).json(createdProduct)
    } else {
      throw new Error("Product not found")
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock

      const updateProduct = await product.save()
      res.status(200).json(updateProduct)
    } else {
      throw new Error("Error Happening please try again")
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// const updateProduct = async (req, res) => {
//   const { name, price, description, image, brand, category, countInStock } =
//     req.body

//   try {
//     // Validate product ID
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ error: "Invalid product ID" })
//     }

//     const product = await Product.findById(req.params.id)

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" })
//     }

//     // Update product fields
//     product.name = name || product.name
//     product.price = price || product.price
//     product.description = description || product.description
//     product.image = image || product.image
//     product.brand = brand || product.brand
//     product.category = category || product.category
//     product.countInStock = countInStock || product.countInStock

//     const updatedProduct = await product.save()

//     res.status(200).json(updatedProduct)
//   } catch (error) {
//     console.error("Error updating product:", error)
//     res.status(500).json({ error: "Internal server error" })
//   }
// }

export { getAllProduct, getSingleProduct, createProduct, updateProduct }
