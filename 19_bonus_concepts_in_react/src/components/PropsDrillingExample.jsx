import React, { useState } from "react";

// ============================================
// 🎓 PROPS DRILLING COMPLETE EXAMPLE
// ============================================
//
// WHAT IS PROPS DRILLING?
// When you pass props through MULTIPLE layers of components
// even if middle components don't need them!
//
// Structure: GrandParent → Parent → Child → GrandChild
// ============================================

// ============================================
// 🔵 GRANDCHILD COMPONENT (Deepest level)
// ============================================
const GrandChild = ({ userName, onNameChange }) => {
  return (
    <div className="p-4 bg-purple-100 rounded border-2 border-purple-500">
      <h4 className="font-bold text-purple-800">👶 GrandChild Component</h4>
      <p className="text-sm text-purple-600 mb-2">
        I'm the deepest! I received props through drilling.
      </p>

      <p className="mb-2">
        Hello, <strong>{userName}</strong>! 👋
      </p>

      <input
        type="text"
        value={userName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Type your name..."
        className="px-3 py-2 border rounded w-full text-black"
      />
      <p className="text-xs mt-1 text-purple-600">
        ↑ When I type, I call onNameChange to update GrandParent!
      </p>
    </div>
  );
};

// ============================================
// 🟢 CHILD COMPONENT (Middle level)
// ============================================
const Child = ({ userName, onNameChange, count, onIncrement }) => {
  // Notice: This component DOESN'T use userName or onNameChange
  // It just PASSES them down to GrandChild
  // This is called "PROPS DRILLING" 🕳️

  return (
    <div className="p-4 bg-green-100 rounded border-2 border-green-500">
      <h3 className="font-bold text-green-800">👦 Child Component</h3>
      <p className="text-sm text-green-600 mb-2">
        I pass props down, but I also use some myself!
      </p>

      {/* This component USES count and onIncrement */}
      <div className="mb-4 p-2 bg-green-200 rounded">
        <p>
          Count: <strong>{count}</strong>
        </p>
        <button
          onClick={onIncrement}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Increment (I update GrandParent's state!)
        </button>
      </div>

      {/* Passing props down to GrandChild (DRILLING!) */}
      <GrandChild userName={userName} onNameChange={onNameChange} />
    </div>
  );
};

// ============================================
// 🟡 PARENT COMPONENT (Middle level)
// ============================================
const Parent = ({ userName, onNameChange, count, onIncrement }) => {
  // This component also just PASSES props through
  // Another layer of drilling!

  return (
    <div className="p-4 bg-yellow-100 rounded border-2 border-yellow-500">
      <h2 className="font-bold text-yellow-800">👨 Parent Component</h2>
      <p className="text-sm text-yellow-600 mb-2">
        I receive props from GrandParent and pass them down.
      </p>

      <Child
        userName={userName}
        onNameChange={onNameChange}
        count={count}
        onIncrement={onIncrement}
      />
    </div>
  );
};

// ============================================
// 🔴 GRANDPARENT COMPONENT (Top level - Has the STATE)
// ============================================
const GrandParent = () => {
  // 📍 STATE lives here at the top!
  const [userName, setUserName] = useState("Satya");
  const [count, setCount] = useState(0);

  // Handler functions to pass down
  const handleNameChange = (newName) => {
    console.log("GrandParent received name from GrandChild:", newName);
    setUserName(newName);
  };

  const handleIncrement = () => {
    console.log("GrandParent received increment from Child");
    setCount((prev) => prev + 1);
  };

  return (
    <div className="p-4 bg-red-100 rounded border-2 border-red-500">
      <h1 className="text-xl font-bold text-red-800">
        👴 GrandParent Component
      </h1>
      <p className="text-sm text-red-600 mb-2">
        I OWN the state! Everyone updates ME.
      </p>

      <div className="mb-4 p-2 bg-red-200 rounded">
        <p>📊 My State:</p>
        <p>
          - userName: <strong>{userName}</strong>
        </p>
        <p>
          - count: <strong>{count}</strong>
        </p>
      </div>

      {/* Pass state AND functions down */}
      <Parent
        userName={userName}
        onNameChange={handleNameChange}
        count={count}
        onIncrement={handleIncrement}
      />
    </div>
  );
};

// ============================================
// 📚 MAIN EXPORT - Demo Component
// ============================================
const PropsDrillingExample = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">🎓 Props Drilling Example</h1>

      <div className="mb-6 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
        <h2 className="font-bold text-blue-800">📖 What's happening here?</h2>
        <ul className="text-sm text-blue-700 mt-2 space-y-1">
          <li>
            • <strong>GrandParent</strong> owns the state (userName, count)
          </li>
          <li>
            • <strong>Parent</strong> receives props and passes them down
          </li>
          <li>
            • <strong>Child</strong> uses some props, passes others down
          </li>
          <li>
            • <strong>GrandChild</strong> can UPDATE GrandParent by calling the
            function!
          </li>
        </ul>
        <p className="mt-2 text-sm text-blue-600 font-medium">
          💡 Data flows DOWN as props, but child can "talk back" by calling
          functions!
        </p>
      </div>

      <GrandParent />

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-bold">⚠️ Problem with Props Drilling:</h3>
        <p className="text-sm text-gray-600">
          When you have many layers, passing props becomes tedious and
          error-prone.
          <br />
          <strong>Solutions:</strong> Context API, Redux, Zustand (you'll learn
          these later!)
        </p>
      </div>
    </div>
  );
};

export default PropsDrillingExample;
