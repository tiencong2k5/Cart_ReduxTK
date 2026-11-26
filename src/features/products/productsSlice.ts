import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isProduct, type Product } from './types'

export type ProductsStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

interface ProductsState {
  items: Product[]
  status: ProductsStatus
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string; state: { products: ProductsState } }
>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    const response = await fetch('https://fakestoreapi.com/products')

    if (!response.ok) {
      return rejectWithValue(`Không thể tải sản phẩm (HTTP ${response.status}).`)
    }

    const data: unknown = await response.json()
    if (!Array.isArray(data) || !data.every(isProduct)) {
      return rejectWithValue('Dữ liệu sản phẩm từ máy chủ không hợp lệ.')
    }

    return data
  },
  {
    condition: (_, { getState }) => getState().products.status !== 'loading',
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ?? action.error.message ?? 'Đã xảy ra lỗi khi tải sản phẩm.'
      })
  },
})

export default productsSlice.reducer
