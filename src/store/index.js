import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authReducer';
import counterReducer from '../features/counter/counterSlice';

const index = configureStore({
  reducer: {
    authReducer,
    counterReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export default index;
