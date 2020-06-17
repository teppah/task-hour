import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { startOfWeek, startOfDay } from "date-fns";

// what this contain
// selectedWeekStart: week selected in calendar that starts the week
// (future)
// selectedDay: selected day in calendar
const now = new Date();
const dateSlice = createSlice({
  name: "dates",
  initialState: {
    weekStartDate: startOfWeek(now),
    selectedDate: startOfDay(now),
  },
  reducers: {
    // make sure to return the sunday start date
    setWeekStart: (state, action: PayloadAction<Date>) => {
      state.weekStartDate = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const selectWeekStartDate = (state: RootState) =>
  state.dates.weekStartDate;
export const selectSelectedDate = (state: RootState) =>
  state.dates.selectedDate;
export const { setWeekStart, setSelectedDate } = dateSlice.actions;
export default dateSlice.reducer;
