import { useDrop } from "react-dnd";
import ItemTypes from "lib/client/drag/ItemTypes";
import ListTaskView from "./ListTaskView";
import containerStyles from "styles/Container.module.css";
import useDatelessTasks from "lib/client/hooks/use-dateless-tasks";
import { mutate as mutateGlobal } from "swr";
import ky from "ky/umd";

const TaskListView = () => {
  const { datelessTaskIds, isLoading, isError, mutate } = useDatelessTasks();
  const [{}, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: any) => {
      const taskId = item.taskId;
      (async () => {
        await ky.put(`/api/task/date?taskId=${taskId}`, {
          json: { startDate: null, endDate: null },
        });
        mutate();
        mutateGlobal(`/api/task?taskId=${taskId}`);
      })();
    },
  });
  return (
    <section className={containerStyles.container}>
      <h1>List of draggable tasks</h1>
      <div ref={drop}>
        {!isLoading &&
          !isError &&
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
          @apply h-full;
        }
      `}</style>
    </section>
  );
};
export default TaskListView;
