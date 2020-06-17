import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedDate,
  setSelectedDate,
} from "data/redux/slice/dateSlice";

const CalendarView = () => {
  const selectedDate = useSelector(selectSelectedDate);
  const dispatch = useDispatch();

  return (
    <section>
      <Calendar
        value={selectedDate}
        onClickDay={(day) => dispatch(setSelectedDate(day))}
        locale={"en-US"}
      />
      <style jsx>{`
        section {
        }
      `}</style>
    </section>
  );
};
export default CalendarView;
