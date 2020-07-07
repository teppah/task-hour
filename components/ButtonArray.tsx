import { useDispatch, useSelector } from "react-redux";
import { selectSelectedView, setSelectedView } from "lib/redux/slice/dateSlice";
import btnStyles from "css/Button.module.css";
import containerStyles from "css/Container.module.css";
import { VIEWS } from "util/dates";

const ButtonArray = () => {
  const dispatch = useDispatch();
  const selectedView = useSelector(selectSelectedView);

  const weekChangeHandler = () => {
    const selected =
      selectedView === VIEWS.FULL_WEEK ? VIEWS.WORK_WEEK : VIEWS.FULL_WEEK;
    dispatch(setSelectedView(selected));
  };
  return (
    <section className={containerStyles.container}>
      <button className={btnStyles.btn} onClick={weekChangeHandler}>
        {selectedView}
      </button>
      <style jsx>{`
        section {
        }
      `}</style>
    </section>
  );
};

export default ButtonArray;
