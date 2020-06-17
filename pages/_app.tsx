import "css/tailwind.css";
import "react-calendar/dist/Calendar.css";
import store from "data/redux/store";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
