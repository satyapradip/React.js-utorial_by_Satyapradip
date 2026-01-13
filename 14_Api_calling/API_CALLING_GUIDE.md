# 🚀 Complete Guide to API Calls in React

## Table of Contents

1. [Introduction](#introduction)
2. [Core Concepts](#core-concepts)
3. [Methods to Make API Calls](#methods-to-make-api-calls)
4. [useState & useEffect Hooks](#usestate--useeffect-hooks)
5. [Loading States & Error Handling](#loading-states--error-handling)
6. [Best Practices](#best-practices)
7. [Common Patterns](#common-patterns)
8. [Advanced Topics](#advanced-topics)

---

## Introduction

**What are API Calls?**
API calls allow your React application to communicate with external servers to fetch, send, update, or delete data. Think of it as your app making a phone call to a server to get or send information.

**Why Learn API Calls?**

- Fetch real-time data (weather, news, user profiles)
- Submit forms (login, registration, contact forms)
- Build dynamic applications
- Create full-stack applications

---

## Core Concepts

### 1. HTTP Methods

| Method      | Purpose              | Example Use Case                     |
| ----------- | -------------------- | ------------------------------------ |
| `GET`       | Retrieve data        | Fetch user list, get product details |
| `POST`      | Create new data      | Submit form, create new user         |
| `PUT/PATCH` | Update existing data | Edit profile, update settings        |
| `DELETE`    | Remove data          | Delete account, remove item          |

### 2. Request-Response Cycle

```
Your React App → HTTP Request → Server
Your React App ← HTTP Response ← Server
```

### 3. Asynchronous Nature

API calls are **asynchronous** - they take time to complete. You must handle:

- **Loading state** - while waiting for response
- **Success state** - when data arrives
- **Error state** - if something goes wrong

---

## Methods to Make API Calls

### Method 1: Fetch API (Built-in JavaScript)

**Pros:**

- No installation needed
- Native to JavaScript
- Lightweight

**Cons:**

- More verbose
- Doesn't reject on HTTP errors (404, 500)
- Manual JSON parsing

```javascript
// Basic GET request
const getData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

// POST request with fetch
const postData = async () => {
  try {
    const response = await fetch("https://api.example.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John",
        email: "john@example.com",
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### Method 2: Axios (Popular Library)

**Pros:**

- Cleaner syntax
- Automatic JSON transformation
- Better error handling
- Request/response interceptors
- Cancel requests

**Cons:**

- Requires installation: `npm install axios`

```javascript
import axios from "axios";

// Basic GET request
const getData = async () => {
  try {
    const response = await axios.get("https://api.example.com/data");
    console.log(response.data); // Already parsed JSON
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// POST request with axios
const postData = async () => {
  try {
    const response = await axios.post("https://api.example.com/users", {
      name: "John",
      email: "john@example.com",
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

---

## useState & useEffect Hooks

### Why These Hooks?

- **useState**: Store API response data, loading state, and errors
- **useEffect**: Trigger API calls when component mounts or dependencies change

### Basic Pattern

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This runs when component mounts
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty array = run once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Loading States & Error Handling

### The Three States Pattern

Every API call should handle three states:

```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

### Complete Example with All States

```javascript
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://api.example.com/data");
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

---

## Best Practices

### 1. ✅ Always Handle Errors

```javascript
// ❌ BAD - No error handling
const getData = async () => {
  const response = await axios.get("/api/data");
  setData(response.data);
};

// ✅ GOOD - Proper error handling
const getData = async () => {
  try {
    const response = await axios.get("/api/data");
    setData(response.data);
  } catch (error) {
    setError(error.message);
  }
};
```

### 2. ✅ Use Loading States

```javascript
// ❌ BAD - No loading feedback
const getData = async () => {
  const response = await axios.get("/api/data");
  setData(response.data);
};

// ✅ GOOD - Clear loading state
const getData = async () => {
  setLoading(true);
  try {
    const response = await axios.get("/api/data");
    setData(response.data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### 3. ✅ Cleanup in useEffect

```javascript
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/data", {
        signal: controller.signal,
      });
      setData(response.data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    }
  };

  fetchData();

  // Cleanup function - cancels request if component unmounts
  return () => controller.abort();
}, []);
```

### 4. ✅ Use Environment Variables for API URLs

```javascript
// In .env file
VITE_API_BASE_URL=https://api.example.com

// In your code
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const response = await axios.get(`${API_BASE_URL}/users`);
```

### 5. ✅ Create Custom Hooks for Reusability

```javascript
// hooks/useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage in component
function MyComponent() {
  const { data, loading, error } = useFetch("https://api.example.com/data");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

---

## Common Patterns

### Pattern 1: Fetch on Mount

```javascript
useEffect(() => {
  fetchData();
}, []); // Runs once when component mounts
```

### Pattern 2: Fetch on Button Click

```javascript
<button onClick={fetchData}>Load Data</button>
```

### Pattern 3: Fetch with Dependencies

```javascript
const [userId, setUserId] = useState(1);

useEffect(() => {
  fetchUserData(userId);
}, [userId]); // Re-fetch when userId changes
```

### Pattern 4: Search/Filter Pattern

```javascript
const [searchTerm, setSearchTerm] = useState("");
const [results, setResults] = useState([]);

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (searchTerm) {
      searchAPI(searchTerm);
    }
  }, 500); // Debounce - wait 500ms after user stops typing

  return () => clearTimeout(delayDebounce);
}, [searchTerm]);
```

### Pattern 5: Pagination

```javascript
const [page, setPage] = useState(1);
const [data, setData] = useState([]);

useEffect(() => {
  fetchPage(page);
}, [page]);

const nextPage = () => setPage((prev) => prev + 1);
const prevPage = () => setPage((prev) => Math.max(1, prev - 1));
```

---

## Advanced Topics

### 1. POST Request (Creating Data)

```javascript
const createUser = async (userData) => {
  try {
    const response = await axios.post(
      "https://api.example.com/users",
      userData
    );
    console.log("User created:", response.data);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Usage
createUser({
  name: "John Doe",
  email: "john@example.com",
  age: 25,
});
```

### 2. PUT Request (Updating Data)

```javascript
const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(
      `https://api.example.com/users/${userId}`,
      updatedData
    );
    console.log("User updated:", response.data);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
```

### 3. DELETE Request

```javascript
const deleteUser = async (userId) => {
  try {
    await axios.delete(`https://api.example.com/users/${userId}`);
    console.log("User deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
```

### 4. Request with Headers (Authentication)

```javascript
const fetchProtectedData = async () => {
  try {
    const response = await axios.get("https://api.example.com/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setData(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### 5. Axios Interceptors (Global Configuration)

```javascript
// Set up once in your app
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

---

## 🎯 Practice Exercises

### Beginner Level

1. ✅ Fetch and display a list of users from JSONPlaceholder
2. ✅ Add loading spinner while fetching
3. ✅ Display error message if fetch fails
4. ✅ Create a "Refresh" button to reload data

### Intermediate Level

1. ✅ Create a search bar that filters API results
2. ✅ Implement pagination (Next/Previous buttons)
3. ✅ Create a form that POSTs data to an API
4. ✅ Build a detail view - click item to see more info

### Advanced Level

1. ✅ Build a custom useFetch hook
2. ✅ Implement infinite scroll
3. ✅ Add request cancellation on component unmount
4. ✅ Create optimistic UI updates

---

## 🔗 Useful Free APIs for Practice

1. **JSONPlaceholder** - `https://jsonplaceholder.typicode.com`

   - Users, posts, comments, todos
   - Perfect for beginners

2. **Picsum Photos** - `https://picsum.photos/v2/list`

   - Random images
   - Great for image galleries

3. **DummyJSON** - `https://dummyjson.com`

   - Products, users, carts
   - Good for e-commerce practice

4. **The Dog API** - `https://dog.ceo/api/breeds/image/random`

   - Random dog images
   - Fun and simple

5. **OpenWeather API** - `https://openweathermap.org/api`
   - Weather data (requires free API key)

---

## 🎓 Key Takeaways

1. **Always use try-catch** for error handling
2. **Track loading states** for better UX
3. **Use useEffect** for automatic fetching
4. **Clean up** requests to prevent memory leaks
5. **Axios vs Fetch** - both work, Axios is more feature-rich
6. **Create custom hooks** for reusable logic
7. **Handle all three states**: loading, error, success

---

## 📚 Next Steps

1. Practice with all the example components in this project
2. Build a real project using an API (weather app, movie search, etc.)
3. Learn about React Query or SWR for advanced data fetching
4. Explore authentication with JWT tokens
5. Study REST API design principles

---

**Remember:** The best way to master API calls is through practice. Start simple, then gradually add complexity!
