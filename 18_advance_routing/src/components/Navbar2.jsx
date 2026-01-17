// ============================================
// NAVBAR2 - Programmatic Navigation
// ============================================

import React from "react";
// useNavigate: Hook for programmatic navigation
// Use when you need to navigate based on actions (button clicks, form submissions, etc.)
import { useNavigate } from "react-router-dom";

const Navbar2 = () => {
  /* 
      useNavigate HOOK
      Returns a function that lets you navigate programmatically
      
      SYNTAX:
      navigate('/path')      -> Navigate to specific path
      navigate(-1)           -> Go back one page (like browser back button)
      navigate(1)            -> Go forward one page (like browser forward button)
      navigate(-2)           -> Go back two pages
      
      USE CASES:
      - After form submission
      - After successful login
      - Redirect after timer
      - Navigate on button click
    */
  let navigate = useNavigate();

  return (
    <div className="py-2 px-5 bg-cyan-800">
      {/* Navigate to specific path (absolute navigation) */}
      <button
        onClick={() => {
          navigate("/"); // Go to home page
        }}
        className="font-medium bg-amber-500 px-5 py-2 rounded m-2 cursor-pointer active:scale-95"
      >
        Return to Home Page
      </button>

      {/* Navigate backwards in history (like browser back button) */}
      <button
        onClick={() => {
          navigate(-1); // Go to previous page in history
        }}
        className="font-medium bg-amber-500 px-5 py-2 rounded m-2 cursor-pointer active:scale-95"
      >
        Back
      </button>

      {/* Navigate forwards in history (like browser forward button) */}
      <button
        onClick={() => {
          navigate(+1); // Go to next page in history (if exists)
        }}
        className="font-medium bg-amber-500 px-5 py-2 rounded m-2 cursor-pointer active:scale-95"
      >
        Next
      </button>
    </div>
  );
};

export default Navbar2;
