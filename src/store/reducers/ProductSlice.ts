import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
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

export const productSlice: Slice<ProductState> = createSlice({
  name: 'product',
  initialState,
  reducers: {
    add(state, action: PayloadAction<IProduct>) {
      state.products.push(action.payload);
    },
    addProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    }
  }
});

export default productSlice.reducer;
export const { add, addProducts } = productSlice.actions;
