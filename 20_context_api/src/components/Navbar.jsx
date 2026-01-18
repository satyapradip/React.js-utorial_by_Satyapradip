import React, { useContext } from "react";
import Nav2 from "./Nav2";
import { ThemeDataContext } from "../context/ThemeDataContext";

// ============================================
// 📌 STEP 3: CONSUME THE CONTEXT (using useContext hook)
// ============================================
// useContext(ContextName) returns the value from Provider
// No more props drilling! 🎉

const Navbar = () => {
  // 🎯 Get ALL the shared data from context
  // We destructure to get only what we need
  const { theme, toggleTheme, user } = useContext(ThemeDataContext);

  // 💡 You can also get everything:
  // const contextData = useContext(ThemeDataContext);
  // console.log(contextData.theme, contextData.user);

  console.log("Current theme from context:", theme);
  console.log("Current user from context:", user);

  return (
    <div
      className={`flex p-4 justify-between items-center border-b-4 
      ${
        theme === "dark"
          ? "bg-gray-800 text-white border-gray-900"
          : "bg-teal-600 text-white border-teal-800"
      }`}
    >
      <h2 className="text-xl font-bold">🏠 Navbar</h2>

      <div className="flex items-center gap-4">
        {/* Nav2 can also use useContext - no need to pass props! */}
        <Nav2 />

        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-200 transition"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
