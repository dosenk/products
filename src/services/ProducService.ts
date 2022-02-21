import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IProduct } from '../models/IProduct';

interface IData {
  data: IProduct;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/products'
  }),
  tagTypes: ['Delete'],
  endpoints: (build) => ({
    fetchAppProducts: build.query<IProduct[], ''>({
      query: () => ({
        url: '/'
      }),
      providesTags: (result) => ['Delete']
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
      }),
      invalidatesTags: ['Delete']
    })
  })
});

export const {
  useFetchAppProductsQuery,
  useFetchAppProductQuery,
  useAddProductMutation,
  useDeleteProductMutation
} = productApi;
export const saveProducts = (products: IProduct[] | undefined): void => {
  localStorage.setItem('serverProducts', JSON.stringify(products));
};

const editProduct = (id: number, prodArr: IProduct[], product: IProduct): void => {
  prodArr.forEach((productItem: IProduct, index: number) => {
    if (productItem.id === id) {
      prodArr[index] = { ...product, id: id > 20 ? product.id : id };
    }
  });
  localStorage.setItem(id > 20 ? 'products' : 'serverProducts', JSON.stringify(prodArr));
};

export const saveProduct = (product: IProduct, id: number): void => {
  const prodArr = JSON.parse(localStorage.getItem('products') ?? '[]');
  const recivedProduct = JSON.parse(localStorage.getItem('serverProducts') ?? '[]');

  if (!prodArr.length && !id) {
    localStorage.setItem('products', JSON.stringify([product]));
    return;
  }
  if (id) {
    const db =
      recivedProduct.findIndex((item: IProduct) => item.id === id) >= 0 ? recivedProduct : prodArr;
    editProduct(id, db, product);
    return;
  } else {
    const lastId = prodArr[prodArr.length - 1].id;
    prodArr.push({ ...product, id: lastId + 1 });
  }
  localStorage.setItem('products', JSON.stringify(prodArr));
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

export const getProduct = (id: string): any => {
  const products = JSON.parse(localStorage.getItem('products') ?? '[]');
  const recivedProduct = JSON.parse(localStorage.getItem('serverProducts') ?? '[]');
  const allProducts = [...products, ...recivedProduct];
  return allProducts.filter((item) => item.id === id);
};
