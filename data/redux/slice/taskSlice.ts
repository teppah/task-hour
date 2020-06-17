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
    updateTaskIfExist: (
      state,
      action: PayloadAction<{
        id: string;
        title?: string;
        description?: string;
        date?: Date;
      }>
    ) => {
      const payload = action.payload;
      const { id } = payload;
      const task = state.tasks.find((t) => t.taskId === id);
      if (task) {
        console.log(id);
        console.log(payload.id);
        payload.date && (task.date = payload.date);
        payload.title && (task.title = payload.title);
        payload.description && (task.description = payload.description);
      }
      console.log(task);
    },
  },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
// TODO: fix automatic type inference
export const selectCurrentTaskIds = (state: RootState): string[] =>
  state.tasks.currentViewTaskIds;
export const selectSelectedTaskId = (state: RootState): string =>
  state.tasks.selectedTaskId;
export const {
  setCurrentTaskIds,
  setSelectedTaskId,
  updateTaskIfExist,
} = taskSlice.actions;
export default taskSlice.reducer;
