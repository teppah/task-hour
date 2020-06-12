import "css/tailwind.css";
import { PullstateCore } from "data/pullstate/PullstateCore";
import { PullstateProvider } from "pullstate";

const App = ({ Component, pageProps }) => {
  const instance = PullstateCore.instantiate({ ssr: true });
  return (
    <PullstateProvider instance={instance}>
      <Component {...pageProps} />
    </PullstateProvider>
  );
};

export default App;
