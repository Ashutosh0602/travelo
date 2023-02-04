import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./state";

const dataStore = configureStore({
  reducer: { userProfile: userSlice },
});

export default dataStore;
