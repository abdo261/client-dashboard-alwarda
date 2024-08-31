import { configureStore } from "@reduxjs/toolkit";
import { centreReducer } from "./slices/centreSlice";
import { userReducer } from "./slices/userSlice";
import { authReducer } from "./slices/authSlice";
import { levelReducer } from "./slices/levelSlice";
const store = configureStore({
  reducer: {
    centre: centreReducer,
    level: levelReducer,
    user:userReducer,
    auth:authReducer
  },
});
export default store;
