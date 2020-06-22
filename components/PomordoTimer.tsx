import { useState, useEffect, ChangeEvent } from "react";

const PomordoTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (active) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0 && minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    // clear the timeout when state is updated to prevent timer from ticking
    // after stopping
    return () => clearTimeout(timeout);
  }, [seconds, active]);
  const handleToggle = () => {
    setActive(!active);
  };
  const handleChangeMinute = (e: ChangeEvent<HTMLInputElement>) => {
    if (!active) {
      setMinutes(Number(e.target.value));
    }
  };
  const handleChangeSecond = (e: ChangeEvent<HTMLInputElement>) => {
    if (!active) {
      setMinutes(Number(e.target.value));
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
    <section>
      <div className="time">
        <input
          type="number"
          value={formatDigits(minutes)}
          onChange={handleChangeMinute}
        />
        :
        <input
          type="number"
          value={formatDigits(seconds)}
          max="59"
          onChange={handleChangeSecond}
        />
      </div>
      <div className="buttons">
        <button onClick={handleToggle}>{active ? "Stop" : "Start"}</button>
        <button>Reset</button>
      </div>
      <style jsx>{`
        section {
          @apply p-3;
          @apply border border-black;
          @apply h-full;
          @apply flex flex-col items-center;
        }
        input {
          @apply border border-black;
          @apply text-center;
          @apply w-12 mx-1;
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
        button {
          @apply p-1;
          @apply rounded border-2 border-blue-300;
        }
      `}</style>
    </section>
  );
};

export default PomordoTimer;
