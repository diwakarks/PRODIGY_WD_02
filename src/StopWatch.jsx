import React, { useState, useEffect, useRef } from "react";
import "./StopWatch.css";

function StopWatch() {
  /* ----------- STATE ----------- */
  const [status, setStatus] = useState("idle");
  // "idle" | "running" | "paused"

  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [cardColor, setCardColor] = useState("white");

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  /* ----------- TIMER EFFECT ----------- */
  useEffect(() => {
    if (status === "running") {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [status]);

  /* ----------- ACTIONS ----------- */
  function start() {
    startTimeRef.current = Date.now() - elapsedTime;
    setStatus("running");
  }

  function pause() {
    setStatus("paused");
  }

  function reset() {
    setElapsedTime(0);
    setLaps([]);
    setStatus("idle");
  }

  function lap() {
    setLaps(prev => [...prev, Number(elapsedTime)]);
  }

  /* ----------- FORMATTER ----------- */
  function formatTime(time) {
    const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  }

  /* ----------- JSX ----------- */
  return (
    <div className="stopwatch-page">

      {/* STOPWATCH CARD */}
      <div className={`stopwatch ${cardColor}`}>
        {/* COLOR PICKER */}
        <div className="color-picker">
          <span className="dot white" onClick={() => setCardColor("white")}></span>
          <span className="dot blue" onClick={() => setCardColor("blue")}></span>
          <span className="dot green" onClick={() => setCardColor("green")}></span>
          <span className="dot purple" onClick={() => setCardColor("purple")}></span>
          <span className="dot red" onClick={() => setCardColor("red")}></span>
        </div>

        {/* DISPLAY */}
        <div className="display">
          {formatTime(elapsedTime)}
        </div>

        {/* CONTROLS — INDUSTRY LOGIC */}
        <div className="controls">

          {/* IDLE */}
          {status === "idle" && (
            <button className="start-btn" onClick={start}>
              Start
            </button>
          )}

          {/* RUNNING */}
          {status === "running" && (
            <>
              <button className="pause-btn" onClick={pause}>
                Pause
              </button>
              <button className="lap-btn" onClick={lap}>
                Lap
              </button>
            </>
          )}

          {/* PAUSED */}
          {status === "paused" && (
            <>
              <button className="start-btn" onClick={start}>
                Start
              </button>
              <button className="reset-btn" onClick={reset}>
                Reset
              </button>
            </>
          )}

        </div>
      </div>

      {/* LAPS SECTION (BELOW CARD) */}
      {laps.length > 0 && (
        <div className="laps-wrapper">
          {laps.map((lap, index) => (
            <div key={index} className="lap-card">
              Lap {index + 1}: {formatTime(lap)}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default StopWatch;
