import TaskView from "components/summary/TaskView";
import Task, { createTask } from "lib/Task";
import { useDrop } from "react-dnd";
import ItemTypes from "lib/drag/ItemTypes";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTaskId } from "lib/redux/slice/taskSlice";
import useTask from "lib/hooks/use-task";
import { mutate as mutateGlobal } from "swr";
import { addHours } from "date-fns";

type Props = { taskId?: string; currentHour: Date; mutateDay: any };

const TimeSlice = ({ taskId, currentHour, mutateDay }: Props) => {
  const dispatch = useDispatch();
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.TASK, ItemTypes.DRAG_HANDLE],
    drop: (item: any) => {
      switch (item.type) {
        case ItemTypes.TASK:
          (async () => {
            const res = await mutateGlobal(
              `/api/task?taskId=${item.taskId}`,
              // route automatically updates the endDate if startDate is changed
              fetch(`/api/task/date?taskId=${item.taskId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  startDate: currentHour.toISOString(),
                }),
              })
            );
            // when slice receives task, update whole day
            mutateDay();
            mutateGlobal(`/api/tasks/dates`);
          })();
          break;
        case ItemTypes.DRAG_HANDLE:
          (async () => {
            await mutateGlobal(
              `/api/task?taskId=${item.taskId}`,
              fetch(`/api/task/date?taskId=${item.taskId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  // have to add one extra hour since we want the task to end at the
                  // end of this timeslice
                  endDate: addHours(currentHour, 1).toISOString(),
                }),
              })
            );
            mutateDay();
          })();
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
    if (taskId) {
      console.log("task already present");
      return;
    }
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
  };
  return (
    <div className="slice" ref={drop} onClick={handleClick}>
      {taskId && <TaskView taskId={taskId} mutatePreviousDay={mutateDay} />}

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
