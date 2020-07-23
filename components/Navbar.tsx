import ChangeWeekButton from "./ChangeWeekButton";
import TimerPopupButton from "./TimerPopupButton";
import useUser from "lib/client/hooks/use-user";
import btnStyles from "styles/Button.module.css";
import { useRouter } from "next/router";
import ky from "ky/umd";
import { cache } from "swr";
import ClientSideUser from "lib/shared/user/ClientSideUser";

const Navbar = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const logoutData = await ky.get(`/api/auth/logout`).json<ClientSideUser>();
    mutateUser(logoutData, false);
    cache.clear(true);
  };
  return (
    <>
      <ul className="bar">
        {user?.isLoggedIn && (
          <>
            <li>
              <ChangeWeekButton />
            </li>
            <li>
              <TimerPopupButton />
            </li>
            <li>
              <h2>Hello, {user.username}!</h2>
            </li>
            <li>
              <button className={btnStyles.btn} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
        {!user?.isLoggedIn && (
          <>
            <li>
              <button
                className={btnStyles.btn}
                onClick={() => router.push("/signin")}
              >
                Sign in
              </button>
            </li>
          </>
        )}
      </ul>
      <style jsx>
        {`
          .bar {
            @apply w-full h-full;
            @apply flex flex-row items-center justify-end;
            @apply bg-white;
            @apply px-20;
            height: var(--navbar-height);
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
