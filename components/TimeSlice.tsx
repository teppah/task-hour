import TaskView from "components/TaskView";
import Task from "data/types/Task";
import { useDrop } from "react-dnd";
import ItemTypes from "./drag/ItemTypes";
import { useState, useEffect } from "react";
import { useStores } from "pullstate";

type Props = { task?: Task };

const TimeSlice = ({ task }: Props) => {
  const { TaskStore } = useStores();
  const tasks = TaskStore.useState((s) => s.tasks);

  const [currentTask, setCurrentTask] = useState<Task>(task);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.TASK,
    // TODO: remove any from the item signature
    drop: (item: any) => {
      const targetTask = tasks.find((i) => i.taskId === item.taskId);
      // only update the task if cell is empty
      if (currentTask === null) {
        setCurrentTask(targetTask);
        // hack to set previous cell to null
        item.setPrevious(null);
      }
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
      {currentTask && (
        <TaskView task={currentTask} setPreviousCurrentTask={setCurrentTask} />
      )}
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
