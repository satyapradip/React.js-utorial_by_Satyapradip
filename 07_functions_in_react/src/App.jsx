// Importing React library - this is required for all React components
import React from "react";

// App is a functional component (a special function that returns JSX/HTML)
// Arrow function syntax: () => {} is a modern JavaScript way to write functions
const App = () => {
  // ========== EXAMPLE 1: Named Function (Commented Out) ==========
  // This is a regular named function that can be called when a button is clicked
  // function btnclicked(){
  //   console.log(`Button is clicked`)
  // }
  // How to use: <button onClick={btnclicked}>Click Me</button>
  // Note: We pass the function NAME (btnclicked), NOT the function call (btnclicked())
  // If you write btnclicked(), it will execute immediately when the page loads!

  // ========== EXAMPLE 2: Named Function with Parameters ==========
  // This function accepts a parameter 'val' and logs it to the console
  // Parameters allow functions to receive data and work with it
  function inputChanging(val) {
    console.log(val); // Prints the value to browser's console (F12 Developer Tools)
  }
  // This function will receive the text typed in the input field
  // 'val' will contain whatever the user types

  // ========== RETURN STATEMENT ==========
  // The return statement sends back JSX (looks like HTML but it's JavaScript)
  // This JSX becomes the actual HTML that appears on your web page
  return (
    <div>
      {/* This is a JSX comment - use curly braces with slash-asterisk for JSX comments */}
      <h1>Hello guys</h1>
      {/* ========== BUTTON WITH INLINE ARROW FUNCTION ========== */}
      {/* 
        onClick is an EVENT HANDLER - it waits for a click event
        
        We're using an ARROW FUNCTION directly inside onClick:
        () => { console.log("Button clicked") }
        
        How it works:
        1. When user clicks the button, React calls this arrow function
        2. The function runs and prints "Button clicked" to console
        3. Arrow functions are useful for short, one-time-use code
        
        Why arrow function instead of just the code?
        - onClick needs a FUNCTION, not the result of code
        - () => {} creates a function that runs when clicked
        - Without the arrow function, the code would run immediately on page load!
      */}
      <button
        onClick={() => {
          console.log("Button clicked");
        }}
      >
        Change User
      </button>
      {/* ========== INPUT FIELD WITH FUNCTION ========== */}
      {/* 
        onChange is an EVENT HANDLER - it triggers whenever the input value changes
        
        We're using a REGULAR FUNCTION (not arrow function) as the onChange handler:
        function(elem) { inputChanging(elem.target.value) }
        
        How it works step-by-step:
        1. User types a letter in the input field
        2. React automatically calls this function
        3. React passes an 'event object' (elem) to the function
        4. 'elem' contains information about what happened
        5. 'elem.target' refers to the input field itself
        6. 'elem.target.value' is the current text in the input field
        7. We pass that value to our inputChanging() function
        8. inputChanging() prints it to the console
        
        Why elem.target.value?
        - elem = the event object (React gives us this automatically)
        - target = the element that triggered the event (the input field)
        - value = the current text content of that input field
        
        Alternative ways to write this:
        - onChange={(elem) => inputChanging(elem.target.value)} - Arrow function
        - onChange={(e) => console.log(e.target.value)} - Shorter version
        - onChange={handleChange} - Calling a separate function
      */}
      <input
        onChange={function (elem) {
          inputChanging(elem.target.value);
        }}
        type="text"
        placeholder="Type something..."
      />
      {/* 
        SUMMARY OF FUNCTION APPROACHES IN REACT:
        
        1. Named Function (defined separately):
           function myFunc() { }
           <button onClick={myFunc}>Click</button>
           ✓ Good for: Reusable functions, complex logic
           
        2. Inline Arrow Function:
           <button onClick={() => console.log("Hi")}>Click</button>
           ✓ Good for: Short, one-time-use code
           
        3. Inline Regular Function:
           <button onClick={function() { console.log("Hi") }}>Click</button>
           ✓ Good for: When you need 'this' keyword behavior (advanced topic)
           
        4. Function Call in Arrow Function:
           <button onClick={() => myFunc(param)}>Click</button>
           ✓ Good for: Passing arguments to your function
      */}
    </div>
  );
};

// Exporting the component so it can be imported and used in other files (like main.jsx)
// 'default' means this is the main export from this file
export default App;
