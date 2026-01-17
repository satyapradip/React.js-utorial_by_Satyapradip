// ============================================
// COURSE DETAIL - Dynamic Route with useParams
// ============================================

import React from "react";
// useParams: Hook to access URL parameters (dynamic parts of the route)
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  /* 
    useParams HOOK
    Returns an object containing all URL parameters
    
    EXAMPLE:
    Route defined as: /courses/:courseId
    
    If URL is: /courses/react
    Then params = { courseId: "react" }
    
    If URL is: /courses/javascript
    Then params = { courseId: "javascript" }
    
    If URL is: /courses/123
    Then params = { courseId: "123" }
    
    MULTIPLE PARAMS:
    Route: /users/:userId/posts/:postId
    URL: /users/john/posts/42
    params = { userId: "john", postId: "42" }
  */
  const params = useParams();
  console.log(params); // See the params object in console

  return (
    <div className="bg-lime-500 text-white capitalize font-bold p-4 text-center">
      {/* Access the courseId parameter */}
      {params.courseId} Course Details
      {/* Alternative syntax: Object destructuring */}
      {/* const { courseId } = useParams() */}
      {/* Then use: {courseId} Course Details */}
    </div>
  );
};

export default CourseDetail;
