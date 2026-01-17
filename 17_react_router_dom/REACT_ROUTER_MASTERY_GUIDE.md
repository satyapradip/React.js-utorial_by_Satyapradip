# React Router DOM - Complete Mastery Guide

## 🎯 Introduction

React Router DOM is the standard routing library for React applications. It enables navigation between different components/pages without page reloads.

---

## 📚 Table of Contents

1. [Basic Setup](#basic-setup)
2. [Core Concepts](#core-concepts)
3. [Essential Components](#essential-components)
4. [Navigation Methods](#navigation-methods)
5. [Dynamic Routes](#dynamic-routes)
6. [Nested Routes](#nested-routes)
7. [Protected Routes](#protected-routes)
8. [Advanced Features](#advanced-features)
9. [Best Practices](#best-practices)
10. [Common Mistakes to Avoid](#common-mistakes-to-avoid)

---

## 🚀 Basic Setup

### Installation

```bash
npm install react-router-dom
```

### Minimal Setup (main.jsx)

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

**Key Point:** Wrap your entire app with `<BrowserRouter>` in main.jsx

---

## 🧩 Core Concepts

### 1. **Routes and Route**

- `<Routes>`: Container for all your routes
- `<Route>`: Defines a single route with path and element

```jsx
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>;
```

### 2. **Path Matching**

- `/` - Home page
- `/about` - About page
- `/products/:id` - Dynamic parameter
- `/products/*` - Wildcard (matches anything after /products/)
- `*` - 404 catch-all

---

## 🔧 Essential Components

### 1. Link Component

Use `<Link>` instead of `<a>` tags to prevent page reload

```jsx
import { Link } from "react-router-dom";

<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>
</nav>;
```

### 2. NavLink Component

Like Link but adds active class styling

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? "active-link" : "link")}
>
  About
</NavLink>;
```

**CSS Example:**

```css
.link {
  color: gray;
  text-decoration: none;
}

.active-link {
  color: blue;
  font-weight: bold;
  text-decoration: underline;
}
```

### 3. Outlet Component

Used for rendering child routes in nested routing

```jsx
// Layout.jsx
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* Child routes render here */}
      <Footer />
    </div>
  );
}
```

---

## 🧭 Navigation Methods

### 1. Using useNavigate Hook

Programmatic navigation (after form submit, button click, etc.)

```jsx
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // After successful login
    navigate("/dashboard");

    // Go back
    // navigate(-1)

    // Go forward
    // navigate(1)

    // Replace history (can't go back)
    // navigate('/dashboard', { replace: true })
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### 2. Using Link

Declarative navigation

```jsx
<Link to="/profile">Go to Profile</Link>
```

---

## 🎨 Dynamic Routes

### Reading URL Parameters

```jsx
// App.jsx
<Route path="/user/:userId" element={<UserProfile />} />
<Route path="/products/:productId" element={<ProductDetails />} />

// UserProfile.jsx
import { useParams } from 'react-router-dom'

function UserProfile() {
  const { userId } = useParams()

  return <h1>User ID: {userId}</h1>
}
```

**Example URLs:**

- `/user/123` → userId = "123"
- `/products/abc-xyz` → productId = "abc-xyz"

---

## 🌲 Nested Routes

### Method 1: Parent-Child Structure

```jsx
// App.jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
  </Route>
</Routes>;

// Layout.jsx
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <main>
        <Outlet /> {/* Child routes appear here */}
      </main>
      <footer>© 2026</footer>
    </div>
  );
}
```

**Key Points:**

- `index` route renders at parent's path
- Child routes inherit parent path
- `<Outlet>` is where child components render

### Method 2: Dashboard with Nested Tabs

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />
  <Route path="stats" element={<Stats />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

---

## 🔒 Protected Routes

Restrict access based on authentication

```jsx
// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// App.jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute isAuthenticated={user?.isLoggedIn}>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>;
```

---

## 🚀 Advanced Features

### 1. Query Parameters

```jsx
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category"); // /products?category=electronics
  const sort = searchParams.get("sort"); // /products?sort=price

  const handleFilter = () => {
    setSearchParams({ category: "electronics", sort: "price" });
  };

  return <div>Category: {category}</div>;
}
```

### 2. useLocation Hook

Get current location information

```jsx
import { useLocation } from "react-router-dom";

function CurrentPage() {
  const location = useLocation();

  console.log(location.pathname); // /about
  console.log(location.search); // ?tab=team
  console.log(location.hash); // #section1
  console.log(location.state); // passed state data

  return <div>Current path: {location.pathname}</div>;
}
```

### 3. Navigate with State

Pass data between routes

```jsx
// From component
navigate("/profile", { state: { userName: "John" } });

// To component
const location = useLocation();
const { userName } = location.state || {};
```

### 4. 404 Page

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  {/* Must be last */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 5. Lazy Loading Routes

```jsx
import { lazy, Suspense } from 'react'

const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

<Routes>
  <Route path="/" element={<Home />} />
  <Route
    path="/about"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    }
  />
</Routes>
```

---

## ✅ Best Practices

### 1. **Always wrap app with BrowserRouter in main.jsx**

```jsx
// ✅ Correct
<BrowserRouter>
  <App />
</BrowserRouter>

// ❌ Wrong - don't put it in App.jsx
```

### 2. **Use Link/NavLink instead of <a> tags**

```jsx
// ✅ Correct - No page reload
<Link to="/about">About</Link>

// ❌ Wrong - Causes full page reload
<a href="/about">About</a>
```

### 3. **Import all components used in routes**

```jsx
// ✅ Correct
import Home from './pages/Home'
import About from './pages/About'

<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />

// ❌ Wrong - About not imported
<Route path="/about" element={<About />} />
```

### 4. **Use index route for default child**

```jsx
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} /> {/* Shows at / */}
  <Route path="about" element={<About />} />
</Route>
```

### 5. **Organize routes in a separate file for large apps**

```jsx
// routes.jsx
export const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  // ... more routes
];

// App.jsx
import { routes } from "./routes";

<Routes>
  {routes.map((route) => (
    <Route key={route.path} {...route} />
  ))}
</Routes>;
```

---

## ⚠️ Common Mistakes to Avoid

### 1. **Forgetting to Import Components**

```jsx
// ❌ Error: About is not defined
<Route path="/about" element={<About />} />;

// ✅ Fix: Import it
import About from "./pages/About";
```

### 2. **Using <a> instead of <Link>**

```jsx
// ❌ Causes page reload
<a href="/about">About</a>

// ✅ No reload, faster
<Link to="/about">About</Link>
```

### 3. **Not Wrapping Routes in BrowserRouter**

```jsx
// ❌ Error: useRoutes() may be used only in context of <Router>
function App() {
  return <Routes>...</Routes>;
}

// ✅ Fix: Wrap in main.jsx
<BrowserRouter>
  <App />
</BrowserRouter>;
```

### 4. **Forgetting Outlet in Parent Component**

```jsx
// ❌ Child routes won't render
function Layout() {
  return (
    <div>
      <Header />
    </div>
  );
}

// ✅ Include Outlet
function Layout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* Children render here */}
    </div>
  );
}
```

### 5. **Wrong Path Format**

```jsx
// ❌ Don't include leading slash in child routes
<Route path="/dashboard" element={<Layout />}>
  <Route path="/stats" element={<Stats />} />  {/* Wrong */}
</Route>

// ✅ Correct - no leading slash for children
<Route path="/dashboard" element={<Layout />}>
  <Route path="stats" element={<Stats />} />  {/* Correct */}
</Route>
```

---

## 🎓 Learning Path

### **Beginner Level** (You are here!)

1. ✅ Basic Routes and Route setup
2. ✅ Using Link for navigation
3. ⏳ Creating a navigation bar
4. ⏳ Understanding path matching
5. ⏳ Building a multi-page app

### **Intermediate Level**

1. NavLink with active styling
2. Dynamic routes with useParams
3. Nested routes with Outlet
4. useNavigate for programmatic navigation
5. 404 pages

### **Advanced Level**

1. Protected routes
2. Query parameters with useSearchParams
3. Lazy loading routes
4. useLocation and passing state
5. Route configuration objects

---

## 🛠️ Practice Exercises

### Exercise 1: Navigation Bar

Create a navigation bar with Home, About, Contact, Services pages

### Exercise 2: Product Catalog

- Product list page
- Individual product detail page using `:id`
- Add to cart functionality with navigation

### Exercise 3: Dashboard Layout

- Nested routes with sidebar
- Dashboard home, Analytics, Settings tabs
- Shared header/footer

### Exercise 4: Authentication Flow

- Login page
- Protected dashboard
- Redirect to login if not authenticated
- Logout functionality

### Exercise 5: Blog Application

- Blog list page
- Individual blog post (dynamic route)
- Category filtering (query params)
- 404 for invalid post IDs

---

## 📖 Quick Reference Cheatsheet

```jsx
// Installation
npm install react-router-dom

// Setup (main.jsx)
import { BrowserRouter } from 'react-router-dom'
<BrowserRouter><App /></BrowserRouter>

// Basic Routing
import { Routes, Route } from 'react-router-dom'
<Routes>
  <Route path="/" element={<Home />} />
</Routes>

// Navigation
import { Link, NavLink } from 'react-router-dom'
<Link to="/about">About</Link>
<NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>

// Hooks
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom'

const navigate = useNavigate()
navigate('/path')

const { id } = useParams()

const location = useLocation()
location.pathname, location.state

const [searchParams, setSearchParams] = useSearchParams()
searchParams.get('query')

// Nested Routes
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />
</Route>

// In Layout component
import { Outlet } from 'react-router-dom'
<Outlet />

// 404
<Route path="*" element={<NotFound />} />

// Protected Route
<Route path="/dashboard" element={
  isAuth ? <Dashboard /> : <Navigate to="/login" />
} />
```

---

## 🎯 Next Steps

1. **Practice the basics** - Build simple multi-page apps
2. **Read official docs** - [React Router Docs](https://reactrouter.com)
3. **Build projects** - Portfolio site, blog, e-commerce
4. **Learn patterns** - Protected routes, layouts, code splitting
5. **Explore v6.4+ features** - Data APIs, loaders, actions

---

## 💡 Pro Tips

- Always test your routes after creating them
- Use DevTools to inspect location and params
- Keep routes organized in larger apps
- Use TypeScript for better route typing
- Consider route-based code splitting for performance

---

Happy Learning! 🚀 Master React Router DOM step by step!
