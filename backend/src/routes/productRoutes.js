import express from "express"
import {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js"
import { admin, protect } from "../middleware/Auth.js"
const router = express.Router()

// get all product
router.route("/").get(getAllProduct).post(protect, admin, createProduct)
//get top products
router.get("/top", getTopProducts)

//get single product
router
  .route("/:id")
  .get(getSingleProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
//review
router.route("/:id/reviews").post(protect, createProductReview)
export default router
