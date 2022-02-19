import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../models/IProduct';

interface ProductState {
  products: IProduct[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: ''
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IProduct>) {
      state.products.push(action.payload);
    }
  }
});

export default productSlice.reducer;
export const { addProduct } = productSlice.actions;
