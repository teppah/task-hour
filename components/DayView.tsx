import TimeSlice from "components/TimeSlice";
import Task from "data/types/Task";
import { PullstateCore } from "data/pullstate/PullstateCore";
import { range, capitalize } from "lodash";
import { getDayName } from "util/dates";
import {
  addDays,
  getDate,
  isSameDay,
  compareAsc,
  isSameHour,
  addHours,
} from "date-fns";
type Props = {
  day: number;
};

const DayView = ({ day }: Props) => {
  // 1. read the currentWeek here
  // 2. get an array of all the tasks that need to be completed during this
  //    week based on the date
  // 3. sort the array by date DESCENDING
  // 4. go through each hour: when task is between timesliceHour and
  //    timesliceHour + 1, pass the task TimeSlice
  // 5. TODO: array.pop() to reduce array size;
  const dayName = capitalize(getDayName(day));
  const { DateStore, CurrentTaskStore } = PullstateCore.useStores();
  const currentWeekDate = DateStore.useState((s) => s.currentWeekDate);
  const currentDate = addDays(currentWeekDate, day);
  const currentDayDate = getDate(currentDate);

  const weekTasks = CurrentTaskStore.useState((s) => s.currentTasks);
  const tasks = weekTasks.filter((task) => {
    return isSameDay(currentDate, task.date);
  });

  return (
    <section className="day-view">
      <h1>{currentDayDate}</h1>
      <h1>{dayName}</h1>
      {range(24).map((i) => {
        const foundTasks = tasks.filter((t) =>
          isSameHour(t.date, addHours(currentDate, i))
        );
        // For now, assume there is only one task per hour
        return (
          <TimeSlice task={foundTasks.length > 0 ? foundTasks[0] : null} />
        );
      })}
      <style jsx>{`
        .day-view {
          @apply flex flex-col items-center;
          @apply h-full w-full;
          @apply border border-dashed border-blue-400;
        }
        h1 {
          @apply h-8;
        }
      `}</style>
    </section>
  );
};
export default DayView;
