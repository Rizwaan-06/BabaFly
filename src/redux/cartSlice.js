import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart(state, { payload }) {
      const exists = state.items.find(i => i.id === payload.id);
      if (!exists) state.items.push({ ...payload, qty: 1 });
    },
    removeFromCart(state, { payload }) {
      state.items = state.items.filter(i => i.id !== payload);
    },
    updateQty(state, { payload: { id, qty } }) {
      const item = state.items.find(i => i.id === id);
      if (item) {
        if (qty <= 0) state.items = state.items.filter(i => i.id !== id);
        else item.qty = qty;
      }
    },
    clearCart(state) { state.items = []; },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;
export const selectCartCount = s => s.cart.items.reduce((t, i) => t + i.qty, 0);
export const selectCartTotal = s => s.cart.items.reduce((t, i) => t + i.charterRate * i.qty, 0);
export default cartSlice.reducer;
