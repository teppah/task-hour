import TaskView from "components/TaskView";
import Task from "data/Task";
import { useDrop } from "react-dnd";
import ItemTypes from "./drag/ItemTypes";

type Props = { task?: Task };
const TimeSlice = ({ task }: Props) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: () => alert("hi"),
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });
  return (
    <div>
      {task && <TaskView task={task} />}
      {isOver && <h1>over</h1>}
      <style jsx>{`
        div {
          @apply w-full h-8;
          @apply border border-gray-200;
          ${isOver && "@apply bg-red-400;"}
        }
      `}</style>
    </div>
  );
};

export default TimeSlice;
