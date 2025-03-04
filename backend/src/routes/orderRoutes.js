import express from "express"
const router = express.Router()
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateToDeliverd,
} from "../controllers/orderController.js"
import { protect, admin } from "../middleware/Auth.js"

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders)
router.route("/my-order").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, admin, updateToDeliverd)
export default router
