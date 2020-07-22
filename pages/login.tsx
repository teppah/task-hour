import useUser from "lib/client/hooks/use-user";
import { useFormik } from "formik";
import ClientSideUser from "lib/shared/user/ClientSideUser";
import ky from "ky/umd";

const Login = () => {
  const { mutateUser } = useUser({
    redirectUrl: "/app",
    redirectIfFound: true,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, helper) => {
      const body = { email: values.email, password: values.password };
      (async () => {
        try {
          const loggedInUser = await ky
            .post(`/api/auth/login`, { json: body })
            .json<ClientSideUser>();
          await mutateUser(loggedInUser);
        } catch (e) {
          console.error(e);
        }
      })();
    },
  });

  return (
    <div>
      Login
      <form onSubmit={formik.handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </label>
        <button type="submit">Submit</button>
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
