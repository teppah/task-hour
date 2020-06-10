import DayView from "components/DayView";
import { range } from "lodash";

type Props = {};
const SummaryView = ({}: Props) => {
  const days = [
    // "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    // "Saturday",
  ];

  return (
    <section className="summary-view">
      <div className="time-col">
        <div></div>
        {range(24).map((i) => (
          <div>{i}</div>
        ))}
      </div>
      {days.map((day) => (
        <DayView dayName={day} />
      ))}
      <style jsx>{`
        .summary-view {
          @apply flex flex-row;
          @apply h-full w-full;
        }
        .time-col {
          @apply flex flex-col;
          @apply flex-none h-full;
        }
        .time-col > div:first-child {
          @apply h-5;
        }
        .time-col > div {
          @apply text-center;
          @apply mx-2;
          @apply h-8;
        }
      `}</style>
    </section>
  );
};
export default SummaryView;
