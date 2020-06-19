import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedView,
  setSelectedView,
} from "data/redux/slice/dateSlice";
import { VIEWS } from "util/dates";

const ButtonArray = () => {
  const dispatch = useDispatch();
  const selectedView = useSelector(selectSelectedView);

  const weekChangeHandler = () => {
    const selected =
      selectedView === VIEWS.FULL_WEEK ? VIEWS.WORK_WEEK : VIEWS.FULL_WEEK;
    dispatch(setSelectedView(selected));
    console.log(selectedView);
  };
  return (
    <section>
      <button onClick={weekChangeHandler}>{selectedView}</button>
      <style jsx>{`
        section {
          @apply p-3 h-full;
          @apply border border-black;
          @apply flex items-start justify-center;
        }
        button {
          @apply px-2 py-1;
          @apply bg-blue-200;
          @apply border-2 border-blue-500;
          @apply rounded-lg;
        }
        button:hover {
          @apply bg-blue-300;
        }
        button:active {
          @apply bg-blue-500;
        }
      `}</style>
    </section>
  );
};

export default ButtonArray;
