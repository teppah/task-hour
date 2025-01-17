import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedView,
  setSelectedView,
} from "lib/client/redux/slice/dateSlice";
import btnStyles from "styles/modules/Button.module.css";
import { VIEWS } from "lib/client/dates";

const ChangeWeekButton = () => {
  const dispatch = useDispatch();
  const selectedView = useSelector(selectSelectedView);

  const weekChangeHandler = () => {
    const selected =
      selectedView === VIEWS.FULL_WEEK ? VIEWS.WORK_WEEK : VIEWS.FULL_WEEK;
    dispatch(setSelectedView(selected));
  };
  return (
    <>
      <button className={btnStyles.btn} onClick={weekChangeHandler}>
        {selectedView}
      </button>
      <style jsx>{``}</style>
    </>
  );
};

export default ChangeWeekButton;
