type Props = {
  dayName: string;
};

const DayView = ({ dayName }: Props) => {
  return (
    <section className="day-view">
      <h1>{dayName}</h1>
      <style jsx>{`
        .day-view {
          @apply flex flex-col items-center;
          @apply h-full w-full;
          @apply border border-dashed border-blue-400;
        }
      `}</style>
    </section>
  );
};
export default DayView;
