import { useDrop } from "react-dnd";
import ItemTypes from "lib/drag/ItemTypes";
import ListTaskView from "./ListTaskView";
import containerStyles from "css/Container.module.css";
import useDatelessTasks from "lib/hooks/use-dateless-tasks";
import { mutate as mutateGlobal } from "swr";

const TaskListView = () => {
  const { datelessTasks, isLoading, isError, mutate } = useDatelessTasks();
  const [{}, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: any) => {
      const taskId = item.taskId;
      fetch(`/api/task/date?taskId=${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: "null",
          endDate: "null",
        }),
      })
        .then((r) => r.json())
        .then((json) => {
          mutate();
          mutateGlobal(`/api/task?taskId=${taskId}`, json.task);
        });
    },
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <section className={containerStyles.container}>
      <h1>List of draggable tasks</h1>
      <div ref={drop}>
        {datelessTasks.map((t) => (
          <ListTaskView taskId={t.taskId} />
        ))}
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
