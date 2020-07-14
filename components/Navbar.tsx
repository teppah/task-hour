import ChangeWeekButton from "./ChangeWeekButton";
import TimerPopupButton from "./TimerPopupButton";

const Navbar = () => {
  return (
    <>
      <ul className="bar">
        <li>
          <ChangeWeekButton />
        </li>
        <li>
          <TimerPopupButton />
        </li>
      </ul>
      <style jsx>
        {`
          .bar {
            @apply w-full h-full;
            @apply flex flex-row items-stretch justify-end;
            @apply bg-white;
            @apply px-20;
          }
          li {
            @apply px-2;
            @apply flex flex-row items-center;
          }
          h1 {
            @apply font-bold;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
