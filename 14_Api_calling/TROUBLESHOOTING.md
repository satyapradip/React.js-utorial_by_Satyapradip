# 🔧 API Calling Troubleshooting Guide

Common problems and their solutions when working with API calls in React.

---

## 🚨 Common Errors

### 1. CORS Error

**Error Message:**

```
Access to fetch at 'https://api.example.com' from origin 'http://localhost:5173'
has been blocked by CORS policy
```

**What it means:**
The API server doesn't allow requests from your domain.

**Solutions:**

```javascript
// Option 1: Use APIs that support CORS (like JSONPlaceholder)
// Option 2: Use a CORS proxy during development
const response = await axios.get(
  "https://cors-anywhere.herokuapp.com/https://api.example.com"
);

// Option 3: Configure CORS on your backend (if you control it)
// In Express.js:
app.use(cors());

// Option 4: Use a proxy in vite.config.js
export default {
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};
```

---

### 2. Cannot Read Property of Undefined

**Error Message:**

```
Cannot read property 'data' of undefined
TypeError: Cannot read properties of undefined (reading 'data')
```

**What it means:**
You're trying to access data before it's loaded.

**Solution:**

```javascript
// ❌ BAD - Data might not be loaded yet
return <div>{data.name}</div>;

// ✅ GOOD - Check if data exists first
return <div>{data && data.name}</div>;

// ✅ BETTER - Use conditional rendering
if (!data) return <div>Loading...</div>;
return <div>{data.name}</div>;

// ✅ BEST - Handle all states
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
if (!data) return <div>No data</div>;
return <div>{data.name}</div>;
```

---

### 3. Infinite Loop in useEffect

**Error Message:**

```
Maximum update depth exceeded
```

**What it means:**
useEffect is calling itself repeatedly.

**Problem:**

```javascript
// ❌ BAD - Missing dependency array
useEffect(() => {
  fetchData();
}); // This runs on every render!

// ❌ BAD - State in dependency array that changes in useEffect
useEffect(() => {
  setData(fetchData());
}, [data]); // Creates infinite loop!
```

**Solution:**

```javascript
// ✅ GOOD - Empty array for mount only
useEffect(() => {
  fetchData();
}, []); // Runs once

// ✅ GOOD - Proper dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]); // Runs when userId changes
```

---

### 4. Component Unmounted Warning

**Error Message:**

```
Warning: Can't perform a React state update on an unmounted component
```

**What it means:**
API response came back after component was removed.

**Solution:**

```javascript
// ✅ Use cleanup function
useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    const response = await axios.get("API_URL");
    if (isMounted) {
      setData(response.data);
    }
  };

  fetchData();

  return () => {
    isMounted = false; // Cleanup
  };
}, []);

// ✅ BETTER - Use AbortController
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

  return () => controller.abort();
}, []);
```

---

### 5. Network Error

**Error Message:**

```
Network Error
AxiosError: Network Error
```

**What it means:**
Can't reach the API server.

**Possible Causes & Solutions:**

1. **Internet connection is down**
   - Check your internet connection
2. **Wrong API URL**

   ```javascript
   // ❌ BAD
   const response = await axios.get("http://api.example.com");

   // ✅ GOOD - Check the URL carefully
   const response = await axios.get("https://api.example.com");
   ```

3. **API server is down**

   - Try the URL in your browser
   - Check API status page

4. **Firewall/VPN blocking**
   - Try disabling VPN
   - Check firewall settings

---

### 6. 404 Not Found

**Error Message:**

```
Request failed with status code 404
```

**What it means:**
The endpoint doesn't exist.

**Solution:**

```javascript
// ❌ Check for typos
const response = await axios.get("https://jsonplaceholder.typicode.com/user"); // Wrong!

// ✅ Correct endpoint
const response = await axios.get("https://jsonplaceholder.typicode.com/users"); // Right!

// ✅ Check API documentation for correct endpoints
```

---

### 7. 401 Unauthorized

**Error Message:**

```
Request failed with status code 401
```

**What it means:**
Authentication required or token is invalid.

**Solution:**

```javascript
// ✅ Add authentication header
const response = await axios.get("https://api.example.com/protected", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// ✅ Check if token is expired
// ✅ Verify token format
// ✅ Check API documentation for auth requirements
```

---

### 8. Data Not Displaying

**Problem:** API call succeeds but data doesn't show.

**Debug Steps:**

