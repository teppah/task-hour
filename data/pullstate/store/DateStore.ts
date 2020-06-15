import { Store } from "pullstate";
import { startOfWeek } from "date-fns";

interface IDateStore {
  currentWeekDate: Date;
}

export const DateStore = new Store<IDateStore>({
  currentWeekDate: startOfWeek(new Date()),
});
