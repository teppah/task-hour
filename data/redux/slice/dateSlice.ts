import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// what this contain
// selectedWeekStart: week selected in calendar that starts the week
// (future)
// selectedDay: selected day in calendar
const dateSlice = createSlice({
  name: "dates",
  initialState: {
    weekStartDate: new Date(),
  },
  reducers: {
    // make sure to return the sunday start date
    setWeekStart: (state, action: PayloadAction<Date>) => {
      state.weekStartDate = action.payload;
    },
  },
});

interface DateState {
  weekStartDate: Date;
}

export const selectWeekStartDate = (state: DateState) => state.weekStartDate;
export const { setWeekStart } = dateSlice.actions;
export default dateSlice.reducer;
