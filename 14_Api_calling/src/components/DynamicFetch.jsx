import { useState, useEffect } from "react";
import axios from "axios";

// Example 3: Fetch with dynamic parameters (dependency array)
function DynamicFetch() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This runs whenever userId changes
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Runs when userId changes

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #f59e0b",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>🔀 Example 3: Dynamic Fetch (Dependencies)</h2>
      <p style={{ color: "#666" }}>Data re-fetches when userId changes!</p>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>
          Select User ID:
        </label>
        <select
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "2px solid #f59e0b",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
            <option key={id} value={id}>
              User {id}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div style={{ padding: "20px", textAlign: "center", color: "#f59e0b" }}>
          ⏳ Loading user data...
        </div>
      )}

      {error && (
        <div
          style={{
            color: "red",
            padding: "10px",
            backgroundColor: "#fee",
            borderRadius: "5px",
          }}
        >
          ❌ Error: {error}
        </div>
      )}

      {user && !loading && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fffbeb",
            borderRadius: "8px",
            border: "2px solid #f59e0b",
          }}
        >
          <h3 style={{ margin: "0 0 15px 0", color: "#f59e0b" }}>
            👤 {user.name}
          </h3>
          <div style={{ lineHeight: "1.8" }}>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong> {user.website}
            </p>
            <p>
              <strong>Company:</strong> {user.company.name}
            </p>
            <p>
              <strong>City:</strong> {user.address.city}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DynamicFetch;
