import express from "express"
import {
  getAllProduct,
  getSingleProduct,
} from "../controllers/productController.js"
const router = express.Router()

// get all product
router.route("/").get(getAllProduct)
//get single product
router.route("/:id").get(getSingleProduct)

export default router
