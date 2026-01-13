import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

// Example Component using the custom hook
function CustomHookExample() {
  const [postId, setPostId] = useState(1);
  const { data, loading, error, refetch } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #ec4899",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>🎣 Example 7: Custom Hook (useFetch)</h2>
      <p style={{ color: "#666" }}>Reusable custom hook for API calls</p>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>
          Post ID:
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "2px solid #ec4899",
            width: "100px",
          }}
        />
        <button
          onClick={refetch}
          style={{
            marginLeft: "10px",
            padding: "8px 16px",
            backgroundColor: "#ec4899",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {loading && (
        <div style={{ padding: "20px", textAlign: "center", color: "#ec4899" }}>
          ⏳ Loading post...
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

      {data && !loading && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fdf2f8",
            borderRadius: "8px",
            border: "2px solid #ec4899",
          }}
        >
          <h3 style={{ color: "#ec4899", marginTop: 0 }}>
            Post #{data.id}: {data.title}
          </h3>
          <p style={{ color: "#666", lineHeight: "1.6" }}>{data.body}</p>

          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <strong>💡 Tip:</strong> This component uses a custom hook called{" "}
            <code>useFetch</code>. You can reuse this hook anywhere in your app!
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#fff7ed",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>📝 Custom Hook Code:</h4>
        <pre
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "5px",
            overflow: "auto",
            fontSize: "12px",
          }}
        >
          {`const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};`}
        </pre>
      </div>
    </div>
  );
}

export default CustomHookExample;
