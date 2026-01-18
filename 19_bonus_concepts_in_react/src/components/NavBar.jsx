import React from "react";

// ============================================
// 🎓 CHILD COMPONENT: NavBar
// ============================================
// This component RECEIVES props from parent:
// - theme: the current theme value (to READ)
// - setTheme: a function to UPDATE parent's state (to WRITE)
// ============================================

// 📌 METHOD 1: Using props object
// const NavBar = (props) => {
//   return <button onClick={() => props.setTheme('dark')}>...</button>
// }

// 📌 METHOD 2: Destructuring props (RECOMMENDED - cleaner!)
const NavBar = ({ theme, setTheme }) => {
  // 📌 STEP 4: Child calls parent's function to send data UP
  const toggleTheme = () => {
    // Calculate new theme
    const newTheme = theme === "light" ? "dark" : "light";

    // Call parent's function with the new value
    // This is how child "talks" to parent! 🎉
    setTheme(newTheme);
  };

  return (
    <div className="p-4 border rounded-lg">
      <p className="mb-2">
        📍 Current theme in NavBar: <strong>{theme}</strong>
      </p>

      <button
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={toggleTheme}
      >
        🔄 Toggle to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* Alternative: Inline function */}
      {/* <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}> */}
    </div>
  );
};

export default NavBar;
