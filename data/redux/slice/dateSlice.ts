import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { startOfWeek } from "date-fns";

// what this contain
// selectedWeekStart: week selected in calendar that starts the week
// (future)
// selectedDay: selected day in calendar
const dateSlice = createSlice({
  name: "dates",
  initialState: {
    weekStartDate: startOfWeek(new Date()),
  },
  reducers: {
    // make sure to return the sunday start date
    setWeekStart: (state, action: PayloadAction<Date>) => {
      state.weekStartDate = action.payload;
    },
  },
});

export const selectWeekStartDate = (state: RootState) =>
  state.dates.weekStartDate;
export const { setWeekStart } = dateSlice.actions;
export default dateSlice.reducer;
