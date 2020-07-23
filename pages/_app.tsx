import "styles/tailwind.css";
import "styles/global.css";
import "styles/fonts.css";
import "react-calendar/dist/Calendar.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import store from "lib/client/redux/store";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
