import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/store.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/style/style.css"
import App from "./App.jsx"
import HomeScreen from "./screens/HomeScreen.jsx"
import ProductScreen from "./screens/ProductScreen.jsx"
import CartScreen from "./screens/CartScreen.jsx"
import LoginScreen from "./screens/LoginScreen.jsx"
import RegisterScreen from "./screens/RegisterScreen.jsx"
import ShippingScreen from "./screens/ShippingScreen.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import PaymentScreen from "./screens/PAymentScreen.jsx"
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
