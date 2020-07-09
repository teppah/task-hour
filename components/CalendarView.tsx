import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedDate,
  setSelectedDate,
  selectWeekStartDate,
  setWeekStart,
} from "lib/redux/slice/dateSlice";
import { isSameDay, isSameWeek, startOfWeek } from "date-fns";
import containerStyles from "css/Container.module.css";

const CalendarView = () => {
  const selectedDate = useSelector(selectSelectedDate);
  const weekStartDate = useSelector(selectWeekStartDate);
  const dispatch = useDispatch();

  return (
    <section className={containerStyles.container}>
      <Calendar
        value={selectedDate}
        onClickDay={(day) => {
          // if did not click on the same week, change week
          if (!isSameWeek(weekStartDate, day)) {
            dispatch(setWeekStart(startOfWeek(day)));
          }
          dispatch(setSelectedDate(day));
        }}
        calendarType={"US"}
      />
      <style jsx>{`
        section {
        }
      `}</style>
      <style jsx global>{`
        p {
          @apply text-purple-500 font-bold;
          @apply h-1;
        }
      `}</style>
    </section>
  );
};
export default CalendarView;
