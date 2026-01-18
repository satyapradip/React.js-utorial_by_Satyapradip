# 🎓 React Context API - Complete Learning Guide

> A beginner-friendly guide to mastering React Context API

---

## 📚 Table of Contents

1. [What is Context API?](#-what-is-context-api)
2. [Why Use Context API?](#-why-use-context-api)
3. [Props Drilling vs Context API](#-props-drilling-vs-context-api)
4. [3 Steps to Use Context](#-3-steps-to-use-context)
5. [Project Structure](#-project-structure)
6. [Code Examples](#-code-examples)
7. [Best Practices](#-best-practices)
8. [Common Mistakes](#-common-mistakes)
9. [When NOT to Use Context](#-when-not-to-use-context)
10. [Practice Exercises](#-practice-exercises)

---

## 🤔 What is Context API?

Context API is React's built-in solution for **sharing data across multiple components** without passing props manually through every level.

Think of it like a **radio broadcast**:

- 📻 **Provider** = Radio Station (broadcasts data)
- 🎧 **Consumer** = Radio Listener (receives data)
- 📡 **Context** = Radio Frequency (the channel)

```
┌────────────────────────────────────────────────────┐
│                  CONTEXT PROVIDER                   │
│            (Broadcasts: theme, user, etc.)         │
│  ┌──────────────────────────────────────────────┐  │
│  │     Component A  ←── useContext ──→ ✅       │  │
│  │         │                                     │  │
│  │     Component B  ←── useContext ──→ ✅       │  │
│  │         │                                     │  │
│  │     Component C  ←── useContext ──→ ✅       │  │
│  └──────────────────────────────────────────────┘  │
│         ALL components receive the SAME data!       │
└────────────────────────────────────────────────────┘
```

---

## 💡 Why Use Context API?

### Without Context (Props Drilling 😩)

```jsx
// App → Navbar → Nav2 → Button (passing props through EVERY level!)

<App theme={theme}>
  <Navbar theme={theme}>
    <Nav2 theme={theme}>
      <Button theme={theme} /> // Finally gets the prop!
    </Nav2>
  </Navbar>
</App>
```

### With Context (Clean & Simple 🎉)

```jsx
// Any component can directly access the data!

<ThemeProvider>
  {" "}
  // Provides theme
  <App /> // Can use theme ✅
  <Navbar /> // Can use theme ✅
  <Nav2 /> // Can use theme ✅
  <Button /> // Can use theme ✅
</ThemeProvider>
```

---

## 🔄 Props Drilling vs Context API

| Aspect          | Props Drilling                 | Context API                         |
| --------------- | ------------------------------ | ----------------------------------- |
| **Data Flow**   | Parent → Child → GrandChild    | Provider → Any Component            |
| **Code**        | Repetitive                     | Clean                               |
| **Maintenance** | Hard (change props everywhere) | Easy (change in one place)          |
| **Best For**    | 1-2 levels deep                | Many levels deep                    |
| **Performance** | Better (more controlled)       | Good (but re-renders all consumers) |

---

## 📦 3 Steps to Use Context

### STEP 1: Create the Context

```jsx
// 📁 context/ThemeDataContext.js
import { createContext } from "react";

export const ThemeDataContext = createContext();
```

### STEP 2: Create Provider & Wrap App

```jsx
// 📁 context/ThemeContext.jsx
import { useState } from "react";
import { ThemeDataContext } from "./ThemeDataContext";

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState("Satya");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Share all values in an object
  const contextValue = {
    theme,
    setTheme,
    toggleTheme,
    user,
    setUser,
  };

  return (
    <ThemeDataContext.Provider value={contextValue}>
      {children}
    </ThemeDataContext.Provider>
  );
};

export default ThemeContextProvider;
```

```jsx
// 📁 main.jsx - Wrap your app
import ThemeContextProvider from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>,
);
```

### STEP 3: Use Context in Components

```jsx
// 📁 components/Navbar.jsx
import { useContext } from "react";
import { ThemeDataContext } from "../context/ThemeDataContext";

const Navbar = () => {
  // 🎯 Destructure what you need
  const { theme, toggleTheme, user } = useContext(ThemeDataContext);

  return (
    <div className={theme === "dark" ? "bg-gray-800" : "bg-white"}>
      <p>Welcome, {user}!</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

---

## 📁 Project Structure

```
src/
├── context/
│   ├── ThemeDataContext.js    ← STEP 1: createContext()
│   └── ThemeContext.jsx       ← STEP 2: Provider Component
├── components/
│   ├── Navbar.jsx             ← STEP 3: useContext()
│   └── Nav2.jsx               ← STEP 3: useContext()
├── App.jsx                    ← STEP 3: useContext()
└── main.jsx                   ← Wrap App with Provider
```

---

## 💻 Code Examples

### Example 1: Simple Theme Toggle

```jsx
// Get theme and toggle function
const { theme, toggleTheme } = useContext(ThemeDataContext);

// Use in JSX
<button onClick={toggleTheme}>
  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
</button>;
```

### Example 2: Update Context Value

```jsx
// Get setter function
const { user, setUser } = useContext(ThemeDataContext);

// Update from input
<input value={user} onChange={(e) => setUser(e.target.value)} />;
```

### Example 3: Conditional Styling

```jsx
const { theme } = useContext(ThemeDataContext);

<div
  className={`
  ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}
`}
>
  Content changes based on theme!
</div>;
```

---

## ✅ Best Practices

### 1. Separate Context and Provider Files

```
✅ GOOD:
context/
├── ThemeDataContext.js    ← Only createContext()
└── ThemeContext.jsx       ← Provider + State logic

❌ BAD:
context/
└── ThemeContext.jsx       ← Everything in one file (causes Fast Refresh issues)
```

### 2. Use Descriptive Names

```jsx
// ✅ GOOD
export const AuthContext = createContext();
export const ThemeContext = createContext();
export const CartContext = createContext();

// ❌ BAD
export const Context1 = createContext();
export const MyContext = createContext();
```

### 3. Provide Default Values

```jsx
// ✅ GOOD - Helps with TypeScript & debugging
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});
```

### 4. Destructure Context Values

```jsx
// ✅ GOOD - Only get what you need
const { theme, user } = useContext(ThemeDataContext);

// ❌ BAD - Gets everything
const context = useContext(ThemeDataContext);
console.log(context.theme, context.user);
```

### 5. Memoize Context Values (Advanced)

```jsx
// For better performance with complex values
const contextValue = useMemo(
  () => ({
    theme,
    toggleTheme,
    user,
  }),
  [theme, user],
);
```

---

## ❌ Common Mistakes

### Mistake 1: Forgetting to Wrap with Provider

```jsx
// ❌ ERROR: useContext returns undefined
<App />  // Not wrapped with Provider!

// ✅ CORRECT
<ThemeContextProvider>
  <App />
</ThemeContextProvider>
```

### Mistake 2: Not Importing the Correct Context

```jsx
// ❌ BAD - Importing Provider instead of Context
import ThemeContextProvider from "../context/ThemeContext";
const theme = useContext(ThemeContextProvider); // ERROR!

// ✅ GOOD - Import the Context itself
import { ThemeDataContext } from "../context/ThemeDataContext";
const { theme } = useContext(ThemeDataContext);
```

### Mistake 3: Context in Same File as Components

```jsx
// ❌ BAD - Causes Fast Refresh warning
// ThemeContext.jsx
export const ThemeContext = createContext();
const ThemeProvider = () => { ... }  // Component in same file!

// ✅ GOOD - Separate files
// ThemeDataContext.js → createContext()
// ThemeContext.jsx → Provider component
```

### Mistake 4: Using Context for Everything

```jsx
// ❌ BAD - Overkill for simple parent-child
<ButtonContext.Provider value={buttonColor}>
  <Button />  // Just pass as prop!
</ButtonContext.Provider>

// ✅ GOOD - Use props for simple cases
<Button color={buttonColor} />
```

---

## ⚠️ When NOT to Use Context

| Scenario                           | Use Instead                |
| ---------------------------------- | -------------------------- |
| Data for 1-2 components            | Props                      |
| Component-specific state           | useState                   |
| Server state (API data)            | React Query, SWR           |
| Complex state logic                | useReducer, Redux, Zustand |
| Frequent updates (every keystroke) | Local state                |

---

## 🏋️ Practice Exercises

### Exercise 1: Language Switcher

Create a context that stores the current language (`en`, `hi`, `es`) and allows switching between them.

### Exercise 2: Shopping Cart

Create a `CartContext` with:

- `items` array
- `addItem(item)` function
- `removeItem(id)` function
- `totalPrice` computed value

### Exercise 3: Authentication

Create an `AuthContext` with:

- `user` object (or null if not logged in)
- `login(username, password)` function
- `logout()` function
- `isAuthenticated` boolean

---

## 🎯 Quick Reference

```jsx
// 1. CREATE
const MyContext = createContext();

// 2. PROVIDE
<MyContext.Provider value={{ data, setData }}>{children}</MyContext.Provider>;

// 3. CONSUME
const { data, setData } = useContext(MyContext);
```

---

## 📖 Summary

| Concept               | Purpose                          |
| --------------------- | -------------------------------- |
| `createContext()`     | Creates the context object       |
| `<Context.Provider>`  | Makes data available to children |
| `value={}`            | The data being shared            |
| `useContext(Context)` | Hook to access the data          |
| `{children}`          | Components that can access data  |

---

## 🚀 Next Steps

After mastering Context API, learn:

1. **useReducer** - For complex state logic
2. **Custom Hooks** - Create `useTheme()`, `useAuth()`
3. **React Query** - For server state management
4. **Zustand/Redux** - For large-scale state management

---

Happy Learning! 🎉

Created by: Satya Pradip | React Learning Journey
