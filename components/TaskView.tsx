import { useDrag } from "react-dnd";
import Task from "data/types/Task";
import ItemTypes from "components/drag/ItemTypes";

type Props = {
  task: Task;
  setPreviousCurrentTask: any;
};

const TaskView = ({ task, setPreviousCurrentTask }: Props) => {
  const { title, description, taskId } = task;
  const [{ isDragging }, drag] = useDrag({
    // setPrevious: a hack to expose the current cell the TaskView is in to the
    // drop target. that way, on drop, the TimeSlice that is being dropped on
    // can clear the previous cell's content and set the current cell to this
    // task.
    // TODO: REMOVE setPrevious to decouple
    item: {
      type: ItemTypes.TASK,
      setPrevious: setPreviousCurrentTask,
      taskId: taskId,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });
  return (
    <section className="task" ref={drag}>
      <h1>{title}</h1>
      <style jsx>{`
        section {
          @apply h-full w-full;
          @apply bg-gray-400;
        }
      `}</style>
    </section>
  );
};

export default TaskView;