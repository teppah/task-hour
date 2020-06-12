import TaskView from "components/TaskView";
import Task from "data/Task";
import { useDrop } from "react-dnd";
import ItemTypes from "./drag/ItemTypes";
import { useState, useEffect } from "react";
import { warn } from "console";

type Props = { task?: Task };

const TimeSlice = ({ task }: Props) => {
  const [currentTask, setCurrentTask] = useState<Task>(task);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.TASK,
    // TODO: remove any from the item signature
    drop: (item: any) => {
      setCurrentTask({ title: "he", description: "lol" });
      // hack to set previous cell to null
      item.setPrevious(null);
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });
  return (
    <div ref={drop}>
      {currentTask && (
        <TaskView task={currentTask} setPreviousCurrentTask={setCurrentTask} />
      )}
      <style jsx>{`
        div {
          @apply w-full h-8;
          @apply border border-gray-200;
          ${isOver && "@apply bg-red-400;"}
        }
      `}</style>
    </div>
  );
};

export default TimeSlice;
