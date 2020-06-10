import { useDrag } from "react-dnd";
import Task from "data/Task";
import ItemTypes from "components/drag/ItemTypes";
type Props = {
  task: Task;
};

const TaskView = ({ task }: Props) => {
  const { title, description } = task;
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.TASK },
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
