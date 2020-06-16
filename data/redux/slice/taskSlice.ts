import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getTasks from "data/get-tasks";
import Task from "data/Task";
import { RootState } from "../store";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: getTasks(),
    currentViewTasks: [],
  },
  reducers: {
    setCurrentTasks: (state, action: PayloadAction<Task[]>) => {
      state.currentViewTasks = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectCurrentTasks = (state: RootState) =>
  state.tasks.currentViewTasks;
export const { setCurrentTasks } = taskSlice.actions;
export default taskSlice.reducer;
