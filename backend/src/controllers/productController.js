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

export { getAllProduct, getSingleProduct }
