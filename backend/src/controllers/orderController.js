import Order from "../models/orderModel.js"

const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  try {
    if (orderItems && orderItems.length === 0) {
      throw new Error("No order items")
    } else {
      const order = new Order({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })

      const createOrder = await order.save()
      res.status(201).json({ createOrder })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getMyOrders = async (req, res) => {
  const order = await Order.find({ user: req.user._id })
  try {
    if (order) {
      res.status(200).json(order)
    } else {
      throw new Error("Order not found")
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )
  try {
    if (order) {
      res.status(200).json(order)
    } else {
      throw new Error("Order not found")
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id)
  try {
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }

      const updateOrder = order.save()
      res.status(200).json(updateOrder)
    } else {
      throw new error("Order not found")
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateToDeliverd = async (req, res) => {
  res.send("update to delivered")
}

//@desc     Get all orders
// @route   Get api/orders
//@access   private/Admin
const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name email")
  try {
    if (orders) {
      res.status(200).json(orders)
    } else {
      throw new Error("Order not found")
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateToDeliverd,
}
