import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getTasks from "data/get-tasks";
import Task from "data/Task";

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
interface TaskState {
  tasks: Task[];
  currentViewTasks: Task[];
}

export const selectTasks = (state: TaskState) => state.tasks;
export const selectCurrentTasks = (state: TaskState) => state.currentViewTasks;
export const { setCurrentTasks } = taskSlice.actions;
export default taskSlice.reducer;
