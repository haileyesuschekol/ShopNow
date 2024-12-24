import { createSlice } from "@reduxjs/toolkit"

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] }

const addDecimals = (num) => {
  return Math.round(num).toFixed(2)
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find((ex) => ex._id === item._id)

      if (existItem) {
        state.cartItems = state.cartItems.map((ex) =>
          ex._id === existItem._id ? item : ex
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      //calculate item price
      state.itemPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      )
      //calculate shipping price (if order > 100 it is free otherwise it is $10)

      state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 100)
      //calculate tax price

      state.taxPrice = addDecimals(state.itemPrice * 0.15)
      //calculate totale price

      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2)

      localStorage.setItem("cart", JSON.stringify(state))
    },
  },
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
