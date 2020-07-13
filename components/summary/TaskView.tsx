import { useDrag } from "react-dnd";
import Task from "lib/Task";
import ItemTypes from "lib/drag/ItemTypes";
import { useSelector, useDispatch } from "react-redux";
import taskStyles from "css/Task.module.css";
import {
  selectSelectedTaskId,
  setSelectedTaskId,
} from "lib/redux/slice/taskSlice";
import classNames from "classnames";
import useTask from "lib/hooks/use-task";
import { differenceInHours } from "date-fns";
import { parseISO } from "date-fns";

type Props = {
  taskId: string;
  mutatePreviousDay: any;
};

const TaskView = ({ taskId, mutatePreviousDay }: Props) => {
  const { task, isLoading, isError } = useTask(taskId);
  const [{ isTaskDragging }, dragTask] = useDrag({
    item: {
      type: ItemTypes.TASK,
      taskId,
    },
    collect: (monitor) => ({ isTaskDragging: !!monitor.isDragging() }),
    begin: (monitor) => {},
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        // if successfully dropped in a compatible target,
        // force mutation of the day the cell was in before
        mutatePreviousDay();
      }
    },
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
  if (isLoading) {
    console.log(`loading`);
    return <div>loading...</div>;
  }
  if (isError) {
    console.log(`error`);
    return <div>error: {JSON.stringify(isError)}</div>;
  }
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

  const hoursDifference = differenceInHours(task.endDate, task.startDate);
  const remsToAdd = (hoursDifference - 1) * 3;

  return (
    <div className={taskClass}>
      <section ref={dragTask} onClick={clickHandler}>
        <h1>{task.title}</h1>
      </section>
      <div className="resize-handler" ref={dragHandle}></div>
      <style jsx>{`
        div {
          @apply flex flex-col w-11/12;
        }
        .task {
          @apply px-1 pt-1;
          @apply rounded-md;
          height: calc(${remsToAdd}rem + 92%);
          @apply relative;
          @apply z-40;
          @apply cursor-pointer;
        }
        section {
          @apply flex-1;
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
