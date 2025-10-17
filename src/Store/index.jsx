import { configureStore } from "@reduxjs/toolkit";
import Slices from "./Slices";

const store = configureStore({
  reducer: {
    main: Slices,
  },
});

export default store;
