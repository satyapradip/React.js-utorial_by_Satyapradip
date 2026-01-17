# 🚀 React Router DOM - Complete Guide

**Welcome to Advanced Routing in React!**  
This project demonstrates all essential routing concepts from beginner to advanced level.

---

## 📚 Table of Contents

1. [What is React Router?](#what-is-react-router)
2. [Installation](#installation)
3. [Core Concepts](#core-concepts)
4. [Routing Types](#routing-types)
5. [Important Hooks](#important-hooks)
6. [Components Overview](#components-overview)
7. [Common Patterns](#common-patterns)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🤔 What is React Router?

**React Router** is a library that enables navigation between different components/pages in a React application without page reload (Single Page Application - SPA).

### Why Do We Need It?

- ✅ Navigate between pages without full page reload
- ✅ Create dynamic URLs with parameters
- ✅ Maintain browser history (back/forward buttons work)
- ✅ Share URLs that go to specific pages
- ✅ Create nested layouts (headers, sidebars that stay the same)

---

## 📦 Installation

```bash
npm install react-router-dom
```

**Current Version Used:** v6.x (latest)

---

## 🎯 Core Concepts

### 1. **BrowserRouter**

```jsx
import { BrowserRouter } from "react-router-dom";

// Wrap your entire app
<BrowserRouter>
  <App />
</BrowserRouter>;
```

**Purpose:** Enables routing functionality in your app  
**Location:** `main.jsx` (entry point)  
**Rule:** Must wrap the entire application

---

### 2. **Routes & Route**

```jsx
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>;
```

**Routes:** Container for all Route components  
**Route:** Defines URL → Component mapping

- `path`: URL to match
- `element`: Component to render

---

### 3. **Link**

```jsx
import { Link } from "react-router-dom";

<Link to="/about">Go to About</Link>;
```

**Purpose:** Navigate without page reload  
**Difference from `<a>`:**

- `<a href="/about">` → Full page reload ❌
- `<Link to="/about">` → No reload, just changes component ✅

---

## 🔀 Routing Types

### 1️⃣ **Basic (Static) Routing**

**Definition:** Fixed URL paths that don't change

```jsx
// In App.jsx
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
```

**URLs:**

- `/` → Shows Home page
- `/about` → Shows About page

**Use Case:** Pages with fixed content (Home, About, Contact)

---

### 2️⃣ **Nested Routing**

**Definition:** Routes within routes (parent-child relationship)

```jsx
// Parent Route with children
<Route path="/product" element={<Product />}>
  <Route path="men" element={<Men />} />
  <Route path="women" element={<Women />} />
  <Route path="kids" element={<Kids />} />
</Route>
```

**How It Works:**

1. Parent route (`/product`) renders `<Product />` component
2. `<Product />` component contains `<Outlet />` component
3. Child routes render **inside** the `<Outlet />`

**URLs & Results:**
| URL | What Renders |
|-----|--------------|
| `/product` | Product component only |
| `/product/men` | Product + Men (in Outlet) |
| `/product/women` | Product + Women (in Outlet) |
| `/product/kids` | Product + Kids (in Outlet) |

**Code Example:**

```jsx
// Product.jsx (Parent)
import { Outlet } from "react-router-dom";

function Product() {
  return (
    <div>
      <h1>Product Page</h1>
      <nav>
        <Link to="men">Men</Link>
        <Link to="women">Women</Link>
      </nav>

      {/* Child routes render here */}
      <Outlet />
    </div>
  );
}
```

**Use Case:**

- Dashboard with sidebar
- E-commerce with categories
- Admin panel with nested sections

**Important Notes:**

- Child paths are **relative** to parent
  - `path="men"` becomes `/product/men` ✅
  - `path="/men"` becomes `/men` (NOT nested) ❌
- `<Outlet />` is required in parent component

---

### 3️⃣ **Dynamic Routing**

**Definition:** Routes with variable parts (parameters)

```jsx
// Route definition
<Route path="/courses/:courseId" element={<CourseDetail />} />
```

**Syntax:** Use `:paramName` for dynamic parts

**URLs & Parameters:**
| URL | Parameter Value |
|-----|-----------------|
| `/courses/react` | courseId = "react" |
| `/courses/javascript` | courseId = "javascript" |
| `/courses/123` | courseId = "123" |

**Accessing Parameters:**

```jsx
// In CourseDetail.jsx
import { useParams } from "react-router-dom";

function CourseDetail() {
  const { courseId } = useParams();

  return <h1>{courseId} Course</h1>;
}
```

**Multiple Parameters:**

```jsx
// Route
<Route path="/users/:userId/posts/:postId" element={<Post />} />

// URL: /users/john/posts/42
// Params: { userId: "john", postId: "42" }
```

**Use Case:**

- Blog posts (`/blog/:postId`)
- User profiles (`/user/:username`)
- Product details (`/product/:productId`)

---

### 4️⃣ **Catch-All (404) Route**

**Definition:** Route that matches any unmatched URL

```jsx
<Route path="*" element={<NotFound />} />
```

**Rules:**

- Use `path="*"` (asterisk matches anything)
- **Always place it LAST** in your Routes
- Used for 404 error pages

**Example:**

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />

  {/* This must be last */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 🪝 Important Hooks

### 1. **useNavigate**

**Purpose:** Navigate programmatically (with code, not clicks)

```jsx
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  // Navigate to path
  navigate("/about");

  // Go back
  navigate(-1);

  // Go forward
  navigate(1);

  // Replace (don't add to history)
  navigate("/about", { replace: true });
}
```

**Common Use Cases:**

```jsx
// After form submission
const handleSubmit = () => {
  // ... save data
  navigate("/success");
};

// After login
const handleLogin = () => {
  // ... authenticate
  navigate("/dashboard");
};

// Redirect after timer
setTimeout(() => {
  navigate("/home");
}, 3000);
```

**Navigation Options:**
| Syntax | Action |
|--------|--------|
| `navigate('/path')` | Go to specific path |
| `navigate(-1)` | Go back 1 page |
| `navigate(-2)` | Go back 2 pages |
| `navigate(1)` | Go forward 1 page |

---

### 2. **useParams**

**Purpose:** Access URL parameters (dynamic parts)

```jsx
import { useParams } from "react-router-dom";

function CourseDetail() {
  const params = useParams();
  // or
  const { courseId } = useParams();

  return <h1>Course: {courseId}</h1>;
}
```

**Example with Multiple Params:**

```jsx
// Route: /users/:userId/posts/:postId

function Post() {
  const { userId, postId } = useParams();

  return (
    <div>
      <p>User: {userId}</p>
      <p>Post: {postId}</p>
    </div>
  );
}

// URL: /users/john/posts/42
// Output: User: john, Post: 42
```

---

### 3. **useLocation**

**Purpose:** Get current URL information

```jsx
import { useLocation } from "react-router-dom";

function MyComponent() {
  const location = useLocation();

  console.log(location.pathname); // "/about"
  console.log(location.search); // "?id=123"
  console.log(location.hash); // "#section"
  console.log(location.state); // Passed state data
}
```

**Use Case:** Track page views, conditional rendering based on URL

---

## 🗂️ Components Overview

### Project Structure

```
src/
├── components/
│   ├── NavBar.jsx        (Link navigation)
│   ├── Navbar2.jsx       (useNavigate navigation)
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx          (Static route)
│   ├── About.jsx         (Static route)
│   ├── Product.jsx       (Nested parent + Outlet)
│   ├── Men.jsx           (Nested child)
│   ├── Women.jsx         (Nested child)
│   ├── Kids.jsx          (Nested child)
│   ├── Courses.jsx       (Links to dynamic routes)
│   ├── CourseDetail.jsx  (Dynamic route + useParams)
│   └── NotFound.jsx      (404 catch-all)
├── App.jsx               (All routes defined here)
└── main.jsx              (BrowserRouter wrapper)
```

---

## 🎨 Common Patterns

### Pattern 1: Layout with Persistent Header/Footer

```jsx
function App() {
  return (
    <div>
      <Header /> {/* Always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Routes change here */}
      </Routes>
      <Footer /> {/* Always visible */}
    </div>
  );
}
```

---

### Pattern 2: Protected Routes (Authentication)

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = // ... check auth

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

### Pattern 3: Nested Routes with Shared Layout

```jsx
// App.jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>;

// DashboardLayout.jsx
function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet /> {/* Child routes here */}
    </div>
  );
}
```

---

### Pattern 4: Redirect

```jsx
import { Navigate } from "react-router-dom";

// Old route redirects to new one
<Route path="/old-path" element={<Navigate to="/new-path" />} />;

// Conditional redirect
{
  isLoggedIn ? <Dashboard /> : <Navigate to="/login" />;
}
```

---

## ✅ Best Practices

### 1. **Always Use Link, Not `<a>` Tags**

```jsx
// ❌ Wrong - causes page reload
<a href="/about">About</a>

// ✅ Correct - no page reload
<Link to="/about">About</Link>
```

---

### 2. **Organize Routes in One Place**

```jsx
// ✅ Good - all routes in App.jsx
function App() {
  return <Routes>{/* All routes here */}</Routes>;
}
```

---

### 3. **Use Index Routes for Default Child**

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Overview />} /> {/* Shows at /dashboard */}
  <Route path="profile" element={<Profile />} />
</Route>
```

---

### 4. **404 Route Always Last**

```jsx
<Routes>
  {/* All specific routes */}
  <Route path="*" element={<NotFound />} /> {/* Last! */}
</Routes>
```

---

### 5. **Use Relative Paths in Nested Routes**

```jsx
// ✅ Correct
<Route path="product" element={<Product />}>
  <Route path="men" element={<Men />} />  {/* Becomes /product/men */}
</Route>

// ❌ Wrong
<Route path="product" element={<Product />}>
  <Route path="/men" element={<Men />} />  {/* Becomes /men (not nested!) */}
</Route>
```

---

## 🐛 Troubleshooting

### Issue 1: "BrowserRouter not defined"

**Error:** `BrowserRouter is not defined`  
**Solution:** Import it and wrap App in main.jsx

```jsx
import { BrowserRouter } from "react-router-dom";

<BrowserRouter>
  <App />
</BrowserRouter>;
```

---

### Issue 2: "Routes not rendering"

**Problem:** Page shows nothing  
**Checklist:**

- ✅ BrowserRouter wraps App in main.jsx?
- ✅ Routes and Route imported from 'react-router-dom'?
- ✅ Routes component wraps all Route components?
- ✅ Path starts with `/`?

---

### Issue 3: "Nested routes not showing"

**Problem:** Child routes don't display  
**Solution:** Add `<Outlet />` in parent component

```jsx
// Parent must have Outlet
function Parent() {
  return (
    <div>
      <h1>Parent</h1>
      <Outlet /> {/* Add this! */}
    </div>
  );
}
```

---

### Issue 4: "Link causes page reload"

**Problem:** Using `<a>` instead of `<Link>`  
**Solution:**

```jsx
// ❌ Wrong
<a href="/about">About</a>

// ✅ Correct
<Link to="/about">About</Link>
```

---

### Issue 5: "useParams returns undefined"

**Problem:** Parameters not defined in route  
**Solution:** Check route definition

```jsx
// ❌ Wrong
<Route path="/course" element={<CourseDetail />} />

// ✅ Correct
<Route path="/course/:courseId" element={<CourseDetail />} />
```

---

## 📖 Quick Reference

### Import Statements

```jsx
// Router wrapper
import { BrowserRouter } from "react-router-dom";

// Route components
import { Routes, Route } from "react-router-dom";

// Navigation
import { Link, Navigate } from "react-router-dom";

// Nested routes
import { Outlet } from "react-router-dom";

// Hooks
import { useNavigate, useParams, useLocation } from "react-router-dom";
```

---

### Route Syntax Cheat Sheet

```jsx
// Basic route
<Route path="/about" element={<About />} />

// Root route
<Route path="/" element={<Home />} />

// Dynamic route
<Route path="/user/:id" element={<User />} />

// Nested routes
<Route path="/parent" element={<Parent />}>
  <Route path="child" element={<Child />} />
</Route>

// Index route (default child)
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Overview />} />
</Route>

// Catch-all (404)
<Route path="*" element={<NotFound />} />

// Redirect
<Route path="/old" element={<Navigate to="/new" />} />
```

---

## 🎓 Learning Path

1. **Beginner:** Static routes, Link component
2. **Intermediate:** Nested routes, Outlet, useNavigate
3. **Advanced:** Dynamic routes, useParams, Protected routes
4. **Expert:** Complex nested structures, Lazy loading, Code splitting

---

## 🚀 Next Steps

- Add **protected routes** (authentication)
- Implement **lazy loading** for better performance
- Use **route loaders** for data fetching
- Add **breadcrumbs** for navigation
- Implement **scroll restoration**

---

## 📚 Additional Resources

- [Official React Router Docs](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [React Router Examples](https://github.com/remix-run/react-router/tree/dev/examples)

---

## 🎯 Summary

| Concept                 | Purpose                | Key Component/Hook  |
| ----------------------- | ---------------------- | ------------------- |
| Basic Routing           | Navigate between pages | `<Route>`, `<Link>` |
| Nested Routing          | Routes within routes   | `<Outlet>`          |
| Dynamic Routing         | URL parameters         | `useParams()`       |
| Programmatic Navigation | Navigate with code     | `useNavigate()`     |
| 404 Pages               | Handle unknown routes  | `path="*"`          |

---

**Made with ❤️ for React learners**  
**Happy Routing! 🚀**
