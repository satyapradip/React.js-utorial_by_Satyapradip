import { useState } from 'react'
import axios from "axios";

// Example 1: Basic GET request with all three states
function BasicFetch() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #3b82f6",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>📋 Example 1: Basic Fetch with Button</h2>

      <button
        onClick={fetchUsers}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "15px",
        }}
      >
        {loading ? "Loading..." : "Fetch Users"}
      </button>

      {error && (
        <div
          style={{
            color: "red",
            padding: "10px",
            backgroundColor: "#fee",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          ❌ Error: {error}
        </div>
      )}

      {users.length > 0 && (
        <div>
          <h3>Users ({users.length}):</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {users.slice(0, 5).map((user) => (
              <li
                key={user.id}
                style={{
                  padding: "10px",
                  backgroundColor: "#f3f4f6",
                  margin: "5px 0",
                  borderRadius: "5px",
                }}
              >
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
          {users.length > 5 && <p>...and {users.length - 5} more</p>}
        </div>
      )}
    </div>
  );
}

export default BasicFetch;
