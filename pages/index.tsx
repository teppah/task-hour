import useUser from "lib/client/hooks/use-user";

import Link from "next/link";
const Index = () => {
  const { user, isLoading } = useUser();
  return (
    <div>
      <div>
        <Link href="/app">
          <a>Go To Application</a>
        </Link>
      </div>
      <div>
        <Link href="/signin">
          <a>Login</a>
        </Link>
      </div>
      <div>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </div>
      <h1>Login status: {JSON.stringify(user?.isLoggedIn)}</h1>
      {user?.isLoggedIn && <h1>Username: {user.username}</h1>}
    </div>
  );
};
export default Index;
