import TimeSlice from "components/TimeSlice";
import Task from "data/Task";
import { range, capitalize } from "lodash";
import { getDayName } from "util/dates";
import {
  addDays,
  getDate,
  isSameDay,
  isSameHour,
  addHours,
  isToday,
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

  const currentWeekDate = new Date();
  const currentDate = addDays(currentWeekDate, day);
  const currentDayDate = getDate(currentDate);

  const weekTasks = [];
  const dayTasks = weekTasks.filter((task) => {
    return isSameDay(currentDate, task.date);
  });

  return (
    <section className="day-view">
      <h1>{currentDayDate}</h1>
      <h1>{dayName}</h1>
      {range(24).map((i) => {
        const foundTasks = dayTasks.filter((t) =>
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
      <style jsx>{`
        .day-view {
          background-color: ${isToday(currentDate) ? "#feebc8" : "inherit"};
        }
      `}</style>
    </section>
  );
};
export default DayView;
