import TimeSlice from "components/summary/TimeSlice";
import { getDayName } from "lib/client/dates";
import { addDays, getDate, isSameDay, addHours, isValid } from "date-fns";
import { useSelector } from "react-redux";
import {
  selectWeekStartDate,
  selectSelectedDate,
} from "lib/client/redux/slice/dateSlice";
import useDay from "lib/client/hooks/use-day";
type Props = {
  day: number;
};

const DayView = ({ day }: Props) => {
  const currentWeekDate = useSelector(selectWeekStartDate);
  const selectedDate = useSelector(selectSelectedDate);

  const currentDate = addDays(currentWeekDate, day);
  const currentDayDate = isValid(currentDate) ? getDate(currentDate) : "";

  const isItToday = isSameDay(currentDate, selectedDate);

  const { slices, isLoading, isError, mutateDay } = useDay(currentDate);

  const dayName = getDayName(day);
  return (
    <section className="day-view">
      <div className="day">
        <h1 key={0}>{currentDayDate}</h1>
        <h1 key={1}>{dayName}</h1>
      </div>
      {[...Array(24).keys()].map((i) => {
        const currentHour = addHours(currentDate, i);
        // For now, assume there is only one task per hour
        const foundTask = isLoading || isError ? null : slices[i];
        return (
          <TimeSlice
            taskId={foundTask?.taskId}
            currentHour={currentHour}
            mutateDay={mutateDay}
            key={i}
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
