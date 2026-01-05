/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                    TWO-WAY BINDING IN REACT - BEGINNER'S GUIDE              ║
╚══════════════════════════════════════════════════════════════════════════════╝

WHAT IS TWO-WAY BINDING? 🔄
---------------------------
Two-way binding means the data flows in BOTH directions:

1. FROM STATE TO UI (Display the value)
   State → Input Field (Shows what's stored in state)

2. FROM UI TO STATE (Update the value)  
   Input Field → State (When user types, state updates)

Think of it like a two-way street where traffic flows both ways!


REAL-WORLD ANALOGY 🌍
---------------------
Imagine a thermostat on your wall:

📊 Display shows temperature (State → UI)
   The screen displays the current temperature setting

🎛️ You adjust the dial (UI → State)
   When you turn the dial, the temperature setting changes

The display always shows what you set, and setting changes what displays.
That's two-way binding!


WHY IS IT USEFUL? 💡
--------------------
✅ User sees exactly what's stored
✅ Changes immediately reflected
✅ Forms and inputs stay in sync with data
✅ Easier to manage user input
✅ Perfect for forms, search bars, calculators, etc.


HOW IT WORKS IN REACT:
----------------------
React doesn't have "automatic" two-way binding like some frameworks (Angular, Vue).
Instead, we CREATE it manually using:

1. value={state} - Binds the input VALUE to our state (State → UI)
2. onChange={handler} - Updates state when user types (UI → State)

This combination creates the two-way binding effect!
*/

import { useState } from "react";
import "./App.css";

function App() {
  /*
  ══════════════════════════════════════════════════════════════════════════
                            STATE DECLARATIONS
  ══════════════════════════════════════════════════════════════════════════
  */

  // Example 1: Simple text input
  const [username, setUsername] = useState("");
  // username: stores what user types
  // setUsername: function to update username
  // '': starts empty

  // Example 2: Email input
  const [email, setEmail] = useState("");

  // Example 3: Number input
  const [age, setAge] = useState(0);

  // Example 4: Textarea (multi-line text)
  const [message, setMessage] = useState("");

  // Example 5: Checkbox (boolean - true/false)
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Example 6: Select dropdown
  const [country, setCountry] = useState("USA");

  // Example 7: Range slider
  const [volume, setVolume] = useState(50);

  // Example 8: Multiple inputs in one object (form data)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  /*
  ══════════════════════════════════════════════════════════════════════════
                        TWO-WAY BINDING EXPLAINED STEP-BY-STEP
  ══════════════════════════════════════════════════════════════════════════
  
  Let's break down how two-way binding works with a simple example:
  
  <input 
    value={username}           ← PART 1: State → UI (Display)
    onChange={(e) => setUsername(e.target.value)}  ← PART 2: UI → State (Update)
  />
  
  PART 1: value={username}
  ------------------------
  - The input field DISPLAYS whatever is in the 'username' state
  - If username = "John", the input shows "John"
  - If username = "", the input is empty
  - This is ONE-WAY: State → UI
  
  PART 2: onChange={(e) => setUsername(e.target.value)}
  ------------------------------------------------------
  - When user types in the input, onChange event fires
  - 'e' is the event object (React gives us this automatically)
  - 'e.target' is the input element itself
  - 'e.target.value' is the NEW text the user just typed
  - setUsername() updates our state with the new value
  - This is ONE-WAY: UI → State
  
  PART 1 + PART 2 = TWO-WAY BINDING! 🎉
  --------------------------------------
  - User types "J" → onChange fires → setUsername("J") → username becomes "J"
  - username = "J" → value={username} → input shows "J"
  - User types "o" → onChange fires → setUsername("Jo") → username becomes "Jo"  
  - username = "Jo" → value={username} → input shows "Jo"
  
  The cycle continues! Data flows both ways continuously.
  */

  /*
  ══════════════════════════════════════════════════════════════════════════
                            HANDLER FUNCTIONS
  ══════════════════════════════════════════════════════════════════════════
  */

  // Handler for username input
  const handleUsernameChange = (event) => {
    // event.target.value contains what the user typed
    setUsername(event.target.value);

    // You can also add validation or transformations here!
    // Example: Convert to uppercase
    // setUsername(event.target.value.toUpperCase())
  };

  // Handler for email input
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handler for age input
  const handleAgeChange = (event) => {
    // Convert string to number for numeric inputs
    setAge(Number(event.target.value));
  };

  // Handler for textarea
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Handler for checkbox
  const handleCheckboxChange = (event) => {
    // For checkboxes, use .checked instead of .value
    // .checked gives us true or false
    setIsSubscribed(event.target.checked);
  };

  // Handler for select dropdown
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  // Handler for range slider
  const handleVolumeChange = (event) => {
    setVolume(Number(event.target.value));
  };

  // Handler for form with multiple inputs (object state)
  const handleFormChange = (event) => {
    // Get the input's name and value
    const { name, value } = event.target;
    // name = which input field (firstName, lastName, phone)
    // value = what the user typed

    setFormData({
      ...formData, // Keep all existing values (spread operator)
      [name]: value, // Update only the field that changed
    });

    /*
    HOW THIS WORKS:
    ---------------
    If formData = { firstName: 'John', lastName: 'Doe', phone: '123' }
    And user types in the lastName field:
    
    1. name = 'lastName'
    2. value = 'Smith' (what user typed)
    3. ...formData copies: { firstName: 'John', lastName: 'Doe', phone: '123' }
    4. [name]: value updates: lastName: 'Smith'
    5. Result: { firstName: 'John', lastName: 'Smith', phone: '123' }
    
    Only lastName changed, others stayed the same!
    */
  };

  // Clear all form data
  const handleReset = () => {
    setUsername("");
    setEmail("");
    setAge(0);
    setMessage("");
    setIsSubscribed(false);
    setCountry("USA");
    setVolume(50);
    setFormData({ firstName: "", lastName: "", phone: "" });
  };

  // Show form data (simulate form submission)
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh (default form behavior)

    // Display all collected data
    alert(`
      Form Submitted! 🎉
      
      Username: ${username}
      Email: ${email}
      Age: ${age}
      Message: ${message}
      Subscribed: ${isSubscribed ? "Yes" : "No"}
      Country: ${country}
      Volume: ${volume}%
      
      Name: ${formData.firstName} ${formData.lastName}
      Phone: ${formData.phone}
    `);
  };

  /*
  ══════════════════════════════════════════════════════════════════════════
                                JSX RETURN
  ══════════════════════════════════════════════════════════════════════════
  */

  return (
    <div className="App">
      <h1>🔄 Two-Way Binding in React</h1>
      <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto" }}>
        Type in any field below and watch how the values update in real-time!
        This is two-way binding in action. 🚀
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "20px auto" }}
      >
        {/* ═══════════════ EXAMPLE 1: TEXT INPUT ═══════════════ */}
        <section
          style={{
            border: "2px solid #61dafb",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "8px",
          }}
        >
          <h2>📝 Text Input</h2>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Username:
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              /*
                👆 BINDING PART 1: State → UI
                The input displays whatever is in 'username' state
                If username changes, the input automatically updates
              */
              onChange={handleUsernameChange}
              /*
                👆 BINDING PART 2: UI → State
                When user types, this function runs
                It updates the 'username' state with the new value
                This creates the complete two-way binding!
              */
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>
          <p
            style={{
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            ✨ Current value: <strong>{username || "(empty)"}</strong>
          </p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Character count: {username.length}
          </p>
        </section>

        {/* ═══════════════ EXAMPLE 2: EMAIL INPUT ═══════════════ */}
        <section
          style={{
            border: "2px solid #ff6b6b",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "8px",
          }}
        >
          <h2>📧 Email Input</h2>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email} // State → UI
              onChange={handleEmailChange} // UI → State
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>
          <p
            style={{
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            ✨ Current email: <strong>{email || "(empty)"}</strong>
          </p>
          <p
            style={{
              fontSize: "14px",
              color: email.includes("@") ? "green" : "red",
            }}
          >
            {email.includes("@") ? "✅ Valid format" : "❌ Missing @ symbol"}
          </p>
        </section>

        {/* ═══════════════ EXAMPLE 3: NUMBER INPUT ═══════════════ */}
        <section
          style={{
            border: "2px solid #feca57",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "8px",
          }}
        >
          <h2>🔢 Number Input</h2>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Age:
            </label>
            <input
              type="number"
              placeholder="Enter your age"
              value={age} // State → UI
              onChange={handleAgeChange} // UI → State
              min="0"
              max="120"
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>
          <p
            style={{
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            ✨ Current age: <strong>{age}</strong>
          </p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            {age >= 18 ? "👍 Adult" : "🧒 Minor"}
          </p>
        </section>

        {/* ═══════════════ EXAMPLE 4: TEXTAREA ═══════════════ */}
        <section
          style={{
            border: "2px solid #48dbfb",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "8px",
          }}
        >
          <h2>💬 Textarea (Multi-line)</h2>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Message:
            </label>
            <textarea
              placeholder="Enter your message"
              value={message} // State → UI
              onChange={handleMessageChange} // UI → State
              rows="4"
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                fontFamily: "inherit",
              }}
            />
          </div>
          <p
            style={{
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            ✨ Message length: <strong>{message.length}</strong> characters
          </p>
        </section>

        {/* ═══════════════ EXAMPLE 5: CHECKBOX ═══════════════ */}
        <section
          style={{
            border: "2px solid #ee5a6f",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "8px",
          }}
        >
          <h2>☑️ Checkbox</h2>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={isSubscribed}
                /*
                  📌 NOTE: For checkboxes, we use 'checked' instead of 'value'
                  checked={state} → Shows checked/unchecked based on state (boolean)
                */
                onChange={handleCheckboxChange}
                /*
                  📌 In the handler, we use event.target.checked (not .value)
                  .checked returns true or false
                */
                style={{
                  marginRight: "10px",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: "16px" }}>Subscribe to newsletter</span>
            </label>
          </div>
          <p
            style={{
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            ✨ Subscription status:{" "}
            <strong>
              {isSubscribed ? "✅ Subscribed" : "❌ Not Subscribed"}
            </strong>
          </p>
        </section>

        {/* ═══════════════ EXAMPLE 6: SELECT DROPDOWN ═══════════════ */}
        <section
          style={{
            border: "2px solid #0abde3",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "8px",
          }}
        >
          <h2>🌍 Select Dropdown</h2>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Country:
            </label>
            <select
              value={country} // State → UI (selected option)
              onChange={handleCountryChange} // UI → State
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            >
              <option value="USA">🇺🇸 United States</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="India">🇮🇳 India</option>
              <option value="Australia">🇦🇺 Australia</option>
            </select>
          </div>
          <p
            style={{
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            ✨ Selected country: <strong>{country}</strong>
          </p>
        </section>

        {/* ═══════════════ EXAMPLE 7: RANGE SLIDER ═══════════════ */}
        <section
          style={{
            border: "2px solid #c23616",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "8px",
          }}
        >
          <h2>🎚️ Range Slider</h2>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Volume: {volume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume} // State → UI (slider position)
              onChange={handleVolumeChange} // UI → State
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                width: `${volume}%`,
                height: "30px",
                background: "linear-gradient(to right, #00b894, #0984e3)",
                borderRadius: "4px",
                transition: "width 0.2s ease",
              }}
            />
          </div>
        </section>

        {/* ═══════════════ EXAMPLE 8: MULTIPLE INPUTS (OBJECT STATE) ═══════════════ */}
        <section
          style={{
            border: "2px solid #6c5ce7",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "8px",
          }}
        >
          <h2>📋 Multiple Inputs (Form Object)</h2>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
            This example shows how to handle multiple inputs efficiently using a
            single state object.
          </p>

          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              /*
                📌 The 'name' attribute is crucial here!
                It tells us WHICH field in the object to update
              */
              placeholder="Enter first name"
              value={formData.firstName} // Access nested property
              onChange={handleFormChange} // Single handler for all inputs!
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Last Name:
            </label>
            <input
              type="text"
              name="lastName" // Different name!
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleFormChange} // Same handler!
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Phone:
            </label>
            <input
              type="tel"
              name="phone" // Different name!
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleFormChange} // Same handler!
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>

          <div
            style={{
              background: "#f0f0f0",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            <p style={{ margin: "5px 0" }}>
              <strong>Full Name:</strong> {formData.firstName}{" "}
              {formData.lastName}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Phone:</strong> {formData.phone || "(not provided)"}
            </p>
          </div>
        </section>

        {/* ═══════════════ FORM ACTIONS ═══════════════ */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              background: "#00b894",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ✅ Submit Form
          </button>

          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              background: "#d63031",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🔄 Reset All
          </button>
        </div>
      </form>

      {/* ═══════════════ KEY CONCEPTS SUMMARY ═══════════════ */}
      <section
        style={{
          border: "2px solid #2ecc71",
          padding: "20px",
          margin: "30px auto",
          borderRadius: "8px",
          maxWidth: "600px",
          background: "#f9fff9",
        }}
      >
        <h2>🎓 Key Concepts - Two-Way Binding</h2>
        <ul style={{ textAlign: "left", lineHeight: "1.8" }}>
          <li>
            <strong>State → UI:</strong> Use <code>value={"{state}"}</code> to
            display state in input
          </li>
          <li>
            <strong>UI → State:</strong> Use <code>onChange={"{handler}"}</code>{" "}
            to update state when user types
          </li>
          <li>
            <strong>Together:</strong> These create a synchronized loop (two-way
            binding!)
          </li>
          <li>
            <strong>For text inputs:</strong> Use{" "}
            <code>event.target.value</code>
          </li>
          <li>
            <strong>For checkboxes:</strong> Use{" "}
            <code>checked={"{state}"}</code> and{" "}
            <code>event.target.checked</code>
          </li>
          <li>
            <strong>For objects:</strong> Use spread operator{" "}
            <code>{"...state"}</code> to preserve other fields
          </li>
          <li>
            <strong>Always:</strong> Create new state objects/arrays, never
            mutate directly!
          </li>
        </ul>
      </section>
    </div>
  );
}

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                              COMMON PATTERNS                                 ║
╚══════════════════════════════════════════════════════════════════════════════╝

1. SIMPLE TEXT INPUT:
   <input value={state} onChange={(e) => setState(e.target.value)} />

2. CHECKBOX:
   <input type="checkbox" checked={state} onChange={(e) => setState(e.target.checked)} />

3. SELECT DROPDOWN:
   <select value={state} onChange={(e) => setState(e.target.value)}>
     <option value="option1">Option 1</option>
   </select>

4. TEXTAREA:
   <textarea value={state} onChange={(e) => setState(e.target.value)} />

5. RADIO BUTTON:
   <input type="radio" checked={state === 'value'} onChange={() => setState('value')} />

6. MULTIPLE INPUTS (OBJECT):
   <input name="field" value={formData.field} onChange={(e) => {
     setFormData({...formData, [e.target.name]: e.target.value})
   }} />


╔══════════════════════════════════════════════════════════════════════════════╗
║                           CONTROLLED vs UNCONTROLLED                         ║
╚══════════════════════════════════════════════════════════════════════════════╝

CONTROLLED COMPONENTS (what we're using - RECOMMENDED):
✅ React controls the input value through state
✅ value={state} makes React the "single source of truth"
✅ Easy to validate, transform, or sync data
✅ Predictable and easier to debug

UNCONTROLLED COMPONENTS (not recommended for most cases):
❌ DOM controls the input value (like vanilla JavaScript)
❌ Use ref to access value only when needed
❌ Harder to validate or sync with other components
❌ Use only for simple forms or file inputs


Remember: Two-way binding = value + onChange working together! 🎉
*/

export default App;