```javascript
const fetchData = async () => {
  try {
    const response = await axios.get("API_URL");

    // 1. Log the entire response
    console.log("Full response:", response);

    // 2. Log just the data
    console.log("Response data:", response.data);

    // 3. Check data structure
    console.log("Data type:", typeof response.data);
    console.log("Is array?", Array.isArray(response.data));

    // 4. Set state
    setData(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

**Common Issues:**

```javascript
// Issue: Data is nested differently than expected
// ❌ Expecting: response.data
// ✅ Actually: response.data.results

// Solution: Check console logs and adjust
setData(response.data.results); // or whatever the actual path is
```

---

### 9. Data Updates But UI Doesn't

**Problem:** State changes but component doesn't re-render.

**Solution:**

```javascript
// ❌ BAD - Mutating state directly
data.push(newItem); // Don't do this!
setData(data);

// ✅ GOOD - Create new array
setData([...data, newItem]);

// ✅ GOOD - For objects
setData({ ...data, newKey: newValue });
```

---

### 10. Axios Not Defined

**Error Message:**

```
ReferenceError: axios is not defined
```

**Solution:**

```javascript
// 1. Install axios
// npm install axios

// 2. Import axios at top of file
import axios from "axios";

// 3. Use axios
const response = await axios.get("API_URL");
```

---

## 🛠️ Debugging Workflow

### Step 1: Check Browser Console

- Open DevTools (F12)
- Look for error messages in Console tab
- Read the entire error message carefully

### Step 2: Check Network Tab

- Open DevTools → Network tab
- Filter by XHR or Fetch
- Click on the request to see:
  - Request URL
  - Request Method
  - Status Code
  - Response data

### Step 3: Add Console Logs

```javascript
const fetchData = async () => {
  console.log("1. Starting fetch...");

  try {
    console.log("2. Making request to:", API_URL);
    const response = await axios.get(API_URL);
    console.log("3. Response received:", response);
    console.log("4. Response data:", response.data);

    setData(response.data);
    console.log("5. State updated");
  } catch (error) {
    console.error("6. Error occurred:", error);
    console.error("7. Error message:", error.message);
    console.error("8. Error response:", error.response);
  }
};
```

### Step 4: Test API Independently

- Visit the API URL in browser
- Use Postman or Thunder Client
- Verify the API works outside React

### Step 5: Simplify Code

- Remove unnecessary code
- Test with a simple example
- Add complexity back gradually

---

## 💡 Best Practices to Avoid Issues

### 1. Always Use Try-Catch

```javascript
const fetchData = async () => {
  try {
    const response = await axios.get("API_URL");
    setData(response.data);
  } catch (error) {
    setError(error.message);
  }
};
```

### 2. Always Handle All States

```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
if (!data) return <div>No data</div>;
return <div>{/* Render data */}</div>;
```

### 3. Use Proper Dependencies

```javascript
// Include all variables used inside useEffect
useEffect(() => {
  fetchData(userId, searchTerm);
}, [userId, searchTerm]); // Dependencies
```

### 4. Clean Up Requests

```javascript
useEffect(() => {
  const controller = new AbortController();

  fetchData(controller.signal);

  return () => controller.abort(); // Cleanup
}, []);
```

### 5. Validate Data Before Using

```javascript
// ❌ Dangerous
return <div>{data.user.name}</div>;

// ✅ Safe
return <div>{data?.user?.name || "Unknown"}</div>;
```

---

## 🔍 Quick Diagnostic Checklist

When something doesn't work:

- [ ] Did you install axios? (`npm install axios`)
- [ ] Did you import axios? (`import axios from 'axios'`)
- [ ] Is the API URL correct? (check for typos)
- [ ] Are you handling loading state?
- [ ] Are you handling error state?
- [ ] Are you checking if data exists before using it?
- [ ] Did you include dependencies in useEffect?
- [ ] Is your internet connection working?
- [ ] Does the API work in browser/Postman?
- [ ] Did you check the Network tab in DevTools?
- [ ] Did you check the Console for errors?

---

## 📚 Additional Resources

- **React DevTools**: Install browser extension for better debugging
- **Network Tab**: Essential for seeing API requests
- **Console.log**: Your best debugging friend
- **API Documentation**: Always read the docs!

---

## 🆘 Still Stuck?

1. Copy the exact error message
2. Google it with "React" and "Axios"
3. Check Stack Overflow
4. Ask in React communities
5. Review the examples in this project
6. Read API_CALLING_GUIDE.md again

---

**Remember:** Every developer faces these issues. Debugging is a skill that improves with practice! 🚀
