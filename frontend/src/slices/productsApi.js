import { PRODUCT_URL } from "../constant/constant"
import { apiSlice } from "./apiSlice"

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: {
        url: PRODUCT_URL,
      },
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetProductQuery } = productSlice
