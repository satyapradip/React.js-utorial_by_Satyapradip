import React, { useState } from "react";
import { ThemeDataContext } from "./ThemeDataContext";

// ============================================
// 🎓 CONTEXT API - Complete Guide
// ============================================
//
// 🤔 WHAT IS CONTEXT API?
// Context provides a way to pass data through the component tree
// WITHOUT having to pass props manually at every level (no more props drilling!)
//
// 🎯 WHEN TO USE CONTEXT?
// - Theme (light/dark mode)
// - User authentication (logged in user data)
// - Language preferences
// - Shopping cart data
// - Any data needed by MANY components
//
// ============================================
// 📦 3 STEPS TO USE CONTEXT:
// ============================================
// STEP 1: Create Context → createContext() [in ThemeDataContext.js]
// STEP 2: Provide Context → <Context.Provider value={...}>
// STEP 3: Consume Context → useContext(Context)
// ============================================

// NOTE: createContext() is now in ThemeDataContext.js
// This is a BEST PRACTICE to avoid Fast Refresh issues!

// ============================================
// 📌 STEP 2: CREATE THE PROVIDER COMPONENT
// ============================================
// The Provider "broadcasts" the data to all children
// Any component inside Provider can access the data

const ThemeContextProvider = ({ children }) => {
  // State that we want to share across ALL components
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState("Satya");

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // 💡 TIP: You can share multiple values using an object
  const contextValue = {
    theme, // current theme value
    setTheme, // function to set theme directly
    toggleTheme, // function to toggle theme
    user, // user name
    setUser, // function to change user
  };

  return (
    // The Provider wraps children and gives them access to contextValue
    // Every component inside {children} can now access theme, user, etc.
    <ThemeDataContext.Provider value={contextValue}>
      {children}
    </ThemeDataContext.Provider>
  );
};

export default ThemeContextProvider;

// ============================================
// 📚 SUMMARY:
// ============================================
// 1. createContext() - Creates the context
// 2. Provider - Wraps components that need access
// 3. value={} - Data that will be shared
// 4. {children} - Components that will receive the data
// ============================================
