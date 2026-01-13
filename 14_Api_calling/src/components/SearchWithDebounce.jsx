import { useState, useEffect } from "react";
import axios from "axios";

// Example 4: Search with Debouncing
function SearchWithDebounce() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Debouncing: Wait for user to stop typing before searching
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        searchUsers(searchTerm);
      } else {
        setResults([]);
      }
    }, 500); // Wait 500ms after user stops typing

    // Cleanup function - cancels the previous timeout
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const searchUsers = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const filtered = response.data.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #8b5cf6",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>🔍 Example 4: Search with Debouncing</h2>
      <p style={{ color: "#666" }}>
        Search waits 500ms after you stop typing (performance optimization)
      </p>

      <input
        type="text"
        placeholder="Search users by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          border: "2px solid #8b5cf6",
          borderRadius: "8px",
          marginBottom: "15px",
          boxSizing: "border-box",
        }}
      />

      {loading && (
        <div style={{ textAlign: "center", color: "#8b5cf6", padding: "10px" }}>
          🔄 Searching...
        </div>
      )}

      {searchTerm && !loading && results.length === 0 && (
        <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
          No users found matching "{searchTerm}"
        </div>
      )}

      {results.length > 0 && (
        <div>
          <p style={{ color: "#8b5cf6", fontWeight: "bold" }}>
            Found {results.length} result(s):
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((user) => (
              <li
                key={user.id}
                style={{
                  padding: "15px",
                  backgroundColor: "#faf5ff",
                  margin: "8px 0",
                  borderRadius: "8px",
                  borderLeft: "4px solid #8b5cf6",
                }}
              >
                <div style={{ fontWeight: "bold", color: "#8b5cf6" }}>
                  {user.name}
                </div>
                <div style={{ color: "#666", fontSize: "14px" }}>
                  {user.email}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchWithDebounce;
