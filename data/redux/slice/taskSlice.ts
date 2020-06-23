import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getTasks from "data/get-tasks";
import Task from "data/Task";
import { RootState } from "../store";
import remove from "lodash/remove";

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
        payload.date && (task.startDate = payload.date);
        payload.title && (task.title = payload.title);
        payload.description && (task.description = payload.description);
      }
    },
    changeTaskDate: (
      state,
      action: PayloadAction<{ taskId: string; date: Date }>
    ) => {
      state.tasks.find((t) => t.taskId === action.payload.taskId).startDate =
        action.payload.date;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      remove(state.tasks, (t) => t.taskId === action.payload);
    },
  },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
// TODO: fix automatic type inference
export const selectCurrentTaskIds = (state: RootState): string[] =>
  state.tasks.currentViewTaskIds;
export const selectSelectedTaskId = (state: RootState): string =>
  state.tasks.selectedTaskId;
export const selectTaskById = (taskId: string) => (state: RootState) =>
  state.tasks.tasks.find((t) => t.taskId === taskId);
export const selectDatelessTasks = (state: RootState) =>
  state.tasks.tasks.filter((t) => !t.startDate);
export const {
  setCurrentTaskIds,
  setSelectedTaskId,
  updateTaskIfExist,
  changeTaskDate,
  addTask,
  deleteTask,
} = taskSlice.actions;
export default taskSlice.reducer;
