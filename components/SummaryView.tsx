import DayView from "components/DayView";
import range from "lodash/range";
import { isSameWeek } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWeekStartDate,
  selectSelectedView,
} from "data/redux/slice/dateSlice";
import { selectTasks, setCurrentTaskIds } from "data/redux/slice/taskSlice";
import { getDaysFromView } from "util/dates";

type Props = {};
const SummaryView = ({}: Props) => {
  const dispatch = useDispatch();
  const selectedView = useSelector(selectSelectedView);
  const currentWeek = useSelector(selectWeekStartDate);
  const tasks = useSelector(selectTasks);
  const days = getDaysFromView(selectedView);

  // have to update the filteredIds every time a taskdate updates because
  // one task might change week, and filteredids has to reflect that

  // long future TODO: do not rerender the whole view on each date change, but only the
  // individual days
  const filteredIds = tasks
    .filter((task) => {
      const taskDate = task.date;
      return isSameWeek(currentWeek, taskDate);
    })
    .map((task) => task.taskId);
  dispatch(setCurrentTaskIds(filteredIds));

  return (
    <section className="summary-view">
      <div className="time-col">
        <div></div>
        <div></div>
        {range(24).map((i) => (
          <div>{i}</div>
        ))}
      </div>
      {days.map((day) => (
        <DayView day={day} />
      ))}
      <style jsx>{`
        .summary-view {
          @apply flex flex-row;
          @apply h-full w-full;
        }
        .time-col {
          @apply flex flex-col;
          @apply flex-none h-full;
        }
        .time-col > div:first-child {
          @apply h-5;
        }
        .time-col > div {
          @apply text-center;
          @apply mx-2;
          @apply h-8;
        }
      `}</style>
    </section>
  );
};
export default SummaryView;
