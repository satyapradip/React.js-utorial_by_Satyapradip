import React, { useState } from "react";
import NavBar from "./components/NavBar";
import PropsDrillingExample from "./components/PropsDrillingExample";

// ============================================
// 🎓 LESSON: Props Drilling & Child to Parent Communication
// ============================================
//
// In React, data flows ONE WAY: Parent → Child (via props)
// But sometimes child needs to UPDATE parent's state!
//
// Solution: Pass a FUNCTION from parent to child
// Child calls that function to "communicate" back to parent
// ============================================

const App = () => {
  // 📌 STEP 1: State lives in the PARENT component
  // Why? Because parent needs to know about theme changes
  const [theme, setTheme] = useState("light");
  const [showDrillingExample, setShowDrillingExample] = useState(false);

  // 📌 STEP 2: Create a handler function (optional but cleaner)
  // This function will be passed to child
  const handleThemeChange = (newTheme) => {
    console.log("Child told parent to change theme to:", newTheme);
    setTheme(newTheme);
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <h1 className="text-3xl font-bold mb-4">🎨 Current Theme: {theme}</h1>
      <p className="mb-4 text-lg">This text color changes based on theme!</p>

      {/* 📌 STEP 3: Pass BOTH state AND function as props */}
      {/* theme = current value (for child to READ) */}
      {/* setTheme = function (for child to WRITE/UPDATE) */}
      <NavBar theme={theme} setTheme={handleThemeChange} />

      {/* Toggle to show advanced example */}
      <div className="mt-8">
        <button
          onClick={() => setShowDrillingExample(!showDrillingExample)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          {showDrillingExample ? "🙈 Hide" : "👀 Show"} Props Drilling Deep
          Example
        </button>
      </div>

      {/* Advanced Props Drilling Example */}
      {showDrillingExample && (
        <div className="mt-6">
          <PropsDrillingExample />
        </div>
      )}
    </div>
  );
};

export default App;
