// ============================================
// MAIN ENTRY POINT - React Router Setup
// ============================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// BrowserRouter: The main router component that enables routing in our app
// It uses HTML5 History API to keep UI in sync with URL
import { BrowserRouter } from "react-router-dom";

// Render the application
createRoot(document.getElementById("root")).render(
  // BrowserRouter must wrap the entire App to enable routing functionality
  // All Route, Link, and navigation components must be inside BrowserRouter
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
