import { useSelector, useDispatch } from "react-redux";
import {
  selectTaskById,
  selectSelectedTaskId,
  setSelectedTaskId,
  setTaskCompletionStatus,
} from "data/redux/slice/taskSlice";
import { useDrag } from "react-dnd";
import React, { useState } from "react";
import ItemTypes from "data/drag/ItemTypes";
import taskStyles from "css/Task.module.css";
import classNames from "classnames";

type Props = {
  taskId: string;
};
const ListTaskView = ({ taskId }: Props) => {
  const task = useSelector(selectTaskById(taskId));
  const selectedTaskId = useSelector(selectSelectedTaskId);
  const isActive = taskId === selectedTaskId;
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(task.isComplete);
  const [{}, drag] = useDrag({
    item: {
      type: ItemTypes.TASK,
      taskId,
    },
    collect: (monitor) => ({}),
  });
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSelectedTaskId(taskId));
  };
  const divName = classNames({
    [`${taskStyles.task}`]: true,
    [`${taskStyles.selected}`]: isActive,
  });

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    dispatch(setTaskCompletionStatus({ taskId, isComplete: target.checked }));
  };
  const isComplete = task.isComplete;
  return (
    <div className={divName} ref={drag} onClick={handleClick}>
      <input
        className="check"
        type="checkbox"
        name="isComplete"
        checked={isComplete}
        onChange={handleCheck}
      />
      <h1>{task.title}</h1>
      <style jsx>{`
        div:first-of-type {
          @apply border-t;
        }
        div {
          @apply w-full h-full;
          @apply h-10 p-1;
          @apply border-b border-l border-r border-gray-800;
          @apply cursor-pointer;
          @apply flex flex-row items-center;
        }
        h1 {
        }
        .check {
          @apply mx-2;
        }
      `}</style>
    </div>
  );
};
export default ListTaskView;
