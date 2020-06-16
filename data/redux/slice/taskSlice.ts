import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getTasks from "data/get-tasks";
import Task from "data/Task";
import { RootState } from "../store";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: getTasks(),
    currentViewTasks: [],
    selectedTaskId: null,
  },
  reducers: {
    setCurrentTasks: (state, action: PayloadAction<Task[]>) => {
      state.currentViewTasks = action.payload;
    },
    setSelectedTaskId: (state, action: PayloadAction<string>) => {
      state.selectedTaskId = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
// TODO: fix automatic type inference
export const selectCurrentTasks = (state: RootState): Task[] =>
  state.tasks.currentViewTasks;
export const selectSelectedTask = (state: RootState): string =>
  state.tasks.selectedTaskId;
export const { setCurrentTasks, setSelectedTaskId } = taskSlice.actions;
export default taskSlice.reducer;
