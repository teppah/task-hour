import { useState, useEffect } from "react";

const PomordoTimer = () => {
  const [seconds, setSeconds] = useState(60);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (seconds > 0 && active) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    // clear the timeout when state is updated to prevent timer from ticking
    // after stopping
    return () => clearTimeout(timeout);
  }, [seconds, active]);
  const handleStart = () => {
    setActive(true);
  };
  const handleStop = () => {
    setActive(false);
  };
  return (
    <section>
      <input type="text" value={seconds} />
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      <style jsx>{`
        section {
          @apply p-3;
          @apply border border-black;
          @apply h-full;
          @apply flex flex-col items-center;
        }
        input {
          @apply border border-black flex-none;
          @apply px-2;
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
