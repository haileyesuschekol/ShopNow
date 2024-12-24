export const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.BASE_URL_DEV
    : import.meta.env.BASE_URL_PROD
export const PRODUCT_URL = "/api/products"
export const USER = "/api/users"
export const ORDERS = "/api/orders"
export const PAYPAL = "/api/config/paypal"
