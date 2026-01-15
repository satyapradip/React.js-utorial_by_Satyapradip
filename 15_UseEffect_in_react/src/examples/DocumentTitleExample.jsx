import { useState, useEffect } from "react";

/**
 * EXAMPLE 4: Dynamic Document Title
 *
 * What you'll learn:
 * - Updating browser tab title
 * - Cleanup to reset title
 * - Multiple effects working together
 */

function DocumentTitleExample() {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [pageTitle, setPageTitle] = useState("React App");

  // Update document title with count
  useEffect(() => {
    document.title = `Count: ${count} | ${pageTitle}`;
    console.log("📝 Document title updated:", document.title);

    // Cleanup: Reset title when component unmounts
    return () => {
      document.title = "React App";
      console.log("🧹 Title reset to default");
    };
  }, [count, pageTitle]);

  // Simulate notifications
  useEffect(() => {
    if (notifications > 0) {
      document.title = `(${notifications}) ${pageTitle}`;

      // Optional: Flash the title
      const interval = setInterval(() => {
        document.title = document.title.startsWith("(")
          ? pageTitle
          : `(${notifications}) ${pageTitle}`;
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [notifications, pageTitle]);

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #e67e22",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>📄 Document Title Example</h2>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Page Title:
        </label>
        <input
          type="text"
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          placeholder="Enter page title"
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #bdc3c7",
            width: "100%",
            maxWidth: "300px",
          }}
        />
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#fef5e7",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "#e67e22" }}>Counter: {count}</h3>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Increment
        </button>
        <button
          onClick={() => setCount(0)}
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
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: notifications > 0 ? "#ffe6e6" : "#e8f8f5",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: notifications > 0 ? "#e74c3c" : "#1abc9c" }}>
          🔔 Notifications: {notifications}
        </h3>
        <button
          onClick={() => setNotifications(notifications + 1)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          New Notification
        </button>
        <button
          onClick={() => setNotifications(0)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Clear Notifications
        </button>
      </div>

      <div
        style={{
          padding: "15px",
          backgroundColor: "#d6eaf8",
          borderRadius: "5px",
          border: "1px solid #3498db",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold", color: "#2c3e50" }}>
          👆 Look at your browser tab! The title is changing dynamically.
        </p>
      </div>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#7f8c8d" }}>
        <p>
          💡 <strong>What's happening:</strong>
        </p>
        <ul style={{ textAlign: "left" }}>
          <li>Browser tab title updates when count or pageTitle changes</li>
          <li>Notifications cause the title to flash</li>
          <li>Multiple useEffect hooks manage different aspects</li>
          <li>Cleanup functions reset state when component unmounts</li>
        </ul>
      </div>
    </div>
  );
}

export default DocumentTitleExample;
