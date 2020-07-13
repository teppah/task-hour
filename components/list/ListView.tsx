import { useDrop } from "react-dnd";
import ItemTypes from "lib/drag/ItemTypes";
import ListTaskView from "./ListTaskView";
import containerStyles from "css/Container.module.css";
import useDatelessTasks from "lib/hooks/use-dateless-tasks";
import { mutate as mutateGlobal } from "swr";
import Task from "lib/Task";

const TaskListView = () => {
  const { datelessTaskIds, isLoading, isError, mutate } = useDatelessTasks();
  const [{}, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: any) => {
      const taskId = item.taskId;
      (async () => {
        const res = await fetch(`/api/task/date?taskId=${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: "null",
            endDate: "null",
          }),
        });
        mutate();
        mutateGlobal(`/api/task?taskId=${taskId}`);
      })();
    },
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <section className={containerStyles.container}>
      <h1>List of draggable tasks</h1>
      <div ref={drop}>
        {datelessTaskIds &&
          datelessTaskIds.map((taskId) => <ListTaskView taskId={taskId} />)}
      </div>
      <style jsx>{`
        section {
          min-height: 20rem;
        }
        div {
          @apply border rounded border-blue-500;
          @apply flex-1;
          @apply w-full;
        }
      `}</style>
    </section>
  );
};
export default TaskListView;
