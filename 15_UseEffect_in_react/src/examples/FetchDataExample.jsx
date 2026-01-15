import { useState, useEffect } from "react";

/**
 * EXAMPLE 2: Fetching Data from API
 *
 * What you'll learn:
 * - Fetching data on component mount
 * - Handling loading states
 * - Handling errors
 * - Re-fetching when dependencies change
 */

function FetchDataExample() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`🔄 Fetching user ${userId}...`);

    // Reset states
    setLoading(true);
    setError(null);

    // Fetch data
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        console.log("✅ Data received:", data);
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("❌ Error:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]); // Re-fetch when userId changes

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #9b59b6",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>👤 Fetch Data Example</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>
          Select User ID:
        </label>
        <select
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          style={{ padding: "8px", fontSize: "16px", borderRadius: "5px" }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
            <option key={id} value={id}>
              User {id}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f39c12",
            color: "white",
            borderRadius: "5px",
          }}
        >
          ⏳ Loading user data...
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#e74c3c",
            color: "white",
            borderRadius: "5px",
          }}
        >
          ❌ Error: {error}
        </div>
      )}

      {!loading && !error && user && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#ecf0f1",
            borderRadius: "5px",
            textAlign: "left",
          }}
        >
          <h3 style={{ color: "#9b59b6" }}>{user.name}</h3>
          <p>
            <strong>📧 Email:</strong> {user.email}
          </p>
          <p>
            <strong>📱 Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>🌐 Website:</strong> {user.website}
          </p>
          <p>
            <strong>🏢 Company:</strong> {user.company.name}
          </p>
          <p>
            <strong>📍 City:</strong> {user.address.city}
          </p>
        </div>
      )}

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#7f8c8d" }}>
        <p>
          💡 <strong>What's happening:</strong>
        </p>
        <ul style={{ textAlign: "left" }}>
          <li>useEffect runs when userId changes</li>
          <li>We show loading state while fetching</li>
          <li>We handle errors gracefully</li>
          <li>Data is displayed once loaded</li>
          <li>Changing the select will trigger a new fetch</li>
        </ul>
      </div>
    </div>
  );
}

export default FetchDataExample;
