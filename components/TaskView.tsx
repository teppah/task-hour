import { useDrag } from "react-dnd";
import Task from "data/types/Task";
import ItemTypes from "components/drag/ItemTypes";
import { PullstateCore } from "data/pullstate/PullstateCore";
import { useState, useEffect } from "react";

type Props = {
  task: Task;
  setPreviousCurrentTask: any;
};

const TaskView = ({ task, setPreviousCurrentTask }: Props) => {
  const { title, description, taskId } = task;
  const [{ isDragging }, drag] = useDrag({
    // setPrevious: a hack to expose the current cell the TaskView is in to the
    // drop target. that way, on drop, the TimeSlice that is being dropped on
    // can clear the previous cell's content and set the current cell to this
    // task.
    // TODO: REMOVE setPrevious to decouple
    item: {
      type: ItemTypes.TASK,
      setPrevious: setPreviousCurrentTask,
      taskId: taskId,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });
  const { CurrentTaskStore, TaskStore } = PullstateCore.useStores();
  const handleClick = () => {
    console.log(`click from inside TaskView`);
    CurrentTaskStore.update((s) => {
      s.selectedTask = task;
      console.log(`updated`);
      console.log(s.selectedTask);
    });
  };
  const selected = CurrentTaskStore.useState((s) => s.selectedTask);
  let isActive = false;
  if (selected && selected.taskId == taskId) {
    isActive = true;
    console.log(`active`);
  }

  return (
    <section
      className={isActive ? "selected" : ""}
      ref={drag}
      onClick={handleClick}
    >
      <h1>{title}</h1>
      <style jsx>{`
        section {
          @apply h-full w-full;
          @apply bg-gray-400;
          @apply cursor-pointer;
        }
        section:active {
          @apply bg-gray-500;
        }
        .selected {
          @apply bg-gray-600;
        }
      `}</style>
    </section>
  );
};

export default TaskView;
