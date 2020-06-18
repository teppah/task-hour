import { useDrop } from "react-dnd";
import ItemTypes from "./drag/ItemTypes";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDatelessTasks,
  changeTaskDate,
} from "data/redux/slice/taskSlice";
import ListTaskView from "./ListTaskView";

const TaskListView = () => {
  const datelessTasks = useSelector(selectDatelessTasks);
  const dispatch = useDispatch();
  const [{}, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: any) => {
      dispatch(changeTaskDate({ taskId: item.taskId, date: null }));
    },
  });
  return (
    <section>
      <h1>List of draggable tasks</h1>
      <div ref={drop}>
        {datelessTasks.map((t) => (
          <ListTaskView taskId={t.taskId} />
        ))}
      </div>
      <style jsx>{`
        section {
          @apply p-3;
          @apply h-full;
          @apply flex flex-col;
        }
        div {
          @apply border border-black;
          @apply flex-1;
        }
      `}</style>
    </section>
  );
};
export default TaskListView;
