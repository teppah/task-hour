import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    selectedTaskId: null,
  },
  reducers: {
    setSelectedTaskId: (state, action: PayloadAction<string>) => {
      state.selectedTaskId = action.payload;
    },
  },
});

export const selectSelectedTaskId = (state: RootState): string =>
  state.tasks.selectedTaskId;
export const { setSelectedTaskId } = taskSlice.actions;
export default taskSlice.reducer;
