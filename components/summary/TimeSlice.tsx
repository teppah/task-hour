import TaskView from "components/summary/TaskView";
import Task, { createTask } from "lib/Task";
import { useDrop } from "react-dnd";
import ItemTypes from "lib/drag/ItemTypes";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTaskId } from "lib/redux/slice/taskSlice";
import { nanoid } from "nanoid";
import useTask from "lib/hooks/use-task";
import { mutate as mutateGlobal } from "swr";
import { addHours } from "date-fns";

type Props = { taskId?: string; currentHour: Date; mutateDay: any };

const TimeSlice = ({ taskId, currentHour, mutateDay }: Props) => {
  const dispatch = useDispatch();
  const { task: currentTask, isLoading, isError, mutate } = useTask(taskId);
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
          mutate(
            fetch(`/api/task?taskId=${item.taskId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ startDate: currentHour.toISOString() }),
            })
          );
          // when slice receives task, update whole day
          mutateDay();
          mutateGlobal(`/api/tasks/dates`);
          break;
        case ItemTypes.DRAG_HANDLE:
          // TODO
          break;
      }
      dispatch(setSelectedTaskId(item.taskId));
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });
  const handleClick = async () => {
    if (!currentTask) {
      const toPost = {
        title: "New Task",
        description: "Task Description",
        startDate: currentHour,
        endDate: addHours(currentHour, 1),
        isComplete: false,
      };
      const response = await fetch(`/api/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toPost),
      });
      const json = await response.json();
      const task: Task = json.task;
      await mutateDay();
      dispatch(setSelectedTaskId(task.taskId));
    }
  };
  return (
    <div className="slice" ref={drop} onClick={handleClick}>
      {currentTask && (
        <TaskView taskId={currentTask.taskId} mutatePreviousDay={mutateDay} />
      )}
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
