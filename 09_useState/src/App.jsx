import { useState } from "react";
import "./App.css";

function App() {
  // ============================================
  // WHAT IS useState?
  // ============================================
  // useState is a React Hook that lets you add STATE to your functional components
  // STATE = data that can change over time and when it changes, React re-renders the component

  // ============================================
  // BASIC SYNTAX
  // ============================================
  // const [stateVariable, setStateFunction] = useState(initialValue)
  //
  // stateVariable = the current value of state
  // setStateFunction = function to update the state
  // initialValue = the starting value

  // ============================================
  // EXAMPLE 1: Counter (Most Basic Example)
  // ============================================
  const [count, setCount] = useState(0);
  // count = current value (starts at 0)
  // setCount = function to change count
  // 0 = initial value

  const increment = () => {
    setCount(count + 1); // Updates count by adding 1
  };

  const decrement = () => {
    setCount(count - 1); // Updates count by subtracting 1
  };

  const reset = () => {
    setCount(0); // Resets count to 0
  };

  // ============================================
  // EXAMPLE 2: String State (Form Input)
  // ============================================
  const [name, setName] = useState("");
  // Empty string '' as initial value

  const handleNameChange = (event) => {
    setName(event.target.value); // Updates name with input value
  };

  // ============================================
  // EXAMPLE 3: Boolean State (Toggle)
  // ============================================
  const [isVisible, setIsVisible] = useState(false);
  // false = initially not visible

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Flips true to false, or false to true
  };

  // ============================================
  // EXAMPLE 4: Object State
  // ============================================
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    age: 25,
  });

  const updateAge = () => {
    // IMPORTANT: Always spread the previous state when updating objects
    setUser({
      ...user, // Copy all existing properties
      age: user.age + 1, // Update only age
    });
  };

  // ============================================
  // EXAMPLE 5: Array State (Todo List)
  // ============================================
  const [todos, setTodos] = useState(["Learn React", "Build Project"]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]); // Add new todo to array
      setNewTodo(""); // Clear input
    }
  };

  const removeTodo = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  // ============================================
  // EXAMPLE 6: Multiple State Variables
  // ============================================
  const [color, setColor] = useState("blue");
  const [size, setSize] = useState("medium");
  // You can have as many useState hooks as you need!

  // ============================================
  // EXAMPLE 7: Functional Update (Previous State)
  // ============================================
  const [score, setScore] = useState(0);

  const addPoints = () => {
    // Method 1: Using current state directly (can cause issues with rapid updates)
    // setScore(score + 10)

    // Method 2: Using function with previous state (RECOMMENDED for updates based on previous state)
    setScore((prevScore) => prevScore + 10);
  };

  const addMultiplePoints = () => {
    // This will correctly add 30 points because each uses previous state
    setScore((prev) => prev + 10);
    setScore((prev) => prev + 10);
    setScore((prev) => prev + 10);
  };

  return (
    <div className="App">
      <h1>🎯 Complete useState Tutorial</h1>

      {/* ============================================ */}
      {/* EXAMPLE 1: COUNTER */}
      {/* ============================================ */}
      <section className="example-section">
        <h2>1️⃣ Counter Example</h2>
        <p>
          Count: <strong>{count}</strong>
        </p>
        <div className="button-group">
          <button onClick={increment}>➕ Increment</button>
          <button onClick={decrement}>➖ Decrement</button>
          <button onClick={reset}>🔄 Reset</button>
        </div>
      </section>

      {/* ============================================ */}
      {/* EXAMPLE 2: STRING STATE */}
      {/* ============================================ */}
      <section className="example-section">
        <h2>2️⃣ String State (Input)</h2>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
        <p>
          Hello, <strong>{name || "Guest"}</strong>!
        </p>
      </section>

      {/* ============================================ */}
      {/* EXAMPLE 3: BOOLEAN STATE */}
      {/* ============================================ */}
      <section className="example-section">
        <h2>3️⃣ Boolean State (Toggle)</h2>
        <button onClick={toggleVisibility}>
          {isVisible ? "👁️ Hide" : "🙈 Show"} Secret Message
        </button>
        {isVisible && (
          <p className="secret-message">🎉 This is the secret message!</p>
        )}
      </section>

      {/* ============================================ */}
      {/* EXAMPLE 4: OBJECT STATE */}
      {/* ============================================ */}
      <section className="example-section">
        <h2>4️⃣ Object State</h2>
        <p>
          User: {user.firstName} {user.lastName}
        </p>
        <p>Age: {user.age}</p>
        <button onClick={updateAge}>🎂 Increase Age</button>
      </section>

      {/* ============================================ */}
      {/* EXAMPLE 5: ARRAY STATE (TODO LIST) */}
      {/* ============================================ */}
      <section className="example-section">
        <h2>5️⃣ Array State (Todo List)</h2>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a todo"
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <button onClick={addTodo}>➕ Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => removeTodo(index)}>❌</button>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================================ */}
      {/* EXAMPLE 6: MULTIPLE STATES */}
      {/* ============================================ */}
      <section className="example-section">
        <h2>6️⃣ Multiple State Variables</h2>
        <div>
          <label>Color: </label>
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
        </div>
        <div>
          <label>Size: </label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div
          className="preview-box"
          style={{
            backgroundColor: color,
            width:
              size === "small" ? "50px" : size === "medium" ? "100px" : "150px",
            height:
              size === "small" ? "50px" : size === "medium" ? "100px" : "150px",
          }}
        ></div>
      </section>

      {/* ============================================ */}
      {/* EXAMPLE 7: FUNCTIONAL UPDATE */}
      {/* ============================================ */}
      <section className="example-section">
        <h2>7️⃣ Functional Update (Score)</h2>
        <p>
          Score: <strong>{score}</strong>
        </p>
        <div className="button-group">
          <button onClick={addPoints}>+10 Points</button>
          <button onClick={addMultiplePoints}>+30 Points (3x10)</button>
          <button onClick={() => setScore(0)}>Reset Score</button>
        </div>
      </section>

      {/* ============================================ */}
      {/* KEY CONCEPTS SUMMARY */}
      {/* ============================================ */}
      <section className="example-section concepts">
        <h2>📚 Key Concepts</h2>
        <div className="concept-grid">
          <div className="concept">
            <h3>🔄 Re-rendering</h3>
            <p>
              When you call setState, React re-renders the component with the
              new value
            </p>
          </div>
          <div className="concept">
            <h3>⚡ Asynchronous</h3>
            <p>
              State updates are asynchronous - the value doesn't change
              immediately
            </p>
          </div>
          <div className="concept">
            <h3>🎯 Immutability</h3>
            <p>Never modify state directly - always use setState function</p>
          </div>
          <div className="concept">
            <h3>📦 Batching</h3>
            <p>React batches multiple setState calls for better performance</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
