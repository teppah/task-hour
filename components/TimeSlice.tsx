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
} from "data/redux/slice/taskSlice";

type Props = { taskId?: string; currentHour: Date };

const TimeSlice = ({ taskId, currentHour }: Props) => {
  const currentTask = useSelector(selectTaskById(taskId));
  const dispatch = useDispatch();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: any) => {
      dispatch(updateTaskIfExist({ id: item.taskId, date: currentHour }));
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });
  const handleClick = () => {
    if (!currentTask) {
      console.log(`click from TimeSlice`);
    }
  };
  return (
    <div ref={drop} onClick={handleClick}>
      {currentTask && <TaskView taskId={currentTask.taskId} />}
      <style jsx>{`
        div {
          @apply w-full h-8;
          @apply border border-red-200;
          ${isOver && "@apply bg-red-400;"}
        }
      `}</style>
    </div>
  );
};

export default TimeSlice;
