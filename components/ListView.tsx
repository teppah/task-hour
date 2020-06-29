import { useDrop } from "react-dnd";
import ItemTypes from "./drag/ItemTypes";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDatelessTasks,
  changeTaskStartDate,
} from "data/redux/slice/taskSlice";
import ListTaskView from "./ListTaskView";
import containerStyles from "css/Container.module.css";

const TaskListView = () => {
  const datelessTasks = useSelector(selectDatelessTasks);
  const dispatch = useDispatch();
  const [{}, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: any) => {
      dispatch(changeTaskStartDate({ taskId: item.taskId, date: null }));
    },
  });
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
          @apply border border-black;
          @apply flex-1;
        }
      `}</style>
    </section>
  );
};
export default TaskListView;
