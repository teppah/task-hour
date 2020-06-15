import DayView from "components/DayView";
import { PullstateCore } from "data/pullstate/PullstateCore";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import range from "lodash/range";
import { isSameWeek } from "date-fns";

type Props = {};
const SummaryView = ({}: Props) => {
  // 1. read the currentWeek date here
  // 2. update CurrentWeekTasks to contain only the tasks of the current week that
  // pulls data from a centralized AllTasksStore
  // 3. get all the relevant dates and month and display them on the top
  // 4. pass each day's date to every DayView
  const days = [0, 1, 2, 3, 4, 5, 6];

  const { CurrentTaskStore, DateStore, TaskStore } = PullstateCore.useStores();
  const currentWeek = DateStore.useState((s) => s.currentWeekDate);
  const tasks = TaskStore.useState((s) => s.tasks);
  const filtered = tasks.filter((task) => {
    const taskDate = task.date;
    return isSameWeek(currentWeek, taskDate);
  });
  CurrentTaskStore.update((s) => {
    s.currentTasks = filtered;
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
