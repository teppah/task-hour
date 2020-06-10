import TaskView from "components/TaskView";
import Task from "data/Task";
type Props = { task?: Task };

const TimeSlice = ({ task }: Props) => {
  return (
    <div>
      {task && <TaskView task={task} />}
      <style jsx>{`
        div {
          @apply w-full h-8;
          @apply border border-gray-200;
        }
      `}</style>
    </div>
  );
};

export default TimeSlice;
