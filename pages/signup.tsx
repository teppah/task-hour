import { useFormik } from "formik";
import useUser from "lib/client/hooks/use-user";
import ky from "ky/umd";
import ClientSideUser from "lib/shared/user/ClientSideUser";

const SignUp = () => {
  const { mutateUser } = useUser({
    redirectUrl: "/app",
    redirectIfFound: true,
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, helper) => {
      const body = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      console.log(`submitting`);
      const signedUpUser = await ky
        .post(`/api/auth/signup`, { json: body })
        .json<ClientSideUser>();
      mutateUser(signedUpUser);
    },
  });
  return (
    <div>
      Sign Up
      <form onSubmit={formik.handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
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
        form {
          @apply flex flex-col items-start;
        }
      `}</style>
    </div>
  );
};
export default SignUp;
