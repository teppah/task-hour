import TaskView from "components/TaskView";
import Task, { createTask } from "data/Task";
import { useDrop } from "react-dnd";
import ItemTypes from "./drag/ItemTypes";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTasks,
  selectCurrentTaskIds,
  selectTaskById,
  updateTaskIfExist,
  addTask,
  setSelectedTaskId,
  changeTaskStartDate,
} from "data/redux/slice/taskSlice";
import { nanoid } from "nanoid";

type Props = { taskId?: string; currentHour: Date };

const TimeSlice = ({ taskId, currentHour }: Props) => {
  const currentTask = useSelector(selectTaskById(taskId));
  const dispatch = useDispatch();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.TASK, ItemTypes.DRAG_HANDLE],
    drop: (item: any) => {
      switch (item.type) {
        case ItemTypes.TASK:
          dispatch(
            changeTaskStartDate({ taskId: item.taskId, date: currentHour })
          );
          break;
        case ItemTypes.DRAG_HANDLE:
          alert("Dropped handle");
          break;
      }
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });
  const handleClick = () => {
    if (!currentTask) {
      const newId = nanoid();
      const newTask = createTask(
        newId,
        "Task Title",
        "Description here",
        currentHour
      );
      dispatch(addTask(newTask));
      dispatch(setSelectedTaskId(newId));
    }
  };
  return (
    <div ref={drop} onClick={handleClick}>
      {currentTask && <TaskView taskId={currentTask.taskId} />}
      <style jsx>{`
        div {
          @apply w-full h-10;
          @apply border border-red-200;
          ${isOver && "@apply bg-red-400;"}
        }
      `}</style>
    </div>
  );
};

export default TimeSlice;
