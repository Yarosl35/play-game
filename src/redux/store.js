import { configureStore } from "@reduxjs/toolkit";
import reducer from "./feature/reducer";

export const store = configureStore({
  reducer: reducer,
});
