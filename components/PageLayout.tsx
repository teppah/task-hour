import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
