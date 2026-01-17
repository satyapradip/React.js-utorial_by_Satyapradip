// ============================================
// COURSES PAGE - Static Route Example
// ============================================

import React from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  /* 
    This is a static route page
    You can add Links here to navigate to dynamic course detail pages
    
    EXAMPLE:
    <Link to="/courses/react">React Course</Link>
    <Link to="/courses/javascript">JavaScript Course</Link>
  */

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Available Courses</h2>

      {/* Example links to dynamic course pages */}
      <div className="flex flex-col gap-4 items-center">
        <Link
          to="/courses/react"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-xl font-semibold w-64"
        >
          React Course
        </Link>
        <Link
          to="/courses/javascript"
          className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded text-xl font-semibold w-64"
        >
          JavaScript Course
        </Link>
        <Link
          to="/courses/nodejs"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-xl font-semibold w-64"
        >
          Node.js Course
        </Link>
        <Link
          to="/courses/python"
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded text-xl font-semibold w-64"
        >
          Python Course
        </Link>
      </div>

      <p className="mt-6 text-gray-400">
        Click any course to see dynamic routing in action!
      </p>
    </div>
  );
};

export default Courses;
