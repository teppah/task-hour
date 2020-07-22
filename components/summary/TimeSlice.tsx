import TaskView from "components/summary/TaskView";
import Task, { createTask } from "lib/shared/Task";
import { useDrop } from "react-dnd";
import ItemTypes from "lib/client/drag/ItemTypes";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTaskId } from "lib/client/redux/slice/taskSlice";
import { mutate as mutateGlobal } from "swr";
import ky from "ky/umd";
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
            const updatedRes = await ky
              .put(`/api/task/date?taskId=${item.taskId}`, {
                // route automatically updates the endDate if startDate is changed
                json: { startDate: currentHour.toISOString() },
              })
              .json<{ task: Task }>();

            mutateGlobal(`/api/task?taskId=${item.taskId}`, updatedRes, false);
            // when slice receives task, update whole day
            mutateDay();
            mutateGlobal(`/api/tasks/dates`);
          })();
          break;
        case ItemTypes.DRAG_HANDLE:
          (async () => {
            const updatedRes = await ky
              .put(`/api/task/date?taskId=${item.taskId}`, {
                json: {
                  // have to add one extra hour since we want the task to end at the
                  // end of this timeslice
                  endDate: addHours(currentHour, 1).toISOString(),
                },
              })
              .json<{ task: Task }>();
            mutateGlobal(`/api/task?taskId=${item.taskId}`, updatedRes, false);
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
    const json = await ky
      .post(`/api/task`, { json: toPost })
      .json<{ task: Task }>();
    const task = json.task;
    mutateDay();
    mutateGlobal(`/api/task?taskId=${task.taskId}`, json, false);
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
