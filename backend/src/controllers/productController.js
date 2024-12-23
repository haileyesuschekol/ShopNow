import Product from "../models/productModel.js"

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find({})
    if (!product) {
      return res.status(400).json({ msg: "Not found" })
    }
    res.status(200).json(product)
  } catch (error) {
    res.send("not found")
  }
}

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(400).json({ msg: "Not found" })
    }
    res.status(200).json(product)
  } catch (error) {
    res.send("not found")
  }
}

export { getAllProduct, getSingleProduct }
