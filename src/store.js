import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import counterReducer from './features/counter/counterSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;
