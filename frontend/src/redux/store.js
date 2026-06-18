import { configureStore } from "@reduxjs/toolkit";
import cartReaducer from "../redux/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReaducer,
  },
});

export default store;
