import { useDrag } from "react-dnd";
import Task from "data/Task";
import ItemTypes from "components/drag/ItemTypes";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedTaskId,
  setSelectedTaskId,
  selectTasks,
} from "data/redux/slice/taskSlice";

type Props = {
  taskId: string;
};

const TaskView = ({ taskId }: Props) => {
  const allTasks = useSelector(selectTasks);
  // TODO: optimize this call to only return the task title from the selectors to
  // avoid unnecessary re-rendering of component when description/date is updated
  const task = allTasks.find((t) => t.taskId === taskId);
  const { title } = task;
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.TASK,
      taskId: taskId,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const selectedTaskId = useSelector(selectSelectedTaskId);
  const isActive = selectedTaskId && selectedTaskId === taskId;

  const dispatch = useDispatch();
  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(setSelectedTaskId(taskId));
  };

  return (
    <section
      className={isActive ? "selected" : ""}
      ref={drag}
      onClick={clickHandler}
    >
      <h1>{title}</h1>
      <style jsx>{`
        section {
          @apply h-full w-full;
          @apply bg-gray-400;
          @apply cursor-pointer;
        }
        section:active {
          @apply bg-gray-500;
        }
        .selected {
          @apply bg-gray-600;
        }
      `}</style>
    </section>
  );
};

export default TaskView;
