import dynamic from "next/dynamic";
// use dynamic import to prevent statically generated styles from applying
const DayView = dynamic(() => import("components/summary/DayView"));
import range from "lodash/range";
import { isSameWeek } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWeekStartDate,
  selectSelectedView,
} from "data/redux/slice/dateSlice";
import { selectTasks, setCurrentTaskIds } from "data/redux/slice/taskSlice";
import { getDaysFromView } from "util/dates";
import classNames from "classnames";
import containerStyles from "css/Container.module.css";

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
      const taskDate = task.startDate;
      return isSameWeek(currentWeek, taskDate);
    })
    .map((task) => task.taskId);
  dispatch(setCurrentTaskIds(filteredIds));

  const sectionName = classNames({
    "summary-view": true,
    [`${containerStyles.container}`]: true,
  });
  return (
    <section className={sectionName}>
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
          @apply items-start;
        }
        .time-col {
          @apply flex flex-col;
          @apply items-end;
        }
        .time-col > div {
          @apply text-center;
          @apply h-12;
          @apply mr-4;
          @apply flex-none;
        }
        .time-col > div:first-child {
          @apply h-3;
        }
      `}</style>
    </section>
  );
};
export default SummaryView;
