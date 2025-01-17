import DayView from "./DayView";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedView } from "lib/client/redux/slice/dateSlice";
import { getDaysFromView } from "lib/client/dates";
import classNames from "classnames";
import containerStyles from "styles/modules/Container.module.css";

type Props = {};
const SummaryView = ({}: Props) => {
  const selectedView = useSelector(selectSelectedView);
  const days = getDaysFromView(selectedView);

  // long future TODO: do not rerender the whole view on each date change, but only the
  // individual days

  const sectionName = classNames({
    "summary-view": true,
    [`${containerStyles.container}`]: true,
  });
  return (
    <section className={sectionName}>
      <div className="time-col">
        <div></div>
        {[...Array(24).keys()].map((i) => (
          <div key={i}>{i}</div>
        ))}
      </div>
      {days.map((day) => (
        <DayView day={day} key={day} />
      ))}
      <style jsx>{`
        .summary-view {
          @apply flex flex-row;
          @apply items-start;
        }
        .time-col {
          @apply flex flex-col;
          @apply items-end;
        }
        .time-col > div {
          @apply text-center;
          @apply mr-4;
          @apply flex-none;
          height: calc(var(--slice-height));
        }
        .time-col > div:first-child {
          height: calc(var(--slice-height) - 0.5rem);
        }
      `}</style>
    </section>
  );
};
export default SummaryView;
