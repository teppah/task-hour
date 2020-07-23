import Navbar from "./Navbar";
import Head from "next/head";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>TaskHour</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
      <style jsx>{`
        div {
          @apply flex flex-col;
          @apply h-screen w-screen;
        }
        main {
          @apply h-full;
        }
      `}</style>
    </div>
  );
};

export default Layout;
