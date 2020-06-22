import { useState, useEffect } from "react";

const PomordoTimer = () => {
  const [seconds, setSeconds] = useState(60);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (seconds > 60 && active) {
      setTimeout(() => setSeconds(seconds - 1));
    }
  }, [seconds]);
  return (
    <section>
      <input type="text" value={seconds} />
      <div className="buttons">
        <button>Start</button>
        <button>Stop</button>
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
