import { useSelector, useDispatch } from "react-redux";
import {
  selectTaskById,
  selectSelectedTaskId,
  setSelectedTaskId,
} from "data/redux/slice/taskSlice";
import { useDrag } from "react-dnd";
import ItemTypes from "./drag/ItemTypes";

type Props = {
  taskId: string;
};
const ListTaskView = ({ taskId }: Props) => {
  const task = useSelector(selectTaskById(taskId));
  const selectedTaskId = useSelector(selectSelectedTaskId);
  const isActive = taskId === selectedTaskId;
  const dispatch = useDispatch();
  const [{}, drag] = useDrag({
    item: {
      type: ItemTypes.TASK,
      taskId,
    },
    collect: (monitor) => ({}),
  });
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSelectedTaskId(taskId));
  };
  return (
    <div ref={drag} onClick={handleClick}>
      <h1>{task.title}</h1>
      <style jsx>{`
        div {
          @apply w-full;
          @apply border border-red-500;
          @apply cursor-pointer;
        }
      `}</style>
      <style jsx>{`
        div {
          background-color: ${isActive ? "#718096" : "#cbd5e0"};
        }
      `}</style>
    </div>
  );
};
export default ListTaskView;
