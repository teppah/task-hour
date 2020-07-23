import useUser from "lib/client/hooks/use-user";
import { useFormik } from "formik";
import ClientSideUser from "lib/shared/user/ClientSideUser";
import ky from "ky/umd";
import PageLayout from "components/PageLayout";
import containerStyles from "styles/Container.module.css";
import btnStyles from "styles/Button.module.css";

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
            @apply mb-2;
          }
          input {
            @apply border rounded;
            @apply px-2 py-1;
            @apply shadow;
          }
          input:focus {
            @apply outline-none shadow-outline;
          }
          div.buttons {
            @apply mt-4;
            @apply flex flex-row justify-center;
          }
        `}</style>
      </section>
    </PageLayout>
  );
};

export default Login;
