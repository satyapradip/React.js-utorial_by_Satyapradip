# 🚀 API Calls Quick Reference

## Setup

```bash
npm install axios
```

---

## Basic Fetch (GET)

### Using Fetch API

```javascript
const getData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
```

### Using Axios

```javascript
import axios from "axios";

const getData = async () => {
  try {
    const response = await axios.get("https://api.example.com/data");
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};
```

---

## Complete Component Template

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("YOUR_API_URL");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* Render your data */}</div>;
}
```

---

## All HTTP Methods

### GET - Retrieve Data

```javascript
axios.get("https://api.example.com/users");
```

### POST - Create New Data

```javascript
axios.post("https://api.example.com/users", {
  name: "John",
  email: "john@example.com",
});
```

### PUT - Update Entire Resource

```javascript
axios.put("https://api.example.com/users/1", {
  name: "John Updated",
  email: "john@example.com",
});
```

### PATCH - Update Partial Resource

```javascript
axios.patch("https://api.example.com/users/1", {
  name: "John Updated",
});
```

### DELETE - Remove Data

```javascript
axios.delete("https://api.example.com/users/1");
```

---

## Common Patterns

### 1. Fetch on Button Click

```javascript
function Component() {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    const response = await axios.get("API_URL");
    setData(response.data);
  };

  return <button onClick={handleClick}>Fetch Data</button>;
}
```

### 2. Fetch on Component Mount

```javascript
useEffect(() => {
  fetchData();
}, []); // Empty array = run once
```

### 3. Fetch When Dependency Changes

```javascript
const [userId, setUserId] = useState(1);

useEffect(() => {
  fetchUserData(userId);
}, [userId]); // Runs when userId changes
```

### 4. Search with Debounce

```javascript
const [search, setSearch] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    if (search) searchAPI(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);
```

---

## Error Handling Patterns

### Basic

```javascript
try {
  const response = await axios.get("API_URL");
  setData(response.data);
} catch (error) {
  setError(error.message);
}
```

### Detailed

```javascript
try {
  const response = await axios.get("API_URL");
  setData(response.data);
} catch (error) {
  if (error.response) {
    // Server responded with error
    setError(
      `Error: ${error.response.status} - ${error.response.data.message}`
    );
  } else if (error.request) {
    // Request made but no response
    setError("No response from server");
  } else {
    // Something else happened
    setError(error.message);
  }
}
```

---

## Headers & Authentication

### With Token

```javascript
axios.get("https://api.example.com/protected", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### With Multiple Headers

```javascript
axios.post("https://api.example.com/data", data, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Custom-Header": "value",
  },
});
```

---

## Custom Hook Template

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

// Usage
const { data, loading, error } = useFetch("https://api.example.com/data");
```

---

## Request Cancellation

```javascript
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await axios.get("API_URL", {
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

  return () => controller.abort(); // Cleanup
}, []);
```

---

## Form Submission

```javascript
function Form() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("API_URL", formData);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

---

## Free Practice APIs

| API             | URL                                          | Data Type    |
| --------------- | -------------------------------------------- | ------------ |
| JSONPlaceholder | `https://jsonplaceholder.typicode.com/users` | Users, Posts |
| Picsum Photos   | `https://picsum.photos/v2/list`              | Images       |
| DummyJSON       | `https://dummyjson.com/products`             | Products     |
| Dog API         | `https://dog.ceo/api/breeds/image/random`    | Dog Images   |
| Rick & Morty    | `https://rickandmortyapi.com/api/character`  | Characters   |

---

## Common Mistakes to Avoid

❌ **Not handling errors**

```javascript
// BAD
const data = await axios.get("API_URL");
```

✅ **Always use try-catch**

```javascript
// GOOD
try {
  const data = await axios.get("API_URL");
} catch (error) {
  console.error(error);
}
```

❌ **No loading state**

```javascript
// BAD - User doesn't know data is loading
```

✅ **Show loading feedback**

```javascript
// GOOD
if (loading) return <div>Loading...</div>;
```

❌ **Forgetting dependencies**

```javascript
// BAD - Will cause issues
useEffect(() => {
  fetchData(userId);
}, []); // Missing userId dependency!
```

✅ **Include all dependencies**

```javascript
// GOOD
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

---

## Debugging Tips

1. **Check Network Tab** in browser DevTools
2. **Console.log responses** to see data structure
3. **Use try-catch** to catch errors
4. **Check API documentation** for correct endpoints
5. **Verify CORS** settings if getting CORS errors
6. **Test API** in Postman or Thunder Client first

---

## Cheat Sheet

```javascript
// Import
import axios from 'axios';
import { useState, useEffect } from 'react';

// State
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// GET
const response = await axios.get(url);

// POST
const response = await axios.post(url, data);

// PUT
const response = await axios.put(url, data);

// DELETE
const response = await axios.delete(url);

// With Headers
const response = await axios.get(url, { headers: {...} });

// Access Data
console.log(response.data);

// useEffect on Mount
useEffect(() => { fetchData(); }, []);

// useEffect with Dependency
useEffect(() => { fetchData(); }, [dependency]);
```

---

**Pro Tip:** Keep this reference handy while coding. Practice makes perfect! 🎯
