import { configureStore } from "@reduxjs/toolkit";
import { centreReducer } from "./slices/centreSlice";
import { userReducer } from "./slices/userSlice";
import { authReducer } from "./slices/authSlice";
import { levelReducer } from "./slices/levelSlice";
<<<<<<< HEAD
import { subjectReducer } from "./slices/subjectSlice";
=======
import { studentReducer } from "./slices/studentSlice";
>>>>>>> 3ff2b292e45aff6bb0577f5f8cc301b2b1706b4f
const store = configureStore({
  reducer: {
    subject : subjectReducer,
    centre: centreReducer,
    level: levelReducer,
    user:userReducer,
    auth:authReducer,
    student:studentReducer
  },
});
export default store;
