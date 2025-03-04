import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../constant/constant"

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" })

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: () => ({}),
})
