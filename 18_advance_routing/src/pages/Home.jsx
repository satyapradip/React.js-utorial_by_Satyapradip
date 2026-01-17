// ============================================
// HOME PAGE - Root Route (/)
// ============================================

import React from "react";

const Home = () => {
  /* 
    This is the home/landing page
    Rendered when user visits: http://localhost:5173/
    Matches Route: <Route path="/" element={<Home />} />
  */

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <p className="text-xl">Welcome to the React Router Learning Project!</p>

      <div className="mt-8 p-6 bg-gray-800 rounded-lg max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">What You'll Learn:</h3>
        <ul className="text-left space-y-2">
          <li>✅ Basic Routing - Navigate between pages</li>
          <li>✅ Nested Routing - Routes within routes (Product page)</li>
          <li>✅ Dynamic Routing - URL parameters (Courses page)</li>
          <li>
            ✅ Programmatic Navigation - Navigate with code (Back/Next buttons)
          </li>
          <li>✅ 404 Error Pages - Catch-all routes</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
