import { useState } from "react";
import axios from "axios";

// Example 6: Image Gallery from API
function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://picsum.photos/v2/list?page=1&limit=8"
      );
      setImages(response.data);
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
        border: "2px solid #06b6d4",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>🖼️ Example 6: Image Gallery</h2>
      <p style={{ color: "#666" }}>Fetch images from Picsum Photos API</p>

      <button
        onClick={fetchImages}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#06b6d4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      >
        {loading ? "Loading Images..." : "Load Gallery"}
      </button>

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

      {images.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {images.map((image) => (
            <div
              key={image.id}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
            >
              <img
                src={image.download_url}
                alt={image.author}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "10px", backgroundColor: "#f0fdfa" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#06b6d4",
                  }}
                >
                  📷 {image.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
