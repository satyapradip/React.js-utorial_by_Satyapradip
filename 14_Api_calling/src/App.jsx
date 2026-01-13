import React, { useState } from "react";
import "./App.css";

// Import all example components
import BasicFetch from "./components/BasicFetch";
import FetchOnMount from "./components/FetchOnMount";
import DynamicFetch from "./components/DynamicFetch";
import SearchWithDebounce from "./components/SearchWithDebounce";
import CreateData from "./components/CreateData";
import ImageGallery from "./components/ImageGallery";
import CustomHookExample from "./components/CustomHookExample";

const App = () => {
  const [activeTab, setActiveTab] = useState("all");

  const examples = [
    { id: "basic", title: "1. Basic Fetch", component: <BasicFetch /> },
    { id: "mount", title: "2. Fetch on Mount", component: <FetchOnMount /> },
    { id: "dynamic", title: "3. Dynamic Fetch", component: <DynamicFetch /> },
    { id: "search", title: "4. Search", component: <SearchWithDebounce /> },
    { id: "post", title: "5. POST Request", component: <CreateData /> },
    { id: "images", title: "6. Image Gallery", component: <ImageGallery /> },
    { id: "hook", title: "7. Custom Hook", component: <CustomHookExample /> },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "20px",
      }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "30px",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{ margin: "0 0 10px 0", fontSize: "2.5rem", color: "#1f2937" }}
        >
          🚀 Master API Calls in React
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.1rem", margin: "10px 0" }}>
          Complete Guide with 7 Practical Examples
        </p>
        <div style={{ marginTop: "20px", fontSize: "14px", color: "#6b7280" }}>
          <p>
            📖 Read the guides: <strong>API_CALLING_GUIDE.md</strong> &{" "}
            <strong>QUICK_REFERENCE.md</strong>
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <button
          onClick={() => setActiveTab("all")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "all" ? "#3b82f6" : "#e5e7eb",
            color: activeTab === "all" ? "white" : "#374151",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            transition: "all 0.2s",
          }}
        >
          📚 Show All Examples
        </button>
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => setActiveTab(example.id)}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === example.id ? "#3b82f6" : "#e5e7eb",
              color: activeTab === example.id ? "white" : "#374151",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {activeTab === "all" ? (
          // Show all examples
          <div>
            <div
              style={{
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#dbeafe",
                borderRadius: "8px",
                textAlign: "center",
                color: "#1e40af",
              }}
            >
              💡 <strong>Tip:</strong> Click on individual example buttons above
              to focus on one example at a time
            </div>
            {examples.map((example) => (
              <div key={example.id}>{example.component}</div>
            ))}
          </div>
        ) : (
          // Show selected example
          <div>
            {examples.find((ex) => ex.id === activeTab)?.component}

            {/* Learning Tips */}
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#1f2937" }}>
                💡 Learning Tips
              </h3>
              <ul style={{ lineHeight: "1.8", color: "#4b5563" }}>
                <li>
                  Open <strong>DevTools → Network Tab</strong> to see API
                  requests
                </li>
                <li>
                  Open <strong>DevTools → Console</strong> to see any errors
                </li>
                <li>
                  Examine the component code in <code>src/components/</code>
                </li>
                <li>Try modifying the code and see what happens!</li>
                <li>
                  Read the comprehensive guide in{" "}
                  <strong>API_CALLING_GUIDE.md</strong>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "50px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          color: "#6b7280",
        }}
      >
        <p>
          🎯 Practice each example • Modify the code • Build your own projects
        </p>
        <p style={{ fontSize: "14px", marginTop: "10px" }}>
          Happy Learning! 🚀
        </p>
      </footer>
    </div>
  );
};

export default App;
