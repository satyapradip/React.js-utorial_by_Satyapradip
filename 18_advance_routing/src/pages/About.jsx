import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const btnClicked = () => {
    navigate("/");
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">About Page</h1>
      <p className="text-xl">This is the about page</p>
      <button onClick={btnClicked} className="font-medium bg-emerald-800 px-5 py-3 m-5 rounded" >Go Home</button>
    </div>
  );
};

export default About;
