import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedTaskId,
  setSelectedTaskId,
} from "lib/redux/slice/taskSlice";
import { useDrag } from "react-dnd";
import React, { useState } from "react";
import ItemTypes from "lib/drag/ItemTypes";
import taskStyles from "styles/Task.module.css";
import classNames from "classnames";
import useTask from "lib/hooks/use-task";
import Tippy from "@tippyjs/react";
import DetailedTaskView from "components/DetailedTaskView";
import ky from "ky/umd";
import Task from "lib/Task";

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
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSelectedTaskId(taskId));
  };
  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    mutate(
      {
        // make the hook work
        task: {
          ...task,
          // override destructured property
          isComplete: target.checked,
        },
      },
      false
    );
    // maybe should not re-render one extra time due to setting mutate data
    const response = await ky
      .put(`/api/task?taskId=${task.taskId}`, {
        json: { isComplete: target.checked },
      })
      .json<{ task: Task }>();
    mutate(response);
  };
  const isComplete = task?.isComplete;
  const divName = classNames({
    [`${taskStyles.task}`]: true,
    [`${taskStyles.selected}`]: isActive,
    [`${taskStyles.completed}`]: isComplete,
  });
  const title = task?.title;

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
      <div className={divName} ref={drag} onClick={handleClick}>
        <input
          className="check"
          type="checkbox"
          name="isComplete"
          checked={isComplete}
          onChange={handleCheck}
        />
        <h1>{title}</h1>
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
    </Tippy>
  );
};
export default ListTaskView;
