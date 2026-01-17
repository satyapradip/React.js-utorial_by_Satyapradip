// ============================================
// NOT FOUND PAGE - 404 Error (Catch-all Route)
// ============================================

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  /* 
    This component is rendered when no other route matches
    It's defined with path="*" in App.jsx
    
    The asterisk (*) is a wildcard that matches any route
    Always place this route LAST in your Routes component
    
    USE CASE:
    User visits /random-page-that-doesnt-exist -> Shows this page
  */

  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl mb-6">Page Not Found</h2>
      <p className="text-xl mb-8 text-gray-400">
        The page you're looking for doesn't exist.
      </p>

      {/* Provide a way back to home */}
      <Link
        to="/"
        className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded text-xl font-semibold inline-block"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
