import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersAPI } from '../services/api';

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, { rejectWithValue }) => {
  try { return await ordersAPI.getAll(); }
  catch (e) { return rejectWithValue(e.message || 'Failed to fetch orders'); }
});

export const fetchOrderById = createAsyncThunk('orders/fetchById', async (id, { rejectWithValue }) => {
  try { return await ordersAPI.getById(id); }
  catch (e) { return rejectWithValue(e.message || 'Order not found'); }
});

export const createOrder = createAsyncThunk('orders/create', async (data, { rejectWithValue }) => {
  try { return await ordersAPI.create(data); }
  catch (e) { return rejectWithValue(e.message || 'Failed to create order'); }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { items: [], current: null, loading: false, error: null },
  reducers: { clearCurrentOrder: s => { s.current = null; } },
  extraReducers: b => {
    b.addCase(fetchOrders.pending,   s => { s.loading = true;  s.error = null; });
    b.addCase(fetchOrders.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; });
    b.addCase(fetchOrders.rejected,  (s, a) => { s.loading = false; s.error = a.payload; });
    b.addCase(fetchOrderById.pending,   s => { s.loading = true;  s.error = null; });
    b.addCase(fetchOrderById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; });
    b.addCase(fetchOrderById.rejected,  (s, a) => { s.loading = false; s.error = a.payload; });
    b.addCase(createOrder.fulfilled, (s, a) => { s.items = [a.payload, ...s.items]; });
  },
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
