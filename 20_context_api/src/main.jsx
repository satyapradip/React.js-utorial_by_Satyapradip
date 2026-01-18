import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";

// ============================================
// 🎓 WRAPPING APP WITH CONTEXT PROVIDER
// ============================================
// ThemeContextProvider wraps <App />
// This means App and ALL its children can access the context!
//
// Component Tree:
// ThemeContextProvider (has the state)
//   └── App (can use context ✅)
//       └── Navbar (can use context ✅)
//           └── Nav2 (can use context ✅)
// ============================================

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </StrictMode>,
);
