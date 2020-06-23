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
  const [{ isTaskDragging }, dragTask] = useDrag({
    item: {
      type: ItemTypes.TASK,
      taskId,
    },
    collect: (monitor) => ({ isTaskDragging: !!monitor.isDragging() }),
  });

  const [{}, dragHandle] = useDrag({
    item: {
      type: ItemTypes.DRAG_HANDLE,
      taskId,
    },
    collect: (monitor) => ({}),
  });

  const selectedTaskId = useSelector(selectSelectedTaskId);
  const isActive = selectedTaskId && selectedTaskId === taskId;

  const dispatch = useDispatch();
  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(setSelectedTaskId(taskId));
  };

  return (
    <div className="task">
      <section
        className={isActive ? "selected" : ""}
        ref={dragTask}
        onClick={clickHandler}
      >
        <h1>{title}</h1>
      </section>
      <div className="resize-handler" ref={dragHandle}>
        {" "}
      </div>
      <style jsx>{`
        .task {
          @apply flex flex-col h-full w-full;
          @apply bg-gray-400;
        }
        section {
          @apply flex-1;
          @apply cursor-pointer;
        }
        h1 {
          @apply text-sm;
        }
        section::active {
          @apply bg-gray-500;
        }
        .selected {
          @apply bg-gray-600;
        }
        div.resize-handler {
          height: 0.35rem;
          @apply border border-black w-full;
          cursor: ns-resize;
        }
      `}</style>
    </div>
  );
};

export default TaskView;
