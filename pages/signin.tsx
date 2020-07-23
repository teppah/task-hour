import useUser from "lib/client/hooks/use-user";
import { useFormik } from "formik";
import ClientSideUser from "lib/shared/user/ClientSideUser";
import ky from "ky/umd";
import PageLayout from "components/PageLayout";
import containerStyles from "styles/modules/Container.module.css";
import btnStyles from "styles/modules/Button.module.css";
import { useRouter } from "next/router";
import inputStyles from "styles/modules/Inputs.module.css";

const Login = () => {
  const router = useRouter();
  const { mutateUser, isLoading, error } = useUser({
    redirectUrl: "/app",
    redirectIfFound: true,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, helper) => {
      const body = { email: values.email, password: values.password };
      try {
        const loggedInUser = await ky
          .post(`/api/auth/login`, { json: body })
          .json<ClientSideUser>();
        await mutateUser(loggedInUser, false);
        router.push("/app");
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <PageLayout>
      <section>
        <div className={containerStyles.container}>
          Login
          <form onSubmit={formik.handleSubmit}>
            <div className="in">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
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
                value={formik.values.password}
                onChange={formik.handleChange}
                className={inputStyles.field}
              />
            </div>
            <div className="buttons">
              <button type="submit" className={btnStyles.btn}>
                Sign In
              </button>
            </div>
          </form>
        </div>
        <style jsx>{`
          section {
            @apply flex flex-col items-center justify-center;
            @apply h-full;
          }
          div.in {
            @apply flex flex-col items-start;
            @apply mb-4;
          }
          form {
            @apply flex flex-col;
          }
          label {
            @apply mb-1;
            @apply font-bold;
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

export default Login;
