import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/productSlice";

const reducer = combineReducers({
  userState: userReducer,
  authState: authReducer,
  productsState: productsReducer,
  productState: productReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
