import TimeSlice from "components/summary/TimeSlice";
import range from "lodash/range";
import capitalize from "lodash/capitalize";
import { getDayName } from "lib/dates";
import { addDays, getDate, isSameDay, addHours, isValid } from "date-fns";
import { useSelector } from "react-redux";
import {
  selectWeekStartDate,
  selectSelectedDate,
} from "lib/redux/slice/dateSlice";
import useDay from "lib/hooks/use-day";
type Props = {
  day: number;
};

const DayView = ({ day }: Props) => {
  const dayName = capitalize(getDayName(day));

  const currentWeekDate = useSelector(selectWeekStartDate);
  const selectedDate = useSelector(selectSelectedDate);

  const currentDate = addDays(currentWeekDate, day);
  const currentDayDate = getDate(currentDate);

  const isItToday = isSameDay(currentDate, selectedDate);

  const { slices, isLoading, isError, mutateDay } = useDay(currentDate);
  if (isLoading || !isValid(currentWeekDate) || !isValid(selectedDate)) {
    return <div>loading...</div>;
  }
  return (
    <section className="day-view">
      <div className="day">
        <h1>{currentDayDate}</h1>
        <h1>{dayName}</h1>
      </div>
      {range(24).map((i) => {
        const currentHour = addHours(currentDate, i);
        const foundTask = slices ? slices[i] : null;
        // For now, assume there is only one task per hour
        return (
          <TimeSlice
            taskId={foundTask?.taskId}
            currentHour={currentHour}
            mutateDay={mutateDay}
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
        div.day {
          @apply sticky;
          top: 0;
          @apply flex flex-col items-center justify-center;
          @apply w-full bg-gray-300 mb-1;
          @apply border-t border-b border-blue-500;
        }
        h1 {
          @apply h-8;
          @apply flex-none;
        }
      `}</style>
      <style jsx>{`
        .day-view {
          background-color: ${isItToday ? "#ebf8ff" : "inherit"};
        }
      `}</style>
    </section>
  );
};
export default DayView;
