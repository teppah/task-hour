import ChangeWeekButton from "./ChangeWeekButton";
import TimerPopupButton from "./TimerPopupButton";
import useUser from "lib/client/hooks/use-user";
import btnStyles from "styles/modules/Button.module.css";
import { useRouter } from "next/router";
import ky from "ky/umd";
import { cache } from "swr";
import ClientSideUser from "lib/shared/user/ClientSideUser";
import Link from "next/link";
import linkStyles from "styles/modules/Link.module.css";

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
        <li className="permanent">
          <ul>
            <li>
              <Link href="/">
                <a className={linkStyles.link}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/app">
                <a className={linkStyles.link}>App</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          {user?.isLoggedIn && (
            <ul>
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
            </ul>
          )}
          {!user?.isLoggedIn && (
            <ul>
              <li>
                <Link href="/signin">
                  <a>Sign in</a>
                </Link>
              </li>
              <li>
                <button
                  className={btnStyles.btn}
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <style jsx>
        {`
          .bar {
            @apply w-full h-full;
            @apply flex flex-row justify-end;
            @apply bg-white;
            @apply px-20;
            height: var(--navbar-height);
          }
          ul {
            @apply flex flex-row;
          }
          li {
            @apply px-2;
            @apply flex flex-row items-center;
          }
          .permanent {
            @apply flex-1;
          }
          .permanent > .bar {
            @apply justify-start;
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
