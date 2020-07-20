import useUser from "lib/hooks/use-user";
import { useFormik } from "formik";
import ClientSideUser from "lib/user/ClientSideUser";

const Login = () => {
  const { mutateUser } = useUser({
    redirectUrl: "/app",
    redirectIfFound: true,
  });

  const initialUsername: string = null;
  const formik = useFormik({
    initialValues: {
      username: initialUsername,
    },
    onSubmit: (values, helper) => {
      const body = { username: values.username };
      (async () => {
        const loginFetch = await fetch(`/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const userDataPromise: Promise<ClientSideUser> = loginFetch.json();
        await mutateUser(userDataPromise);
      })();
    },
  });

  return (
    <div>
      Login
      <form onSubmit={formik.handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <button type="submit">Submit</button>
        </label>
      </form>
      <style jsx>{`
        input {
          @apply border border-black;
        }
      `}</style>
    </div>
  );
};

export default Login;
