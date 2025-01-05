import express from "express"
import {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js"
import { admin, protect } from "../middleware/Auth.js"
const router = express.Router()

// get all product
router.route("/").get(getAllProduct).post(protect, admin, createProduct)
//get single product
router
  .route("/:id")
  .get(getSingleProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

export default router
