// ============================================
// APP.JSX - Main Application Component
// ============================================
// This file demonstrates all major routing concepts in React Router

import React from "react";
// Routes: Container for all Route components
// Route: Defines a mapping between URL path and component to render
import { Routes, Route } from "react-router-dom";

// Import components
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

// Import page components
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Navbar2 from "./components/Navbar2";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation components - shown on all pages */}
      <Navbar />
      <Navbar2 />

      {/* Main content area - where routes will be rendered */}
      <main className="flex-grow p-8">
        {/* 
          ROUTES CONTAINER 
          All <Route> components must be inside a <Routes> component
        */}
        <Routes>
          {/* 
            ==========================================
            1. BASIC ROUTING - Static Routes
            ==========================================
            path: The URL path to match
            element: The component to render when path matches
          */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />

          {/* 
            ==========================================
            2. DYNAMIC ROUTING - URL Parameters
            ==========================================
            :courseId is a dynamic parameter (can be any value)
            Example URLs: /courses/react, /courses/javascript, /courses/123
            Access the parameter using useParams() hook in CourseDetail component
          */}
          <Route path="/courses/:courseId" element={<CourseDetail />} />

          {/* 
            ==========================================
            3. NESTED ROUTING - Parent-Child Routes
            ==========================================
            The Product route has child routes (men, women, kids)
            
            HOW IT WORKS:
            - Parent route (/product) renders <Product /> component
            - Product component contains an <Outlet /> component
            - Child routes render INSIDE the <Outlet /> of parent
            
            URLS:
            - /product          -> Shows Product component only
            - /product/men      -> Shows Product + Men component (in Outlet)
            - /product/women    -> Shows Product + Women component (in Outlet)
            - /product/kids     -> Shows Product + Kids component (in Outlet)
            
            NOTE: Child route paths are RELATIVE to parent
            - "men" becomes "/product/men"
            - If you use "/men", it becomes an absolute path (not nested)
          */}
          <Route path="/product" element={<Product />}>
            <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
            <Route path="kids" element={<Kids />} />
          </Route>

          {/* 
            ==========================================
            4. CATCH-ALL ROUTE - 404 Not Found
            ==========================================
            path="*" matches ANY route that didn't match above routes
            Always put this at the END of your routes
            Used for showing 404 error pages
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer component - shown on all pages */}
      <Footer />
    </div>
  );
};

export default App;
