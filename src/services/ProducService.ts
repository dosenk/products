import { SerializedError } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { IProduct } from '../models/IProduct';

interface IData {
  data: IProduct;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/products'
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    fetchAppProducts: build.query<IProduct[], ''>({
      query: () => ({
        url: '/'
      }),
      providesTags: (result) => ['Product']
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
      }),
      invalidatesTags: ['Product']
    })
  })
});

export const { useFetchAppProductsQuery, useFetchAppProductQuery, useAddProductMutation } =
  productApi;

export const saveProduct = (
  product: { data: IProduct } | { error: FetchBaseQueryError | SerializedError }
) => {
  const products = localStorage.getItem('products');
  // console.log(product?.data);
};
