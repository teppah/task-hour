import DayView from "components/DayView";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import range from "lodash/range";
import { isSameWeek } from "date-fns";

type Props = {};
const SummaryView = ({}: Props) => {
  const days = [0, 1, 2, 3, 4, 5, 6];

  const currentWeek = new Date();
  const tasks = [];
  const filtered = tasks.filter((task) => {
    const taskDate = task.date;
    return isSameWeek(currentWeek, taskDate);
  });

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
};
export default SummaryView;
