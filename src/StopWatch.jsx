import React, { useState, useEffect, useRef } from "react";
import "./StopWatch.css";

function StopWatch() {
  const [status, setStatus] = useState("idle"); // idle | running | paused
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const lastLapRef = useRef(0);

  useEffect(() => {
    if (status === "running") {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [status]);

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
    lastLapRef.current = 0;
    setStatus("idle");
  }

  function lap() {
    const split = elapsedTime - lastLapRef.current;
    setLaps(prev => [
      { split, total: elapsedTime },
      ...prev
    ]);
    lastLapRef.current = elapsedTime;
  }

  function formatTime(ms) {
    const m = String(Math.floor((ms / 60000) % 60)).padStart(2, "0");
    const s = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
    const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${m}:${s}.${cs}`;
  }

  return (
    <div className="stopwatch-page">

      <div className="time-display">
        {formatTime(elapsedTime)}
      </div>

      <div className="controls">

        {status === "idle" && (
          <button className="btn start" onClick={start}>Start</button>
        )}

        {status === "running" && (
          <>
            <button className="btn lap" onClick={lap}>Lap</button>
            <button className="btn pause" onClick={pause}>Pause</button>
          </>
        )}

        {status === "paused" && (
          <>
            <button className="btn reset" onClick={reset}>Reset</button>
            <button className="btn start" onClick={start}>Start</button>
          </>
        )}

      </div>

      {laps.length > 0 && (
        <div className="laps">
          <div className="lap header">
            <span>Lap</span>
            <span>Split</span>
            <span>Total</span>
          </div>

          {laps.map((lap, i) => (
            <div className="lap" key={i}>
              <span>{laps.length - i}</span>
              <span>{formatTime(lap.split)}</span>
              <span>{formatTime(lap.total)}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default StopWatch;
