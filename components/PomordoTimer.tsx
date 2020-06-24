import { useState, useEffect, ChangeEvent } from "react";
import btnStyles from "css/Button.module.css";

const PomordoTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (active) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setDone(true);
        }
      }
    }, 1000);
    // clear the timeout when state is updated to prevent timer from ticking
    // after stopping
    return () => clearTimeout(timeout);
  }, [seconds, active]);
  const handleToggle = () => {
    setActive(!active);
    if (active) {
      setDone(false);
    }
  };
  const handleChangeMinute = (e: ChangeEvent<HTMLInputElement>) => {
    if (!active) {
      setMinutes(Number(e.target.value));
    }
  };
  const handleChangeSecond = (e: ChangeEvent<HTMLInputElement>) => {
    if (!active) {
      setSeconds(Number(e.target.value));
    }
  };
  const formatDigits = (val: number) => {
    if (val >= 10) {
      return val;
    } else {
      return `0${val}`;
    }
  };
  return (
    <section className={done ? "done" : ""}>
      <div className="time">
        <input
          type="number"
          value={formatDigits(minutes)}
          onChange={handleChangeMinute}
        />{" "}
        m :
        <input
          type="number"
          value={formatDigits(seconds)}
          max="59"
          onChange={handleChangeSecond}
        />{" "}
        s
      </div>
      <div className="buttons">
        <button
          onClick={handleToggle}
          className={
            active ? `${btnStyles.btn} stop` : `${btnStyles.btn} start`
          }
        >
          {active ? "Stop" : "Start"}
        </button>
        <button className={btnStyles.btn}>Reset</button>
      </div>
      <style jsx>{`
        .done {
          @apply bg-gray-500;
        }
        section {
          @apply p-3;
          @apply border border-black;
          @apply h-full;
          @apply flex flex-col items-center;
        }
        input {
          @apply font-mono;
          @apply border border-black;
          @apply text-center;
          @apply w-10 mx-1;
        }
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
        .time {
          @apply flex flex-row;
        }
        .buttons {
          @apply flex flex-row;
        }
        section > div {
          @apply my-2;
        }
        button {
          @apply mx-1;
        }
        .stop {
          @apply bg-red-400;
          @apply border-red-600;
        }
        .start {
          @apply bg-green-400;
          @apply border-green-600;
        }
      `}</style>
    </section>
  );
};

export default PomordoTimer;
