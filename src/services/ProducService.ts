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
    fethAppProduct: build.query<IProduct, string>({
      query: (product) => ({
        url: `/${product}`
      })
    }),
    fethAppAddProduct: build.query<IProduct, IProduct>({
      query: (product) => ({
        url: `/${product}`,
        method: 'POST',
        body: product
      })
    })
  })
});

export const { useFetchAppProductsQuery, useFethAppProductQuery, useFethAppAddProductQuery } =
  productApi;
