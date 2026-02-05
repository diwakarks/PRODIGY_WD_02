import { useEffect, useRef, useState } from "react";
import "./Stopwatch.css";

export default function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState([]);

  const startRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startRef.current);
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const format = (ms) => {
    const m = String(Math.floor(ms / 60000)).padStart(2, "0");
    const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const c = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${m}:${s}:${c}`;
  };

  const addLap = () => {
    if (!running) return;
    const prevTotal = laps.length ? laps[0].total : 0;
    setLaps(prev => [
      { lap: prev.length + 1, duration: elapsed - prevTotal, total: elapsed },
      ...prev
    ]);
  };

  const reset = () => {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  };

  const angle = ((elapsed / 1000) % 60) * 6;

  return (
    <div className="stopwatch-page">
      <div className="stopwatch-card">
        <h3 className="title">Stopwatch</h3>

        <div className="circle-wrapper">
          <div className="circle-bg" />
          <div
            className="circle-progress"
            style={{ "--angle": `${angle}deg` }}
          />
          <div className="circle-inner">{format(elapsed)}</div>
        </div>

        <div className="controls">
          <button className="btn secondary" onClick={addLap}>Lap</button>
          <button className="btn primary" onClick={() => setRunning(r => !r)}>
            {running ? "Pause" : "Start"}
          </button>
          <button className="btn secondary" onClick={reset}>Reset</button>
        </div>
      </div>

      {laps.length > 0 && (
        <div className="laps-container">
          <div className="laps-header">
            <span>Lap No.</span>
            <span>Lap duration</span>
            <span>Total time</span>
          </div>
          {laps.map((l, i) => (
            <div key={i} className="lap-row">
              <span>{l.lap}</span>
              <span>{format(l.duration)}</span>
              <span>{format(l.total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
