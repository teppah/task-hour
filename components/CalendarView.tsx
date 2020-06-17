import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedDate,
  setSelectedDate,
} from "data/redux/slice/dateSlice";
import { selectTasks } from "data/redux/slice/taskSlice";
import { isSameDay } from "date-fns";

const CalendarView = () => {
  const selectedDate = useSelector(selectSelectedDate);
  const allTasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  return (
    <section>
      <Calendar
        value={selectedDate}
        onClickDay={(day) => dispatch(setSelectedDate(day))}
        calendarType={"US"}
        tileContent={(props) => {
          const { date } = props;
          const todayTasks = allTasks.filter((t) => isSameDay(t.date, date));
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
