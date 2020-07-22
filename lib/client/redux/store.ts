import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slice/taskSlice";
import dateReducer from "./slice/dateSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    dates: dateReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
