import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedDate,
  setSelectedDate,
  selectWeekStartDate,
  setWeekStart,
} from "data/redux/slice/dateSlice";
import { selectTasks } from "data/redux/slice/taskSlice";
import { isSameDay, isSameWeek, startOfWeek } from "date-fns";

const CalendarView = () => {
  const selectedDate = useSelector(selectSelectedDate);
  const weekStartDate = useSelector(selectWeekStartDate);
  const allTasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  return (
    <section>
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
        tileContent={(props) => {
          const { date } = props;
          const todayTasks = allTasks.filter((t) =>
            isSameDay(t.startDate, date)
          );
          return <p>{todayTasks.map((t) => "*")}</p>;
        }}
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
