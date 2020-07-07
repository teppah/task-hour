import { useDrag } from "react-dnd";
import Task from "lib/Task";
import ItemTypes from "lib/drag/ItemTypes";
import { useSelector, useDispatch } from "react-redux";
import taskStyles from "css/Task.module.css";
import {
  selectSelectedTaskId,
  setSelectedTaskId,
  selectTasks,
} from "lib/redux/slice/taskSlice";
import classNames from "classnames";

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

  const taskClass = classNames({
    [`${taskStyles.task}`]: true,
    [`${taskStyles.selected}`]: isActive,
    [`${taskStyles.completed}`]: task.isComplete,
    task: true,
  });

  return (
    <div className={taskClass}>
      <section ref={dragTask} onClick={clickHandler}>
        <h1>{title}</h1>
      </section>
      <div className="resize-handler" ref={dragHandle}></div>
      <style jsx>{`
        div {
          @apply flex flex-col w-11/12;
          height: 92%;
        }
        .task {
          @apply px-1 pt-1;
          @apply rounded-md;
        }
        section {
          @apply flex-1;
          @apply cursor-pointer;
          background-color: inherit;
        }
        h1 {
          @apply text-xs;
        }
        div.resize-handler {
          height: 0.35rem;
          @apply border border-black;
          @apply w-full;
          cursor: ns-resize;
        }
      `}</style>
    </div>
  );
};

export default TaskView;
