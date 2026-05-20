import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:            JSON.parse(localStorage.getItem('babafly_user') || 'null'),
  token:           localStorage.getItem('babafly_token') || null,
  isAuthenticated: !!localStorage.getItem('babafly_token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload: { user, token } }) {
      state.user            = user;
      state.token           = token;
      state.isAuthenticated = true;
      localStorage.setItem('babafly_token', token);
      localStorage.setItem('babafly_user', JSON.stringify(user));
    },
    logout(state) {
      state.user            = null;
      state.token           = null;
      state.isAuthenticated = false;
      localStorage.removeItem('babafly_token');
      localStorage.removeItem('babafly_user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
