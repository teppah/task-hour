import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedView,
  setSelectedView,
} from "data/redux/slice/dateSlice";
import btnStyles from "css/Button.module.css";
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
      <button className={btnStyles.btn} onClick={weekChangeHandler}>
        {selectedView}
      </button>
      <style jsx>{`
        section {
          @apply p-3 h-full;
          @apply border border-black;
          @apply flex items-start justify-center;
        }
      `}</style>
    </section>
  );
};

export default ButtonArray;
