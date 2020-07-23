import useUser from "lib/client/hooks/use-user";
import Link from "next/link";
import PageLayout from "components/PageLayout";
import Head from "next/head";
const Index = () => {
  const { user, isLoading } = useUser();
  return (
    <PageLayout>
      <Head>
        <title>Task Hour</title>
      </Head>

      <div>
        <Link href="/app">
          <a>Go To Application</a>
        </Link>
      </div>
      <div>
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      </div>
      <div>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </div>
      <h1>isLoading {JSON.stringify(isLoading)}</h1>
      <h1>Login status: {JSON.stringify(user?.isLoggedIn)}</h1>
      {user?.isLoggedIn && <h1>Username: {user.username}</h1>}
    </PageLayout>
  );
};
export default Index;
