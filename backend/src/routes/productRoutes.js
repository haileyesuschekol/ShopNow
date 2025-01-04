import express from "express"
import {
  createProduct,
  getAllProduct,
  getSingleProduct,
} from "../controllers/productController.js"
import { admin, protect } from "../middleware/Auth.js"
const router = express.Router()

// get all product
router.route("/").get(getAllProduct).post(protect, admin, createProduct)
//get single product
router.route("/:id").get(getSingleProduct)

export default router
