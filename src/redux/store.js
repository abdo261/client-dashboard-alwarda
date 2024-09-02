import { configureStore } from "@reduxjs/toolkit";
import { centreReducer } from "./slices/centreSlice";
import { userReducer } from "./slices/userSlice";
import { authReducer } from "./slices/authSlice";
import { levelReducer } from "./slices/levelSlice";
import { subjectReducer } from "./slices/subjectSlice";
const store = configureStore({
  reducer: {
    subject : subjectReducer,
    centre: centreReducer,
    level: levelReducer,
    user:userReducer,
    auth:authReducer
  },
});
export default store;
