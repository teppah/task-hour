import DayView from "components/DayView";

type Props = {};
const SummaryView = ({}: Props) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <section className="summary-view">
      {days.map((day) => (
        <DayView dayName={day} />
      ))}
      <style jsx>{`
        .summary-view {
          @apply flex flex-row;
          @apply h-full w-full;
        }
      `}</style>
    </section>
  );
};
export default SummaryView;
