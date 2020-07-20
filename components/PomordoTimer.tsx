import { useState, useEffect, ChangeEvent } from "react";
import btnStyles from "styles/Button.module.css";
import classNames from "classnames";

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
          if (seconds === 1 && minutes === 0) {
            setDone(true);
          }
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

  const containerClass = classNames({
    done: done,
  });
  return (
    <section className={containerClass}>
      <div className="time">
        <input
          type="number"
          value={formatDigits(minutes)}
          onChange={handleChangeMinute}
        />{" "}
        m
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
        section {
          @apply p-4;
          @apply flex flex-col items-center;
        }
        .done {
          @apply bg-gray-500;
        }
        input {
          @apply font-mono;
          @apply border border-black;
          @apply text-center;
          @apply w-10;
          margin: 0 0.2rem;
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
          @apply bg-red-500;
          @apply border-red-600;
          @apply text-white;
        }
        .start {
          @apply bg-green-500;
          @apply border-green-600;
        }
      `}</style>
    </section>
  );
};

export default PomordoTimer;
