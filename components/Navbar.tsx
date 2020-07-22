import ChangeWeekButton from "./ChangeWeekButton";
import TimerPopupButton from "./TimerPopupButton";
import useUser from "lib/client/hooks/use-user";
import btnStyles from "styles/Button.module.css";
import { useRouter } from "next/router";
import ky from "ky/umd";
import ClientSideUser from "lib/shared/user/ClientSideUser";

const Navbar = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const logoutData = await ky.get(`/api/auth/logout`).json<ClientSideUser>();
    mutateUser(logoutData);
    router.push(`/`);
  };
  return (
    <>
      <ul className="bar">
        <li>
          <ChangeWeekButton />
        </li>
        <li>
          <TimerPopupButton />
        </li>
        {user?.isLoggedIn && (
          <li>
            <h2>USERNAME: "{user.username}"</h2>
          </li>
        )}
        <li>
          <button className={btnStyles.btn} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
      <style jsx>
        {`
          .bar {
            @apply w-full h-full;
            @apply flex flex-row items-center justify-end;
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
