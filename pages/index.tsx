import useUser from "lib/hooks/user-user";

const Index = () => {
  const { user, mutateUser } = useUser();
  return (
    <div>
      <h1>Login status: {JSON.stringify(user?.isLoggedIn)}</h1>
      {user?.isLoggedIn && <h1>Username: {user.username}</h1>}
    </div>
  );
};
export default Index;
