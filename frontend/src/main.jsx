import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/style/style.css"
import App from "./App.jsx"
import HomeScreen from "./screens/HomeScreen.jsx"
import ProductScreen from "./screens/ProductScreen.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
