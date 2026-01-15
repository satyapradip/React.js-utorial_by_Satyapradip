import { useState, useEffect } from "react";

/**
 * EXAMPLE 5: Debounced Search
 *
 * What you'll learn:
 * - Debouncing user input
 * - Using cleanup to cancel timers
 * - Optimizing API calls
 * - Real-world search implementation
 */

function DebounceSearchExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  // Debounce the search term
  useEffect(() => {
    console.log("⌛ User is typing:", searchTerm);

    // Wait 500ms after user stops typing
    const timer = setTimeout(() => {
      console.log("✅ 500ms passed, updating debounced term");
      setDebouncedTerm(searchTerm);
    }, 500);

    // Cleanup: Cancel the timer if user types again
    return () => {
      console.log("🧹 Cleanup: User typed again, canceling previous timer");
      clearTimeout(timer);
    };
  }, [searchTerm]); // Run when searchTerm changes

  // Perform search when debouncedTerm changes
  useEffect(() => {
    if (debouncedTerm.trim() === "") {
      setResults([]);
      return;
    }

    console.log("🔍 Performing search for:", debouncedTerm);
    setIsSearching(true);
    setSearchCount((prev) => prev + 1);

    // Simulate API call
    fetch(
      `https://jsonplaceholder.typicode.com/users?name_like=${debouncedTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Search results received:", data.length, "results");
        setResults(data);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("❌ Search error:", error);
        setIsSearching(false);
      });
  }, [debouncedTerm]); // Run when debouncedTerm changes

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #2ecc71",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>🔍 Debounced Search Example</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users... (try typing quickly)"
          style={{
            padding: "12px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "2px solid #2ecc71",
            width: "100%",
            maxWidth: "400px",
          }}
        />
      </div>

      <div
        style={{
          padding: "10px",
          backgroundColor: "#e8f8f5",
          borderRadius: "5px",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        <p>
          <strong>Search Term:</strong> {searchTerm || "(empty)"}
        </p>
        <p>
          <strong>Debounced Term:</strong> {debouncedTerm || "(empty)"}
        </p>
        <p>
          <strong>API Calls Made:</strong> {searchCount}
        </p>
        <p style={{ color: "#7f8c8d", fontSize: "12px", marginTop: "10px" }}>
          💡 Notice: API call happens 500ms after you stop typing!
        </p>
      </div>

      {isSearching && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#f39c12",
            color: "white",
            borderRadius: "5px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          ⏳ Searching...
        </div>
      )}

      {!isSearching && results.length > 0 && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#d5f4e6",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#2ecc71", marginTop: 0 }}>
            Found {results.length} result(s)
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((user) => (
              <li
                key={user.id}
                style={{
                  padding: "10px",
                  backgroundColor: "white",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #2ecc71",
                }}
              >
                <strong>{user.name}</strong>
                <div style={{ fontSize: "14px", color: "#7f8c8d" }}>
                  📧 {user.email}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isSearching && debouncedTerm && results.length === 0 && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#ffe6e6",
            borderRadius: "5px",
            marginBottom: "20px",
            color: "#e74c3c",
          }}
        >
          No results found for "{debouncedTerm}"
        </div>
      )}

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#7f8c8d" }}>
        <p>
          💡 <strong>What's happening:</strong>
        </p>
        <ul style={{ textAlign: "left" }}>
          <li>First useEffect sets a 500ms timer when you type</li>
          <li>If you type again, cleanup cancels the old timer</li>
          <li>After 500ms of no typing, debouncedTerm updates</li>
          <li>Second useEffect performs the search</li>
          <li>This prevents making an API call for every keystroke!</li>
          <li>
            <strong>Try typing quickly and watch the API call count!</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DebounceSearchExample;
