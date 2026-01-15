import { useState, useEffect } from "react";

/**
 * EXAMPLE 3: localStorage Synchronization
 *
 * What you'll learn:
 * - Syncing state with localStorage
 * - Persisting data across page refreshes
 * - Reading from localStorage on mount
 * - Writing to localStorage on state change
 */

function LocalStorageExample() {
  // Initialize from localStorage or use default
  const [name, setName] = useState(() => {
    const saved = localStorage.getItem("userName");
    return saved || "";
  });

  const [favoriteColor, setFavoriteColor] = useState(() => {
    const saved = localStorage.getItem("favoriteColor");
    return saved || "#3498db";
  });

  const [visitCount, setVisitCount] = useState(() => {
    const saved = localStorage.getItem("visitCount");
    return saved ? parseInt(saved) : 0;
  });

  // Save name to localStorage whenever it changes
  useEffect(() => {
    console.log("💾 Saving name to localStorage:", name);
    localStorage.setItem("userName", name);
  }, [name]);

  // Save color to localStorage whenever it changes
  useEffect(() => {
    console.log("💾 Saving color to localStorage:", favoriteColor);
    localStorage.setItem("favoriteColor", favoriteColor);
    document.body.style.backgroundColor = favoriteColor + "20"; // Add transparency
  }, [favoriteColor]);

  // Increment visit count on mount
  useEffect(() => {
    const currentCount = parseInt(localStorage.getItem("visitCount") || "0");
    const newCount = currentCount + 1;
    setVisitCount(newCount);
    localStorage.setItem("visitCount", newCount.toString());
    console.log("👋 Visit count:", newCount);
  }, []); // Empty array = run once on mount

  const clearData = () => {
    localStorage.clear();
    setName("");
    setFavoriteColor("#3498db");
    setVisitCount(0);
    document.body.style.backgroundColor = "";
    console.log("🗑️ localStorage cleared!");
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #1abc9c",
        borderRadius: "8px",
        margin: "10px",
        backgroundColor: "white",
      }}
    >
      <h2>💾 localStorage Example</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#e8f8f5",
          borderRadius: "5px",
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          👋 Welcome back! You've visited this page{" "}
          <span style={{ color: "#1abc9c" }}>{visitCount}</span> time(s)
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Your Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #bdc3c7",
            width: "100%",
            maxWidth: "300px",
          }}
        />
        {name && (
          <p
            style={{ color: "#1abc9c", fontWeight: "bold", marginTop: "10px" }}
          >
            Hello, {name}! 👋
          </p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Favorite Color:
        </label>
        <input
          type="color"
          value={favoriteColor}
          onChange={(e) => setFavoriteColor(e.target.value)}
          style={{
            padding: "5px",
            width: "100px",
            height: "50px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        />
        <span
          style={{ marginLeft: "10px", fontSize: "14px", color: "#7f8c8d" }}
        >
          {favoriteColor}
        </span>
      </div>

      <button
        onClick={clearData}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🗑️ Clear All Data
      </button>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#7f8c8d" }}>
        <p>
          💡 <strong>What's happening:</strong>
        </p>
        <ul style={{ textAlign: "left" }}>
          <li>Data is loaded from localStorage on mount</li>
          <li>Each state change is automatically saved to localStorage</li>
          <li>Try refreshing the page - your data persists!</li>
          <li>Visit count increases each time component mounts</li>
          <li>Background color changes with your selection</li>
        </ul>
      </div>
    </div>
  );
}

export default LocalStorageExample;
