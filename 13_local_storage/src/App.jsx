import React from "react";

const App = () => {
  // 📝 Example 1: Store simple string
  localStorage.setItem("username", "Satyapradip");
  console.log("Stored username:", localStorage.getItem("username"));

  // 📝 Example 2: Store object (convert to JSON string first!)
  const user = {
    username: "Satyapradip",
    Age: "21",
  };
  localStorage.setItem("user", JSON.stringify(user)); // Convert object to string

  // 📝 Example 3: Retrieve object (convert back from JSON)
  const retrievedUser = JSON.parse(localStorage.getItem("user"));
  console.log("Retrieved user:", retrievedUser);

  // 📝 Example 4: Remove item
  // localStorage.removeItem("username");

  // 📝 Example 5: Clear all
  // localStorage.clear();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>localStorage Demo</h1>
      <p>
        <strong>Username:</strong> {localStorage.getItem("username")}
      </p>
      <p>
        <strong>User Object:</strong> {JSON.stringify(retrievedUser)}
      </p>
      <p style={{ fontSize: "12px", color: "gray" }}>
        Open DevTools → Application → Local Storage to see stored data!
      </p>
    </div>
  );
};

export default App;
