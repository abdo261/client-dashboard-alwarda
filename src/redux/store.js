import { configureStore } from "@reduxjs/toolkit";
import { centreReducer } from "./slices/centreSlice";
import { userReducer } from "./slices/userSlice";
import { authReducer } from "./slices/authSlice";
import { levelReducer } from "./slices/levelSlice";
import { studentReducer } from "./slices/studentSlice";
const store = configureStore({
  reducer: {
    centre: centreReducer,
    level: levelReducer,
    user:userReducer,
    auth:authReducer,
    student:studentReducer
  },
});
export default store;
