import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedTaskId,
  setSelectedTaskId,
} from "lib/redux/slice/taskSlice";
import { useDrag } from "react-dnd";
import React, { useState } from "react";
import ItemTypes from "lib/drag/ItemTypes";
import taskStyles from "css/Task.module.css";
import classNames from "classnames";
import useTask from "lib/hooks/use-task";

type Props = {
  taskId: string;
};
const ListTaskView = ({ taskId }: Props) => {
  const { task, isLoading, isError, mutate } = useTask(taskId);
  const selectedTaskId = useSelector(selectSelectedTaskId);
  const isActive = taskId === selectedTaskId;
  const dispatch = useDispatch();
  const [{}, drag] = useDrag({
    item: {
      type: ItemTypes.TASK,
      taskId,
    },
    collect: (monitor) => ({}),
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSelectedTaskId(taskId));
  };
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    fetch(`/api/task?taskId=${task.taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isComplete: target.checked }),
    })
      .then((r) => r.json())
      .then((data) => mutate(data.task, true));
  };
  const isComplete = task?.isComplete;
  const divName = classNames({
    [`${taskStyles.task}`]: true,
    [`${taskStyles.selected}`]: isActive,
    [`${taskStyles.completed}`]: isComplete,
  });
  return (
    <div className={divName} ref={drag} onClick={handleClick}>
      <input
        className="check"
        type="checkbox"
        name="isComplete"
        checked={isComplete}
        onChange={handleCheck}
      />
      <h1>{task?.title}</h1>
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
