import TimeSlice from "components/TimeSlice";
import Task from "data/Task";
import range from "lodash/range";
import capitalize from "lodash/capitalize";
import { getDayName } from "util/dates";
import {
  addDays,
  getDate,
  isSameDay,
  isSameHour,
  addHours,
  isToday,
} from "date-fns";
import { useSelector } from "react-redux";
import {
  selectWeekStartDate,
  selectSelectedDate,
} from "data/redux/slice/dateSlice";
import { selectCurrentTaskIds, selectTasks } from "data/redux/slice/taskSlice";
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
  const currentWeekDate = useSelector(selectWeekStartDate);
  const currentDate = addDays(currentWeekDate, day);
  const currentDayDate = getDate(currentDate);

  const selectedDate = useSelector(selectSelectedDate);
  const isItToday = isSameDay(currentDate, selectedDate);

  const weekTasks = useSelector(selectCurrentTaskIds);
  const allTasks = useSelector(selectTasks);

  // TODO: do not call allTasks.find() twice
  const dayTasks = weekTasks
    .filter((taskId) => {
      const foundTask = allTasks.find((t) => t.taskId === taskId);
      return isSameDay(currentDate, foundTask.startDate);
    }) // map to find task by id
    .map((taskId) => allTasks.find((t) => t.taskId === taskId));

  return (
    <section className="day-view">
      <h1>{currentDayDate}</h1>
      <h1>{dayName}</h1>
      {range(24).map((i) => {
        const currentHour = addHours(currentDate, i);
        const foundTasks = dayTasks.find((t) =>
          isSameHour(t.startDate, currentHour)
        );
        // For now, assume there is only one task per hour
        return (
          <TimeSlice
            taskId={foundTasks ? foundTasks.taskId : null}
            currentHour={currentHour}
          />
        );
      })}
      <style jsx>{`
        .day-view {
          @apply flex flex-col items-center;
          @apply flex-no-wrap;
          @apply w-full;
          @apply border-l border-blue-400;
        }
        .day-view:last-of-type {
          @apply border-r;
        }
        h1 {
          @apply h-8;
          @apply flex-none;
        }
      `}</style>
      <style jsx>{`
        .day-view {
          background-color: ${isItToday ? "#feebc8" : "inherit"};
        }
      `}</style>
    </section>
  );
};
export default DayView;
