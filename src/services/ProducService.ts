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
    }),
    deleteProduct: build.mutation<IProduct, string>({
      query: (product) => ({
        url: `/${product}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useFetchAppProductsQuery,
  useFetchAppProductQuery,
  useAddProductMutation,
  useDeleteProductMutation
} = productApi;

const editProduct = (id: number, prodArr: IProduct[], product: IProduct): void => {
  prodArr.forEach((productItem: IProduct, index: number) => {
    if (productItem.id === id) {
      prodArr[index] = product;
    }
  });
};
export const saveProduct = (product: IProduct, id: number): void => {
  const products = localStorage.getItem('products');

  if (!products) {
    localStorage.setItem('products', JSON.stringify([product]));
    return;
  }
  const prodArr = JSON.parse(products);
  if (id) {
    editProduct(id, prodArr, product);
  } else {
    const lastId = prodArr[prodArr.length - 1].id;
    prodArr.push({ ...product, id: lastId + 1 });
  }
  localStorage.setItem('products', JSON.stringify(prodArr));
};

export const saveProducts = (products: IProduct[] | undefined): void => {
  localStorage.setItem('serverProducts', JSON.stringify(products));
};

export const deleteProductFromLocaleStorage = (id: number | undefined): void => {
  const products = JSON.parse(localStorage.getItem('products') ?? '[]');
  const recivedProduct = JSON.parse(localStorage.getItem('serverProducts') ?? '[]');
  const allProducts = [...products, ...recivedProduct];
  if (allProducts.length) {
    localStorage.setItem(
      'products',
      JSON.stringify(products.filter((product: IProduct) => product.id !== id))
    );
    localStorage.setItem(
      'serverProducts',
      JSON.stringify(recivedProduct.filter((product: IProduct) => product.id !== id))
    );
  }
};
