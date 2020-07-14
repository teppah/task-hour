import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { startOfWeek, startOfDay } from "date-fns";
import { VIEWS } from "lib/dates";

// what this contain
// selectedWeekStart: week selected in calendar that starts the week
// (future)
// selectedDay: selected day in calendar
const weekStartDate: Date = null;
const selectedDate: Date = null;
const dateSlice = createSlice({
  name: "dates",
  initialState: {
    weekStartDate: weekStartDate,
    selectedDate: selectedDate,
    selectedView: VIEWS.FULL_WEEK,
  },
  reducers: {
    // make sure to return the sunday start date
    setWeekStart: (state, action: PayloadAction<Date>) => {
      state.weekStartDate = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload;
    },
    setSelectedView: (state, action: PayloadAction<VIEWS>) => {
      state.selectedView = action.payload;
    },
  },
});

export const selectWeekStartDate = (state: RootState) =>
  state.dates.weekStartDate;
export const selectSelectedDate = (state: RootState) =>
  state.dates.selectedDate;
export const selectSelectedView = (state: RootState) =>
  state.dates.selectedView;
export const {
  setWeekStart,
  setSelectedDate,
  setSelectedView,
} = dateSlice.actions;
export default dateSlice.reducer;
