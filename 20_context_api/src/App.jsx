import { useContext } from "react";
import Navbar from "./components/Navbar";
import { ThemeDataContext } from "./context/ThemeDataContext";

// ============================================
// 🎓 APP COMPONENT - Using Context
// ============================================
// This component also has access to Context
// because it's wrapped by ThemeContextProvider in main.jsx

const App = () => {
  // Access context here too!
  const { theme, user, setUser } = useContext(ThemeDataContext);

  return (
    <div
      className={`min-h-screen transition-colors duration-300
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {/* Navbar uses context internally */}
      <Navbar />

      {/* Main content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">🎓 Context API Example</h1>

        <div
          className={`p-6 rounded-lg mb-6 ${theme === "dark" ? "bg-gray-800" : "bg-white shadow"}`}
        >
          <h2 className="text-xl font-semibold mb-4">
            📊 Current Context Values:
          </h2>
          <p className="mb-2">
            🎨 Theme: <strong>{theme}</strong>
          </p>
          <p className="mb-4">
            👤 User: <strong>{user}</strong>
          </p>

          {/* Change user name */}
          <div className="flex gap-2">
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Change user name..."
              className="px-4 py-2 border rounded text-gray-800 flex-1"
            />
          </div>
          <p className="text-sm mt-2 opacity-70">
            ↑ Type here and watch the name change in Navbar too! (Same context!)
          </p>
        </div>

        {/* Explanation Box */}
        <div
          className={`p-6 rounded-lg ${theme === "dark" ? "bg-blue-900/50" : "bg-blue-50"}`}
        >
          <h3 className="font-bold text-lg mb-2">💡 What's happening?</h3>
          <ul className="space-y-2 text-sm">
            <li>
              ✅ <strong>ThemeContextProvider</strong> wraps the entire app in
              main.jsx
            </li>
            <li>
              ✅ <strong>App, Navbar, Nav2</strong> all access the SAME context
            </li>
            <li>✅ When you change theme, ALL components update!</li>
            <li>✅ When you change user, it updates everywhere!</li>
            <li>✅ No props drilling needed! 🎉</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
