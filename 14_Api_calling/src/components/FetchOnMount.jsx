import { useState, useEffect } from "react";
import axios from "axios";

// Example 2: Fetch on component mount using useEffect
function FetchOnMount() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This runs automatically when component mounts
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data.slice(0, 6)); // Get first 6 posts
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array = run once on mount

  if (loading) {
    return (
      <div
        style={{
          padding: "20px",
          border: "2px solid #10b981",
          borderRadius: "8px",
        }}
      >
        <h2>🔄 Example 2: Fetch on Mount</h2>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div className="spinner">⏳ Loading posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          border: "2px solid #10b981",
          borderRadius: "8px",
        }}
      >
        <h2>🔄 Example 2: Fetch on Mount</h2>
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
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #10b981",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>🔄 Example 2: Fetch on Mount</h2>
      <p style={{ color: "#666" }}>
        Data loaded automatically when component appeared!
      </p>

      <div style={{ display: "grid", gap: "15px" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              padding: "15px",
              backgroundColor: "#f0fdf4",
              borderRadius: "8px",
              borderLeft: "4px solid #10b981",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#10b981" }}>
              {post.id}. {post.title}
            </h3>
            <p style={{ margin: 0, color: "#666" }}>
              {post.body.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchOnMount;
