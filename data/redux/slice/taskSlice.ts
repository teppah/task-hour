import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getTasks from "data/get-tasks";
import Task from "data/Task";
import { RootState } from "../store";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: getTasks(),
    currentViewTaskIds: [],
    selectedTaskId: null,
  },
  reducers: {
    setCurrentTaskIds: (state, action: PayloadAction<string[]>) => {
      state.currentViewTaskIds = action.payload;
    },
    setSelectedTaskId: (state, action: PayloadAction<string>) => {
      state.selectedTaskId = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
// TODO: fix automatic type inference
export const selectCurrentTaskIds = (state: RootState): string[] =>
  state.tasks.currentViewTaskIds;
export const selectSelectedTask = (state: RootState): string =>
  state.tasks.selectedTaskId;
export const { setCurrentTaskIds, setSelectedTaskId } = taskSlice.actions;
export default taskSlice.reducer;
