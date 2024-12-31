import Order from "../models/orderModel.js"

const addOrderItems = async (req, res) => {
  res.send("add order item")
}

const getMyOrders = async (req, res) => {
  res.send("get my order item")
}

const getOrderById = async (req, res) => {
  res.send("get order id")
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
