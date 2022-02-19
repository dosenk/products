import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IProduct } from '../models/IProduct';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/products'
  }),
  endpoints: (build) => ({
    fetchAppProducts: build.query<IProduct[], ''>({
      query: () => ({
        url: '/'
      })
    }),
    fetchAppProduct: build.query<IProduct, string>({
      query: (product) => ({
        url: `/${product}`
      })
    }),
    addProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/`,
        method: 'POST',
        body: product
      })
    })
  })
});

export const { useFetchAppProductsQuery, useFetchAppProductQuery, useAddProductMutation } =
  productApi;
