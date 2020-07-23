import "styles/fonts.css";
import "styles/tailwind.css";
import "react-calendar/dist/Calendar.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import store from "lib/client/redux/store";
import { Provider } from "react-redux";
import "styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
