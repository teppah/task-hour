import TaskView from "components/TaskView";
import Task from "data/types/Task";
import { useDrop } from "react-dnd";
import ItemTypes from "./drag/ItemTypes";
import { PullstateCore } from "data/pullstate/PullstateCore";
import { useState, useEffect } from "react";

type Props = { task?: Task };

const TimeSlice = ({ task }: Props) => {
  const { TaskStore } = PullstateCore.useStores();
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