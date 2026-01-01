/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                    REACT HOOKS - COMPLETE BEGINNER'S GUIDE                   ║
╚══════════════════════════════════════════════════════════════════════════════╝

WHAT ARE HOOKS? 🎣
------------------
Hooks are special functions that let you "hook into" React features.
Think of them as superpowers for your functional components!

Before Hooks (old way):
- You needed Class Components to use state and lifecycle methods
- Code was harder to understand and reuse

After Hooks (modern way):
- You can use state and other React features in functional components
- Code is cleaner, easier to read, and more reusable

HOOK RULES: 📜
--------------
1. Only call Hooks at the TOP LEVEL of your component (not inside loops, conditions, or nested functions)
2. Only call Hooks in React functional components or custom Hooks
3. Hook names always start with "use" (useState, useEffect, useCustomHook)

Let's explore the most important Hooks! 🚀
*/

// Importing React and the Hooks we'll use
import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  /*
  ╔══════════════════════════════════════════════════════════════════════════╗
  ║                           1. useState HOOK                               ║
  ╚══════════════════════════════════════════════════════════════════════════╝
  
  WHAT IS STATE? 🤔
  -----------------
  State is like a component's MEMORY. It remembers values even when the 
  component re-renders (updates).
  
  WHY DO WE NEED IT?
  ------------------
  Regular variables reset every time a component re-renders.
  State variables persist and when they change, React automatically 
  updates the UI!
  
  SYNTAX:
  -------
  const [variableName, setterFunction] = useState(initialValue)
  
  - variableName: The current value you want to store
  - setterFunction: A function to UPDATE that value
  - initialValue: The starting value when component first loads
  
  REAL-WORLD ANALOGY:
  -------------------
  Think of useState like a thermostat:
  - The display shows the current temperature (count)
  - The buttons change the temperature (setCount)
  - The thermostat remembers the setting (state persists)
  */

  // Example 1: Simple Counter
  const [count, setCount] = useState(0);
  // count = current value (starts at 0)
  // setCount = function to change count
  // 0 = initial value

  // Example 2: Text Input
  const [name, setName] = useState("");
  // Empty string '' as initial value

  // Example 3: Boolean (true/false)
  const [isVisible, setIsVisible] = useState(false);
  // Useful for showing/hiding elements

  // Example 4: Array
  const [todos, setTodos] = useState(["Learn React", "Build Projects"]);
  // State can hold any data type: numbers, strings, arrays, objects!

  // Example 5: Object
  const [user, setUser] = useState({
    username: "Guest",
    age: 0,
  });

  /*
  ╔══════════════════════════════════════════════════════════════════════════╗
  ║                          2. useEffect HOOK                               ║
  ╚══════════════════════════════════════════════════════════════════════════╝
  
  WHAT IS useEffect? ⚡
  --------------------
  useEffect lets you perform "side effects" in your component.
  
  WHAT ARE SIDE EFFECTS?
  ----------------------
  Actions that reach outside your component:
  - Fetching data from an API
  - Setting up subscriptions
  - Manually changing the DOM
  - Setting timers
  - Logging to console
  
  SYNTAX:
  -------
  useEffect(() => {
    // Code to run (the effect)
    
    return () => {
      // Cleanup code (optional)
    }
  }, [dependencies])
  
  DEPENDENCY ARRAY EXPLAINED: 🔍
  -------------------------------
  The second parameter [] controls WHEN the effect runs:
  
  1. useEffect(() => {}, [])       // Runs ONCE when component mounts (loads)
  2. useEffect(() => {})           // Runs AFTER EVERY render (be careful!)
  3. useEffect(() => {}, [count])  // Runs when 'count' changes
  4. useEffect(() => {}, [a, b])   // Runs when 'a' OR 'b' changes
  
  REAL-WORLD ANALOGY:
  -------------------
  Think of useEffect like automatic notifications:
  - [] = "Notify me only when I open the app"
  - [count] = "Notify me whenever the count changes"
  - No array = "Notify me about everything, all the time"
  */

  // Example 1: Run once when component loads
  useEffect(() => {
    console.log("🎉 Component mounted! This runs only ONCE when the app loads");

    // This is like initialization code
    // Perfect for: fetching data, setting up subscriptions, etc.
  }, []); // Empty array [] = run only once

  // Example 2: Run whenever count changes
  useEffect(() => {
    console.log(`📊 Count changed! New value: ${count}`);

    // This runs every time 'count' state changes
    // You can sync with external systems here
  }, [count]); // Runs when count changes

  // Example 3: Document title updater (practical example!)
  useEffect(() => {
    // Update the browser tab title dynamically
    document.title = `Count: ${count}`;

    // Now your browser tab shows the current count!
  }, [count]);

  // Example 4: Cleanup function (important for timers/subscriptions)
  useEffect(() => {
    // Set up a timer
    const timer = setInterval(() => {
      console.log("⏰ Timer tick...");
    }, 1000); // Runs every 1 second

    // CLEANUP FUNCTION
    // This runs when:
    // 1. Component unmounts (removed from screen)
    // 2. Before the effect runs again
    return () => {
      clearInterval(timer); // Stop the timer to prevent memory leaks!
      console.log("🧹 Cleaned up timer");
    };
  }, []);

  // Example 5: Fetch data (common real-world use case)
  useEffect(() => {
    // Async function to fetch data
    const fetchData = async () => {
      try {
        console.log("🌐 Fetching data from API...");
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        const data = await response.json();
        console.log("✅ Data received:", data.name);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData(); // Call the function
  }, []); // Run once when component loads

  /*
  ╔══════════════════════════════════════════════════════════════════════════╗
  ║                           3. useRef HOOK                                 ║
  ╚══════════════════════════════════════════════════════════════════════════╝
  
  WHAT IS useRef? 📌
  ------------------
  useRef creates a "reference" to a value that:
  1. Persists across re-renders (like state)
  2. Does NOT trigger re-renders when changed (unlike state)
  
  TWO MAIN USES:
  --------------
  1. Access DOM elements directly (like document.querySelector)
  2. Store values that shouldn't trigger re-renders
  
  SYNTAX:
  -------
  const myRef = useRef(initialValue)
  // Access value with: myRef.current
  
  REAL-WORLD ANALOGY:
  -------------------
  Think of useRef like a sticky note:
  - You can write on it and read from it
  - Changing what's written doesn't alert everyone (no re-render)
  - The note stays even when you redecorate the room (re-render)
  */

  const inputRef = useRef(null);
  // This will point to an input element

  const renderCount = useRef(0);
  // Track how many times component rendered (without causing re-renders!)

  // Increment render count on every render
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log(`🔄 Component rendered ${renderCount.current} times`);
  });

  // Function to focus the input using the ref
  const focusInput = () => {
    // inputRef.current is the actual DOM element
    inputRef.current.focus(); // Native DOM method
    inputRef.current.style.backgroundColor = "lightblue";
  };

  /*
  ╔══════════════════════════════════════════════════════════════════════════╗
  ║                       HANDLER FUNCTIONS                                  ║
  ╚══════════════════════════════════════════════════════════════════════════╝
  
  These are regular functions that handle user interactions.
  They update state based on what the user does.
  */

  // Increment count by 1
  const increment = () => {
    setCount(count + 1);
    // or use callback form for safer updates:
    // setCount(prevCount => prevCount + 1)
  };

  // Decrement count by 1
  const decrement = () => {
    setCount(count - 1);
  };

  // Reset count to 0
  const reset = () => {
    setCount(0);
  };

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible); // ! flips true to false and vice versa
  };

  // Update name from input
  const handleNameChange = (event) => {
    setName(event.target.value); // Get the typed value
  };

  // Add new todo
  const addTodo = () => {
    const newTodo = `Task ${todos.length + 1}`;
    setTodos([...todos, newTodo]);
    // [...todos, newTodo] creates a NEW array with all old items + new item
    // NEVER directly modify state: todos.push(newTodo) ❌ WRONG!
  };

  // Update user object
  const updateUsername = () => {
    setUser({
      ...user, // Copy all existing properties
      username: name || "Anonymous", // Update only username
    });
    // NEVER do: user.username = name ❌ WRONG!
    // Always create NEW object when updating state
  };

  /*
  ╔══════════════════════════════════════════════════════════════════════════╗
  ║                              JSX RETURN                                  ║
  ╚══════════════════════════════════════════════════════════════════════════╝
  */

  return (
    <div className="App">
      <h1>🎣 React Hooks Playground</h1>

      {/* ========== useState EXAMPLES ========== */}
      <section
        style={{
          border: "2px solid #61dafb",
          padding: "20px",
          margin: "20px 0",
        }}
      >
        <h2>📦 useState Hook</h2>

        {/* Counter Example */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Counter: {count}</h3>
          <button onClick={increment}>➕ Increment</button>
          <button onClick={decrement}>➖ Decrement</button>
          <button onClick={reset}>🔄 Reset</button>
        </div>

        {/* Text Input Example */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Hello, {name || "stranger"}! 👋</h3>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        {/* Toggle Visibility Example */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={toggleVisibility}>
            {isVisible ? "🙈 Hide" : "👀 Show"} Secret Message
          </button>
          {/* Conditional rendering - show only if isVisible is true */}
          {isVisible && (
            <p style={{ color: "green" }}>🎉 You found the secret message!</p>
          )}
        </div>

        {/* Array State Example */}
        <div style={{ marginBottom: "20px" }}>
          <h3>📝 Todo List ({todos.length} items)</h3>
          <button onClick={addTodo}>➕ Add Todo</button>
          <ul>
            {/* Loop through array and display each item */}
            {todos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>

        {/* Object State Example */}
        <div>
          <h3>👤 User Info</h3>
          <p>Username: {user.username}</p>
          <p>Age: {user.age}</p>
          <button onClick={updateUsername}>
            Update Username from Input Above
          </button>
        </div>
      </section>

      {/* ========== useEffect EXAMPLES ========== */}
      <section
        style={{
          border: "2px solid #ff6b6b",
          padding: "20px",
          margin: "20px 0",
        }}
      >
        <h2>⚡ useEffect Hook</h2>
        <p>Open the browser console (F12) to see useEffect in action!</p>
        <p>Component has rendered {renderCount.current} times</p>
        <p>Current count: {count} (watch console when this changes)</p>
        <p>Check your browser tab title - it updates with the count! 📑</p>
      </section>

      {/* ========== useRef EXAMPLES ========== */}
      <section
        style={{
          border: "2px solid #feca57",
          padding: "20px",
          margin: "20px 0",
        }}
      >
        <h2>📌 useRef Hook</h2>
        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Click button to focus me!"
          />
          <button onClick={focusInput}>🎯 Focus Input</button>
        </div>
        <p>
          Render count is tracked with useRef (doesn't cause re-renders):
          {renderCount.current}
        </p>
      </section>

      {/* ========== KEY TAKEAWAYS ========== */}
      <section
        style={{
          border: "2px solid #48dbfb",
          padding: "20px",
          margin: "20px 0",
        }}
      >
        <h2>🎓 Key Takeaways</h2>
        <ul style={{ textAlign: "left" }}>
          <li>
            <strong>useState:</strong> For values that change and should update
            the UI
          </li>
          <li>
            <strong>useEffect:</strong> For side effects (API calls, timers,
            subscriptions)
          </li>
          <li>
            <strong>useRef:</strong> For DOM access and values that persist but
            don't need re-renders
          </li>
          <li>
            <strong>Always:</strong> Call hooks at the top level, never in
            loops/conditions
          </li>
          <li>
            <strong>State Updates:</strong> Never mutate state directly, always
            use setter functions
          </li>
          <li>
            <strong>Objects/Arrays:</strong> Create new copies when updating
            (...spread operator)
          </li>
        </ul>
      </section>
    </div>
  );
}

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                           ADDITIONAL HOOKS TO EXPLORE                         ║
╚══════════════════════════════════════════════════════════════════════════════╝

Once you're comfortable with the basics, explore these:

1. useContext - Share data across components without prop drilling
2. useReducer - Complex state management (like Redux but built-in)
3. useMemo - Optimize performance by memoizing expensive calculations
4. useCallback - Optimize performance by memoizing functions
5. useLayoutEffect - Like useEffect but runs synchronously after DOM updates
6. useImperativeHandle - Customize ref behavior (advanced)
7. useDebugValue - Add labels in React DevTools (for custom hooks)

Custom Hooks:
-------------
You can create your own hooks! Start with "use" and combine built-in hooks:

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue
  })
  
  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])
  
  return [value, setValue]
}

Happy Coding! 🚀
*/

export default App;
