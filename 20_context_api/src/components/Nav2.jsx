import React, { useContext } from "react";
import { ThemeDataContext } from "../context/ThemeDataContext";

// ============================================
// 🎯 MAGIC OF CONTEXT API!
// ============================================
// This component gets data directly from Context
// WITHOUT receiving it as props from parent!
//
// Before Context: App → Navbar → Nav2 (props drilling 😩)
// With Context:   Nav2 directly reads from Context! 🎉
// ============================================

const Nav2 = () => {
  // 🎯 Directly access context - no props needed!
  const { theme, user } = useContext(ThemeDataContext);

  // Using theme for dynamic styling
  const hoverClass =
    theme === "dark" ? "hover:text-gray-300" : "hover:text-teal-200";

  return (
    <div className="flex gap-6 items-center">
      <h4 className={`cursor-pointer ${hoverClass} transition`}>Home</h4>
      <h4 className={`cursor-pointer ${hoverClass} transition`}>About</h4>
      <h4 className={`cursor-pointer ${hoverClass} transition`}>Contact</h4>
      <h4 className={`cursor-pointer ${hoverClass} transition`}>Services</h4>

      {/* Display user from context */}
      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
        👤 {user}
      </span>
    </div>
  );
};

export default Nav2;
