import { useState } from "react";
import StopWatch from "./StopWatch";
import "./App.css";

function App() {
  const [mode, setMode] = useState("light");

  return (
    <div className={`app ${mode}`}>
      <button
        className="mode-toggle"
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
      >
        {mode === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <StopWatch />
    </div>
  );
}

export default App;
