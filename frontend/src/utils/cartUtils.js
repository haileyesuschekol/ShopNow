export const addDecimals = (num) => {
  return Math.round(num).toFixed(2)
}

export const updateCart = (state) => {
  //calculate item price
  state.itemPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
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
  return state
}
