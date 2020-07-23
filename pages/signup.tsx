import { useFormik } from "formik";
import useUser from "lib/client/hooks/use-user";
import ky from "ky/umd";
import ClientSideUser from "lib/shared/user/ClientSideUser";
import PageLayout from "components/PageLayout";
import containerStyles from "styles/modules/Container.module.css";
import inputStyles from "styles/modules/Inputs.module.css";
import btnStyles from "styles/modules/Button.module.css";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
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
      const signedUpUser = await ky
        .post(`/api/auth/signup`, { json: body })
        .json<ClientSideUser>();
      mutateUser(signedUpUser, false);
    },
  });
  return (
    <PageLayout>
      <section>
        <div className={containerStyles.container}>
          Sign Up
          <form onSubmit={formik.handleSubmit}>
            <div className="in">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                className={inputStyles.field}
              />
            </div>
            <div className="in">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={inputStyles.field}
              />
            </div>
            <div className="in">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={inputStyles.field}
              />
            </div>
            <div className="buttons">
              <button type="submit" className={btnStyles.btn}>
                Submit
              </button>
            </div>
          </form>
        </div>
        <style jsx>{`
          section {
            @apply h-full w-full;
            @apply flex flex-col items-center justify-center;
          }
          label {
            @apply font-bold;
            @apply mb-1;
          }
          div.in {
            @apply flex flex-col items-start;
            @apply mb-4;
          }
          form {
            @apply flex flex-col items-center;
          }
          div.buttons {
            @apply mt-2;
            @apply flex flex-row justify-center;
          }
        `}</style>
      </section>
    </PageLayout>
  );
};
export default SignUp;
