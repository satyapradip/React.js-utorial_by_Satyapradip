import { useState } from "react";
import axios from "axios";

// Example 5: POST Request - Creating Data
function CreateData() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData
      );
      setResponse(res.data);
      // Reset form
      setFormData({ title: "", body: "", userId: 1 });
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
        border: "2px solid #ef4444",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>✉️ Example 5: POST Request (Create Data)</h2>
      <p style={{ color: "#666" }}>Submit form data to API</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Title:
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "2px solid #ef4444",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Body:
          </label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            required
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "2px solid #ef4444",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 24px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Submitting..." : "Create Post"}
        </button>
      </form>

      {error && (
        <div
          style={{
            color: "#ef4444",
            padding: "15px",
            backgroundColor: "#fee",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          ❌ Error: {error}
        </div>
      )}

      {response && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#fef2f2",
            borderRadius: "8px",
            border: "2px solid #ef4444",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#ef4444" }}>
            ✅ Post Created Successfully!
          </h3>
          <pre
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto",
              fontSize: "14px",
            }}
          >
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default CreateData;
