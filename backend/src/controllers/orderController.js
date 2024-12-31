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
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })

      const createOrder = await Order.save()
      res.status(201).json({ createOrder })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json(orders)
}

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "User",
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
  res.send("update to paid")
}

const updateToDeliverd = async (req, res) => {
  res.send("update to delivered")
}

const getOrders = async (req, res) => {
  res.send("get all orders")
}

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateToDeliverd,
}
