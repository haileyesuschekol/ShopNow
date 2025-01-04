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

export { getAllProduct, getSingleProduct, createProduct, updateProduct }
