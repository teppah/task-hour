import Tippy from "@tippyjs/react";
import PomordoTimer from "./PomordoTimer";

import btnStyles from "styles/Button.module.css";
const TimerPopupButton = () => {
  return (
    <Tippy
      content={<PomordoTimer />}
      placement="bottom"
      theme="light"
      trigger="click"
      hideOnClick="toggle"
      interactive={true}
    >
      <button className={btnStyles.btn}>Timer</button>
    </Tippy>
  );
};
export default TimerPopupButton;
