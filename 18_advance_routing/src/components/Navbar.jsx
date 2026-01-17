// ============================================
// NAVBAR - Navigation with Link Component
// ============================================

import React from "react";
// Link: Used for navigation instead of <a> tags
// WHY? Link prevents full page reload (SPA behavior)
// <a> tag causes page refresh, Link just changes the URL and component
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex py-4 items-center px-8 bg-cyan-900 justify-between">
      <h2 className="text-2xl font-bold">Sharians</h2>
      <div className="flex gap-10">
        {/* 
          LINK COMPONENT
          - 'to' prop: The path to navigate to
          - Works like <a href="/">, but without page reload
          - Automatically adds 'active' class when current route matches
          - Can use relative or absolute paths
          
          SYNTAX:
          <Link to="/path">Text</Link>
        */}
        <Link className="text-lg font-medium" to="/">
          Home
        </Link>
        <Link className="text-lg font-medium" to="/about">
          About
        </Link>
        <Link className="text-lg font-medium" to="/product">
          Product
        </Link>
        <Link className="text-lg font-medium" to="/courses">
          Courses
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
