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

export const saveProduct = (product: IProduct): void => {
  const products = localStorage.getItem('products');

  if (!products) {
    localStorage.setItem('products', JSON.stringify([product]));
    return;
  }
  const prodArr = JSON.parse(products);
  const lastId = prodArr[prodArr.length - 1].id;
  prodArr.push({ ...product, id: lastId + 1 });
  localStorage.setItem('products', JSON.stringify(prodArr));
};
