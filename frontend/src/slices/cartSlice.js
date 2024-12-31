import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../utils/cartUtils"
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippinAddress: {}, paymentMethod: "PayPal" }

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

      return updateCart(state)
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
      return updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippinAddress = action.payload
      return updateCart(state)
    },
  },
})

export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions
export default cartSlice.reducer
