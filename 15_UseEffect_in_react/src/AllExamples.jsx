import React from "react";
import TimerExample from "./examples/TimerExample";
import FetchDataExample from "./examples/FetchDataExample";
import LocalStorageExample from "./examples/LocalStorageExample";
import DocumentTitleExample from "./examples/DocumentTitleExample";
import DebounceSearchExample from "./examples/DebounceSearchExample";

/**
 * All useEffect Examples in One Place
 *
 * This component displays all the useEffect examples together
 * so you can see them in action and learn different patterns.
 */

function AllExamples() {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "40px",
          padding: "30px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ fontSize: "42px", margin: "0 0 10px 0" }}>
          ⚛️ useEffect Mastery
        </h1>
        <p style={{ fontSize: "18px", margin: 0 }}>
          Interactive Examples - From Beginner to Advanced
        </p>
      </header>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          border: "2px solid #ffc107",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#856404" }}>📖 How to Learn:</h3>
        <ol style={{ color: "#856404", lineHeight: "1.8" }}>
          <li>Read the code for each example below</li>
          <li>Interact with the components and observe the behavior</li>
          <li>Open the browser console (F12) to see useEffect logs</li>
          <li>Read the "What's happening" section for each example</li>
          <li>Try modifying the code to experiment!</li>
        </ol>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TimerExample />
        <FetchDataExample />
        <LocalStorageExample />
        <DocumentTitleExample />
        <DebounceSearchExample />
      </div>

      <footer
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "30px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
        }}
      >
        <h3 style={{ color: "#2c3e50" }}>🎉 Congratulations!</h3>
        <p
          style={{
            color: "#7f8c8d",
            fontSize: "16px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          You've seen 5 different useEffect patterns. Now you understand:
          timers, API calls, localStorage, document manipulation, and
          debouncing. Keep practicing and you'll be a useEffect master! 🚀
        </p>
      </footer>
    </div>
  );
}

export default AllExamples;
