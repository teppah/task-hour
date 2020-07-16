import { useDrag } from "react-dnd";
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
import Tippy from "@tippyjs/react";
import DetailedTaskView from "components/DetailedTaskView";

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
        setTimeout(() => {
          mutatePreviousDay();
        }, 1500);
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
    return <div></div>;
  }
  if (isError) {
    console.log(`error in loading task ${taskId}: ${JSON.stringify(isError)}`);
    return <div>error</div>;
  }
  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(setSelectedTaskId(taskId));
  };

  const isComplete = task.isComplete;
  const taskClass = classNames({
    [`${taskStyles.task}`]: true,
    [`${taskStyles.selected}`]: isActive,
    [`${taskStyles.completed}`]: isComplete,
    task: true,
  });

  const hoursDifference = differenceInHours(task.endDate, task.startDate);
  const remsToAdd = (hoursDifference - 1) * 3;

  return (
    <Tippy
      content={<DetailedTaskView taskId={taskId} />}
      placement="right"
      interactive={true}
      theme="light"
      visible={isActive}
      // doesn't need trigger=click and hideOnClick=true since visibility is controlled by
      // the component (isActive computed state) and the component's click handler
      onClickOutside={(instance, event) => {
        dispatch(setSelectedTaskId(null));
      }}
    >
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
    </Tippy>
  );
};

export default TaskView;
