import TimeSlice from "components/TimeSlice";
import Task from "data/types/Task";
import { range } from "lodash";
type Props = {
  dayName: string;
};

const DayView = ({ dayName }: Props) => {
  const task: Task = { title: "Test", description: "lol" };
  return (
    <section className="day-view">
      <h1>{dayName}</h1>
      {range(24).map((i) => (
        <TimeSlice task={i % 4 == 0 ? task : null} />
      ))}
      <style jsx>{`
        .day-view {
          @apply flex flex-col items-center;
          @apply h-full w-full;
          @apply border border-dashed border-blue-400;
        }
        h1 {
          @apply h-8;
        }
      `}</style>
    </section>
  );
};
export default DayView;
