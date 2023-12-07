import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false
}

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    createToken: (state, action) => {
      localStorage.setItem('authToken', action.payload);

      state.token = action.payload;
      state.isAuthenticated = true;
    },
    destroyToken: (state, action) => {
      localStorage.removeItem('authToken');

      state.token = null;
      state.isAuthenticated = false;
    }
  }
});

export const {
  createToken, destroyToken
} = authSlice.actions;
export default authSlice.reducer;
