import TaskView from "components/summary/TaskView";
import Task, { createTask } from "data/Task";
import { useDrop } from "react-dnd";
import ItemTypes from "data/drag/ItemTypes";
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
  changeTaskEndDate,
} from "data/redux/slice/taskSlice";
import { nanoid } from "nanoid";

type Props = { taskId?: string; currentHour: Date };

const TimeSlice = ({ taskId, currentHour }: Props) => {
  const currentTask = useSelector(selectTaskById(taskId));
  const dispatch = useDispatch();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.TASK, ItemTypes.DRAG_HANDLE],
    drop: (item: any) => {
      if (currentTask) {
        alert(
          "there's already a task here u noob, u can't drop it here for now"
        );
        return;
      }
      switch (item.type) {
        case ItemTypes.TASK:
          dispatch(
            changeTaskStartDate({ taskId: item.taskId, date: currentHour })
          );
          break;
        case ItemTypes.DRAG_HANDLE:
          dispatch(
            changeTaskEndDate({ taskId: item.taskId, date: currentHour })
          );
          break;
      }
      dispatch(setSelectedTaskId(item.taskId));
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
    <div className="slice" ref={drop} onClick={handleClick}>
      {currentTask && <TaskView taskId={currentTask.taskId} />}
      <style jsx>{`
        div.slice {
          @apply flex-none;
          @apply w-full h-12;
          @apply border-b border-blue-200;
          ${isOver && "background-color: cyan;"}
        }
        div.slice:first-of-type {
          @apply border-t;
        }
      `}</style>
    </div>
  );
};

export default TimeSlice;
