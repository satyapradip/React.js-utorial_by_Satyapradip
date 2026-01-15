import { useState, useEffect } from "react";

/**
 * EXAMPLE 1: Simple Timer with Cleanup
 *
 * What you'll learn:
 * - Using setInterval in useEffect
 * - Cleaning up intervals
 * - Functional state updates
 */

function TimerExample() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return; // Don't set interval if not running

    console.log("⏰ Timer started!");

    // Set up interval
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup function
    return () => {
      console.log("🧹 Cleaning up timer!");
      clearInterval(interval);
    };
  }, [isRunning]); // Re-run when isRunning changes

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #3498db",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>⏱️ Timer Example</h2>
      <h1 style={{ fontSize: "48px", color: "#3498db" }}>{seconds}s</h1>

      <button
        onClick={() => setIsRunning(!isRunning)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginRight: "10px",
          backgroundColor: isRunning ? "#e74c3c" : "#2ecc71",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        onClick={() => setSeconds(0)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#95a5a6",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Reset
      </button>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#7f8c8d" }}>
        <p>
          💡 <strong>What's happening:</strong>
        </p>
        <ul style={{ textAlign: "left" }}>
          <li>useEffect sets up a timer when component mounts</li>
          <li>Timer updates state every second</li>
          <li>
            Cleanup function clears interval when component unmounts or
            isRunning changes
          </li>
          <li>Using functional update: setSeconds(prev ={">"} prev + 1)</li>
        </ul>
      </div>
    </div>
  );
}

export default TimerExample;
