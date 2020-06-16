import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getTasks from "data/get-tasks";
import Task from "data/Task";
import { RootState } from "../store";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: getTasks(),
    currentViewTasks: [],
    selectedTask: null,
  },
  reducers: {
    setCurrentTasks: (state, action: PayloadAction<Task[]>) => {
      state.currentViewTasks = action.payload;
    },
    setSelectedTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
// TODO: fix automatic type inference
export const selectCurrentTasks = (state: RootState): Task[] =>
  state.tasks.currentViewTasks;
export const selectSelectedTask = (state: RootState): Task =>
  state.tasks.selectedTask;
export const { setCurrentTasks, setSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
