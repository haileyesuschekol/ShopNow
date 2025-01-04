import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom"
import { Provider } from "react-redux"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
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
import OrderScreen from "./components/OrderScreen.jsx"
import ProfileScreen from "./components/ProfileScreen.jsx"
import AdminRoute from "./components/AdminRoute.jsx"
import OrderListScreen from "./screens/admin/OrderListScreen.jsx"

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
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
)
