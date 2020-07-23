import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
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
