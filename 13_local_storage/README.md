# 📦 localStorage in React - Complete Guide

## 🎯 What is localStorage?

**localStorage** is a web storage API that allows you to store data in the browser that persists even after:

- Closing the browser
- Refreshing the page
- Restarting the computer

Think of it as a **permanent storage box** in your browser!

---

## 📚 Basic Concepts

### Storage Characteristics:

- **Data Type:** Only stores **strings**
- **Capacity:** 5-10 MB (varies by browser)
- **Persistence:** Data never expires (manual deletion required)
- **Scope:** Domain-specific (each website has its own storage)
- **Accessibility:** Synchronous (blocking) operations

---

## 🔧 Basic Operations

### 1️⃣ **Store Data**

```javascript
localStorage.setItem("key", "value");
localStorage.setItem("username", "Satyapradip");
```

### 2️⃣ **Retrieve Data**

```javascript
const value = localStorage.getItem("key");
const username = localStorage.getItem("username");
console.log(username); // "Satyapradip"
```

### 3️⃣ **Remove Specific Item**

```javascript
localStorage.removeItem("username");
```

### 4️⃣ **Clear All Data**

```javascript
localStorage.clear();
```

### 5️⃣ **Check if Key Exists**

```javascript
if (localStorage.getItem("username") !== null) {
  console.log("Username exists!");
}
```

---

## 🎨 Working with Objects & Arrays

### ❌ **WRONG WAY:**

```javascript
const user = { name: "John", age: 25 };
localStorage.setItem("user", user); // Stores "[object Object]" ❌
```

### ✅ **CORRECT WAY:**

**Storing Objects:**

```javascript
const user = { name: "John", age: 25 };
localStorage.setItem("user", JSON.stringify(user)); // Convert to JSON string
```

**Retrieving Objects:**

```javascript
const userString = localStorage.getItem("user");
const user = JSON.parse(userString); // Convert back to object
console.log(user.name); // "John"
```

**Storing Arrays:**

```javascript
const todos = ["Learn React", "Build Project", "Deploy"];
localStorage.setItem("todos", JSON.stringify(todos));

// Retrieve
const savedTodos = JSON.parse(localStorage.getItem("todos"));
```

---

## ⚛️ localStorage in React

### Pattern 1: **Load Data on Mount**

```javascript
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  // Load saved theme when component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []); // Empty dependency array = runs once on mount

  return <div className={theme}>Content</div>;
}
```

### Pattern 2: **Save Data When State Changes**

```javascript
import { useState, useEffect } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Load todos on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return <div>Todo List</div>;
}
```

### Pattern 3: **Custom Hook for localStorage**

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage:
function App() {
  const [name, setName] = useLocalStorage("name", "");
  const [count, setCount] = useLocalStorage("count", 0);
}
```

---

## 🎯 Common Use Cases

### 1. **User Preferences**

```javascript
// Save theme preference
const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
};
```

### 2. **Form Data Persistence**

```javascript
const handleInputChange = (e) => {
  const formData = { ...form, [e.target.name]: e.target.value };
  setForm(formData);
  localStorage.setItem("formData", JSON.stringify(formData));
};
```

### 3. **Shopping Cart**

```javascript
const addToCart = (item) => {
  const updatedCart = [...cart, item];
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};
```

### 4. **Recently Viewed Items**

```javascript
const addToRecentlyViewed = (product) => {
  let recent = JSON.parse(localStorage.getItem("recent") || "[]");
  recent = [product, ...recent.slice(0, 9)]; // Keep last 10
  localStorage.setItem("recent", JSON.stringify(recent));
};
```

---

## ⚠️ Important Considerations

### **Security:**

- ❌ **NEVER** store sensitive data (passwords, tokens, credit cards)
- ❌ Data is **NOT encrypted**
- ❌ Accessible via JavaScript (vulnerable to XSS attacks)
- ✅ Use **httpOnly cookies** or **sessionStorage** for sensitive data

### **Error Handling:**

```javascript
// localStorage can throw errors (quota exceeded, private browsing)
try {
  localStorage.setItem("key", "value");
} catch (error) {
  console.error("localStorage error:", error);
  // Handle fallback (use memory, show message, etc.)
}
```

### **Check Before Parsing:**

```javascript
const getData = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Parse error:", error);
      return null;
    }
  }
  return null;
};
```

---

## 🆚 localStorage vs sessionStorage vs Cookies

| Feature            | localStorage    | sessionStorage  | Cookies             |
| ------------------ | --------------- | --------------- | ------------------- |
| **Persistence**    | Permanent       | Session only    | Configurable        |
| **Capacity**       | 5-10 MB         | 5-10 MB         | 4 KB                |
| **Sent to Server** | No              | No              | Yes (every request) |
| **Access**         | JavaScript only | JavaScript only | JavaScript + Server |
| **Scope**          | Same origin     | Same tab/window | Domain + path       |

---

## 🛠️ Debugging localStorage

### **View in DevTools:**

1. Open **Chrome DevTools** (F12)
2. Go to **Application** tab
3. Expand **Local Storage**
4. Click on your domain
5. See all key-value pairs

### **Console Commands:**

```javascript
// View all items
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}

// Check storage size
const size = new Blob(Object.values(localStorage)).size;
console.log(`localStorage size: ${size} bytes`);
```

---

## 📝 Best Practices

1. **Always use try-catch** for localStorage operations
2. **Validate data** before storing and after retrieving
3. **Use meaningful keys** (e.g., 'user_preferences' not 'up')
4. **Set size limits** for stored data
5. **Clean up old data** periodically
6. **Don't store sensitive information**
7. **Provide fallbacks** for when localStorage is unavailable
8. **Use JSON** for complex data structures

---

## 🚀 Quick Reference

```javascript
// Store
localStorage.setItem("key", "value");
localStorage.setItem("user", JSON.stringify({ name: "John" }));

// Retrieve
const value = localStorage.getItem("key");
const user = JSON.parse(localStorage.getItem("user"));

// Remove
localStorage.removeItem("key");

// Clear all
localStorage.clear();

// Get number of items
const count = localStorage.length;

// Get key by index
const key = localStorage.key(0);
```

---

## 🎓 Learning Resources

- [MDN localStorage Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- React Hooks for localStorage patterns

---

## 🏆 Project Examples

Check [App.jsx](src/App.jsx) for practical examples of:

- Storing simple strings
- Storing and retrieving objects
- Using JSON.stringify and JSON.parse
- Removing items
- Clearing storage

---

## 💡 Next Steps

1. Run the demo app: `npm run dev`
2. Open DevTools → Application → Local Storage
3. Experiment with different data types
4. Try building a todo app with localStorage
5. Create a theme switcher
6. Build a form with auto-save functionality

---

**Happy Coding! 🚀**
