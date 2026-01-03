// Import necessary React hooks
import { useState, useEffect } from "react";
import "./App.css";

// Main App component that manages all form demos
function App() {
  // State to track which demo is currently active/visible
  // State to track which demo is currently active/visible
  const [activeDemo, setActiveDemo] = useState(1);

  // Array of all available demos with their configurations
  // Each demo has an id, name, and component to render
  const demos = [
    { id: 1, name: "🎯 Level 1: Basic Form", component: <BasicForm /> },
    {
      id: 2,
      name: "🎮 Level 2: Controlled Form",
      component: <ControlledForm />,
    },
    {
      id: 3,
      name: "📝 Level 3: Multiple Fields",
      component: <MultiFieldForm />,
    },
    { id: 4, name: "✅ Level 4: Validation", component: <ValidatedForm /> },
    { id: 5, name: "🎨 Level 5: All Input Types", component: <ComplexForm /> },
    { id: 6, name: "🔧 Level 6: Custom Hook", component: <CustomHookDemo /> },
    { id: 7, name: "🚀 Level 7: Advanced - Search", component: <SearchForm /> },
    { id: 8, name: "📁 Level 7: File Upload", component: <FileUploadForm /> },
    {
      id: 9,
      name: "📊 Level 7: Multi-Step Form",
      component: <MultiStepForm />,
    },
    { id: 10, name: "➕ Level 7: Dynamic Fields", component: <DynamicForm /> },
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎓 React Form Handling - Complete Tutorial</h1>
        <p>From Beginner to Advanced</p>
      </header>

      {/* Navigation buttons for switching between demos */}
      <div className="demo-selector">
        {demos.map((demo) => (
          <button
            key={demo.id}
            // Add 'active' class to highlight current demo
            className={activeDemo === demo.id ? "active" : ""}
            // Update state to show selected demo
            onClick={() => setActiveDemo(demo.id)}
          >
            {demo.name}
          </button>
        ))}
      </div>

      {/* Container for displaying the currently active demo */}
      <div className="demo-container">
        {/* Find and render the component of the active demo */}
        {demos.find((demo) => demo.id === activeDemo)?.component}
      </div>

      <footer className="app-footer">
        <p>💡 Check FORM_HANDLING_GUIDE.md for detailed explanations!</p>
      </footer>
    </div>
  );
}

// ===========================
// LEVEL 1: BASIC FORM (Uncontrolled Component)
// ===========================
// This is an UNCONTROLLED form - the DOM manages the input values,
// not React state. We only access values when needed (on submit).
function BasicForm() {
  // Handle form submission
  const handleSubmit = (e) => {
    // CRITICAL: Prevent default form submission (which would reload the page)
    e.preventDefault();

    // FormData API - a built-in way to get all form values
    const formData = new FormData(e.target);

    // Get specific value by input's 'name' attribute
    const name = formData.get("name");

    alert(`Hello, ${name}! (Uncontrolled form)`);
  };

  return (
    <div className="demo-section">
      <h2>🎯 Level 1: Basic Uncontrolled Form</h2>
      <p className="explanation">
        The simplest form. The DOM handles the data, we just read it on submit.
        No React state needed!
      </p>

      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label>Your Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <div className="info-box">
        <strong>How it works:</strong>
        <ul>
          <li>Input stores its own value (DOM manages it)</li>
          <li>We only access the value when form submits</li>
          <li>Use FormData or refs to get values</li>
        </ul>
      </div>
    </div>
  );
}

// ===========================
// LEVEL 2: CONTROLLED FORM (Controlled Component)
// ===========================
// This is a CONTROLLED form - React state manages the input value.
// Every keystroke updates the state, giving us full control.
function ControlledForm() {
  // State to store the input value
  // This is the "single source of truth" for the input
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    // Always prevent default to avoid page reload
    e.preventDefault();

    alert(`Hello, ${name}! (Controlled form)`);

    // Reset the form by clearing state
    setName("");
  };

  return (
    <div className="demo-section">
      <h2>🎮 Level 2: Controlled Component</h2>
      <p className="explanation">
        React state controls the input value. Every keystroke updates the state.
        This gives us full control!
      </p>

      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label>Your Name:</label>
          <input
            type="text"
            // value prop makes this a controlled component
            // The input always shows what's in state
            value={name}
            // onChange fires on every keystroke
            // e.target.value gets the current input value
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
          />
        </div>

        <div className="live-preview">
          <strong>Live Value:</strong> <code>{name || "(empty)"}</code>
        </div>

        <button type="submit" disabled={!name}>
          Submit
        </button>
      </form>

      <div className="info-box">
        <strong>Key Points:</strong>
        <ul>
          <li>
            Input value is controlled by state: <code>value={`{name}`}</code>
          </li>
          <li>onChange updates state on every keystroke</li>
          <li>We can validate, format, or transform input in real-time</li>
          <li>Button is disabled until name is entered</li>
        </ul>
      </div>
    </div>
  );
}

// ===========================
// LEVEL 3: MULTIPLE FIELDS (Object State Pattern)
// ===========================
// When you have multiple related fields, use an object to store all values.
// This is more efficient than creating separate state for each field.
function MultiFieldForm() {
  // Single state object holds all form fields
  // Keys match the 'name' attributes of inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });

  // Generic handler that works for ALL inputs
  const handleChange = (e) => {
    // Destructure name and value from the event target (the input)
    const { name, value } = e.target;

    // Update state using functional form to avoid stale closures
    setFormData((prevData) => ({
      // Spread operator (...) keeps all existing values
      ...prevData,
      // Computed property [name] updates only the specific field
      // e.g., if name="email", this updates formData.email
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert(`Form submitted! Check console for details.`);
  };

  return (
    <div className="demo-section">
      <h2>📝 Level 3: Multiple Input Fields</h2>
      <p className="explanation">
        Managing multiple fields efficiently using a single state object and one
        handler function.
      </p>

      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="live-preview">
        <strong>Current State:</strong>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>

      <div className="info-box">
        <strong>Magic Trick:</strong>
        <ul>
          <li>One handler for all inputs!</li>
          <li>
            <code>name</code> attribute matches object keys
          </li>
          <li>Spread operator keeps other values intact</li>
          <li>
            Computed property <code>[name]</code> updates specific field
          </li>
        </ul>
      </div>
    </div>
  );
}

// ===========================
// LEVEL 4: VALIDATION (Error Handling Pattern)
// ===========================
// This demo shows how to validate form data and display errors.
// Uses separate state for form data and errors.
function ValidatedForm() {
  // State for form values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Separate state for validation errors
  // Each key corresponds to a form field
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing (good UX practice)
    // This gives instant feedback that they're fixing the issue
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation function - returns an object with errors
  const validate = () => {
    const newErrors = {};

    // Email validation - check if empty first, then format
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // Regex pattern to check basic email format
      newErrors.email = "Email is invalid";
    }

    // Password validation - check presence and length
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password - must match the password field
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Return the errors object (empty if no errors)
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Run all validations
    const validationErrors = validate();

    // If there are any errors, set them and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop here - don't submit
    }

    alert("✅ Registration successful!");
    console.log("Valid form submitted:", formData);
  };

  return (
    <div className="demo-section">
      <h2>✅ Level 4: Form Validation</h2>
      <p className="explanation">
        Real-time error clearing with validation on submit. Try submitting with
        invalid data!
      </p>

      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min 6 characters"
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit">Register</button>
      </form>

      <div className="info-box">
        <strong>Validation Features:</strong>
        <ul>
          <li>Email format validation using regex</li>
          <li>Password minimum length check</li>
          <li>Password confirmation matching</li>
          <li>Errors clear as user types</li>
        </ul>
      </div>
    </div>
  );
}

// ===========================
// LEVEL 5: COMPLEX FORMS with Multiple Data Types
// ===========================
// This shows how to handle DIFFERENT input types in one form:
// text, email, select, radio, checkbox (single & multiple), textarea, date
function ComplexForm() {
  // State with different data types for different inputs
  const [formData, setFormData] = useState({
    name: "", // string - text input
    email: "", // string - email input
    country: "USA", // string - select dropdown (default value)
    gender: "", // string - radio button
    hobbies: [], // array - multiple checkboxes
    newsletter: false, // boolean - single checkbox
    bio: "", // string - textarea
    birthDate: "", // string - date input
  });

  // Smart handler that works for ALL input types
  const handleChange = (e) => {
    // Get all relevant properties from the input element
    const { name, value, type, checked } = e.target;

    // CHECKBOX ARRAY (multiple selection like hobbies)
    if (type === "checkbox" && name === "hobbies") {
      setFormData((prev) => ({
        ...prev,
        hobbies: checked
          ? [...prev.hobbies, value] // Add to array if checked
          : prev.hobbies.filter((h) => h !== value), // Remove if unchecked
      }));
    }
    // SINGLE CHECKBOX (boolean like newsletter subscription)
    else if (type === "checkbox") {
      // Use 'checked' property, not 'value'
      setFormData((prev) => ({ ...prev, [name]: checked }));
    }
    // ALL OTHER INPUTS (text, select, radio, textarea, date)
    else {
      // Use 'value' property
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complete Form Data:", formData);
    alert("Form submitted! Check console for all data.");
  };

  return (
    <div className="demo-section">
      <h2>🎨 Level 5: All Input Types</h2>
      <p className="explanation">
        Handling text, email, select, radio, checkboxes, textarea, and date
        inputs!
      </p>

      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
        </div>

        <div className="form-group">
          <label>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Hobbies:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="reading"
                checked={formData.hobbies.includes("reading")}
                onChange={handleChange}
              />
              Reading
            </label>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="gaming"
                checked={formData.hobbies.includes("gaming")}
                onChange={handleChange}
              />
              Gaming
            </label>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="cooking"
                checked={formData.hobbies.includes("cooking")}
                onChange={handleChange}
              />
              Cooking
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            Subscribe to newsletter
          </label>
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="live-preview">
        <strong>Current State:</strong>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}

// ===========================
// LEVEL 6: CUSTOM HOOK (Reusable Form Logic)
// ===========================
// Custom hooks let you extract and reuse stateful logic.
// This hook can be used in ANY form component!
function useForm(initialValues) {
  // State for form field values
  const [values, setValues] = useState(initialValues);

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State to track which fields user has interacted with
  // Used to show errors only after user leaves a field (better UX)
  const [touched, setTouched] = useState({});

  // Generic change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      // Use 'checked' for checkboxes, 'value' for everything else
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Blur handler - called when user leaves a field
  const handleBlur = (e) => {
    const { name } = e.target;
    // Mark this field as "touched" so we can show errors
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Reset all form state to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  // Return everything the form component needs
  return {
    values, // Current form values
    errors, // Validation errors
    touched, // Fields user has interacted with
    handleChange, // Handler for input changes
    handleBlur, // Handler for leaving a field
    setErrors, // Function to set errors from validation
    resetForm, // Function to clear the form
  };
}

// ===========================
// Using the Custom Hook in a Component
// ===========================
function CustomHookDemo() {
  // Destructure all the form logic from our custom hook
  // No need to write this logic again - it's reusable!
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setErrors,
    resetForm,
  } = useForm({
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {};
    if (!values.email) newErrors.email = "Email required";
    if (!values.password) newErrors.password = "Password required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert("✅ Login successful!");
    console.log("Login:", values);
    resetForm();
  };

  return (
    <div className="demo-section">
      <h2>🔧 Level 6: Custom Hook (Reusable Logic)</h2>
      <p className="explanation">
        A custom <code>useForm</code> hook that handles all form logic. This
        code can be reused across multiple forms!
      </p>

      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="email@example.com"
            className={touched.email && errors.email ? "error" : ""}
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            className={touched.password && errors.password ? "error" : ""}
          />
          {touched.password && errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="info-box">
        <strong>Custom Hook Benefits:</strong>
        <ul>
          <li>Reusable across multiple forms</li>
          <li>Separates logic from UI</li>
          <li>Includes touched state for better UX</li>
          <li>Built-in reset functionality</li>
        </ul>
      </div>
    </div>
  );
}

// ===========================
// LEVEL 7: DEBOUNCED SEARCH (Performance Pattern)
// ===========================
// Debouncing prevents making API calls on every keystroke.
// Instead, it waits until user stops typing for 500ms.
function SearchForm() {
  // Immediate value - updates on every keystroke
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced value - updates after user stops typing
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Mock search results
  const [results, setResults] = useState([]);

  // Effect to debounce the search term
  useEffect(() => {
    // Set a timer to update debouncedTerm after 500ms
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    // Cleanup function: if searchTerm changes before 500ms,
    // cancel the previous timer and start a new one
    return () => clearTimeout(timer);
  }, [searchTerm]); // Run this effect whenever searchTerm changes

  // Effect to perform search when debounced term changes
  useEffect(() => {
    if (debouncedTerm) {
      // This is where you'd make your API call
      // It only runs when user stops typing!

      // Simulated API call with mock data
      const mockResults = [
        `Result 1 for "${debouncedTerm}"`,
        `Result 2 for "${debouncedTerm}"`,
        `Result 3 for "${debouncedTerm}"`,
      ];
      setResults(mockResults);
      console.log("Searching for:", debouncedTerm);
    } else {
      setResults([]); // Clear results if search is empty
    }
  }, [debouncedTerm]); // Only run when debouncedTerm changes

  return (
    <div className="demo-section">
      <h2>🚀 Level 7: Debounced Search</h2>
      <p className="explanation">
        Search waits 500ms after you stop typing before triggering. This
        prevents excessive API calls!
      </p>

      <div className="demo-form">
        <div className="form-group">
          <label>Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
          />
        </div>

        <div className="search-info">
          <p>
            <strong>You're typing:</strong> {searchTerm || "(nothing)"}
          </p>
          <p>
            <strong>Debounced value:</strong> {debouncedTerm || "(waiting...)"}
          </p>
        </div>

        {results.length > 0 && (
          <div className="search-results">
            <strong>Search Results:</strong>
            <ul>
              {results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="info-box">
        <strong>How Debouncing Works:</strong>
        <ul>
          <li>User types → searchTerm updates immediately</li>
          <li>Timer starts for 500ms</li>
          <li>If user types again → timer resets</li>
          <li>When user stops → debouncedTerm updates</li>
          <li>API call only happens on debouncedTerm change</li>
        </ul>
      </div>
    </div>
  );
}

// ===========================
// LEVEL 7: FILE UPLOAD (Working with Files)
// ===========================
// Shows how to handle file uploads and create image previews.
function FileUploadForm() {
  // State to store the selected file object
  const [selectedFile, setSelectedFile] = useState(null);

  // State to store the image preview URL
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    // Files are in an array-like object, get the first one
    const file = e.target.files[0];
    setSelectedFile(file);

    // Create preview only for images
    if (file && file.type.startsWith("image/")) {
      // FileReader API - reads files and converts to data URL
      const reader = new FileReader();

      // This callback runs when file is fully read
      reader.onloadend = () => {
        setPreview(reader.result); // Base64 string we can use in <img>
      };

      // Start reading the file
      reader.readAsDataURL(file);
    } else {
      setPreview(""); // Clear preview if not an image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    console.log("Uploading:", selectedFile);
    alert(`File "${selectedFile.name}" ready to upload!`);
  };

  return (
    <div className="demo-section">
      <h2>📁 Level 7: File Upload with Preview</h2>
      <p className="explanation">
        Upload images and see a preview before submitting!
      </p>

      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label>Choose Image:</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>

        {selectedFile && (
          <div className="file-info">
            <p>
              <strong>File:</strong> {selectedFile.name}
            </p>
            <p>
              <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
            <p>
              <strong>Type:</strong> {selectedFile.type}
            </p>
          </div>
        )}

        {preview && (
          <div className="image-preview">
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: "300px", borderRadius: "8px" }}
            />
          </div>
        )}

        <button type="submit" disabled={!selectedFile}>
          Upload
        </button>
      </form>

      <div className="info-box">
        <strong>File Upload Steps:</strong>
        <ul>
          <li>
            Use <code>type="file"</code> input
          </li>
          <li>
            Access file via <code>e.target.files[0]</code>
          </li>
          <li>Use FileReader for preview</li>
          <li>Use FormData for actual upload to server</li>
        </ul>
      </div>
    </div>
  );
}

// ===========================
// LEVEL 7: MULTI-STEP FORM (Wizard Pattern)
// ===========================
// Break long forms into multiple steps for better UX.
// All data stored in one state object, but UI shows one step at a time.
function MultiStepForm() {
  // Track which step the user is on (1, 2, or 3)
  const [step, setStep] = useState(1);

  // All form data in one object (data persists across steps)
  const [formData, setFormData] = useState({
    // Step 1 fields
    firstName: "",
    lastName: "",
    // Step 2 fields
    email: "",
    phone: "",
    // Step 3 fields
    address: "",
    city: "",
  });

  // Same change handler works for all steps
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Navigation functions
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final submission:", formData);
    alert("✅ Registration complete! Check console for data.");
  };

  return (
    <div className="demo-section">
      <h2>📊 Level 7: Multi-Step Form</h2>
      <p className="explanation">Break long forms into steps for better UX!</p>

      <div className="step-indicator">
        <div className={step >= 1 ? "step active" : "step"}>1. Personal</div>
        <div className={step >= 2 ? "step active" : "step"}>2. Contact</div>
        <div className={step >= 3 ? "step active" : "step"}>3. Address</div>
      </div>

      <form onSubmit={handleSubmit} className="demo-form">
        {step === 1 && (
          <div>
            <h3>Step 1: Personal Information</h3>
            <div className="form-group">
              <label>First Name:</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
            <button type="button" onClick={nextStep}>
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Step 2: Contact Information</h3>
            <div className="form-group">
              <label>Email:</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={prevStep}>
                ← Back
              </button>
              <button type="button" onClick={nextStep}>
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Step 3: Address</h3>
            <div className="form-group">
              <label>Address:</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={prevStep}>
                ← Back
              </button>
              <button type="submit">Submit ✓</button>
            </div>
          </div>
        )}
      </form>

      <div className="live-preview">
        <strong>Form Progress:</strong>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}

// ===========================
// LEVEL 7: DYNAMIC FIELDS (Dynamic Arrays)
// ===========================
// Allows users to add/remove fields dynamically.
// Useful for: lists of items, skills, phone numbers, etc.
function DynamicForm() {
  // Array of field objects, each with unique id and value
  const [fields, setFields] = useState([{ id: 1, value: "" }]);

  // Add a new field to the array
  const addField = () => {
    // Use Date.now() for unique id (timestamp in milliseconds)
    setFields([...fields, { id: Date.now(), value: "" }]);
  };

  // Remove a field by filtering it out
  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Update a specific field's value
  const handleChange = (id, value) => {
    // Map through fields, update only the one matching the id
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("All fields:", fields);
    alert("Form submitted! Check console.");
  };

  return (
    <div className="demo-section">
      <h2>➕ Level 7: Dynamic Form Fields</h2>
      <p className="explanation">
        Add or remove fields dynamically. Perfect for lists, skills, or multiple
        items!
      </p>

      <form onSubmit={handleSubmit} className="demo-form">
        {/* Loop through all fields and render an input for each */}
        {fields.map((field, index) => (
          // key={field.id} is crucial for React to track each field
          <div key={field.id} className="dynamic-field">
            <div className="form-group">
              <label>Item {index + 1}:</label>
              <input
                value={field.value}
                // Call handleChange with this specific field's id
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={`Enter item ${index + 1}`}
              />
            </div>
            {/* Show remove button only if there's more than 1 field */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="remove-btn"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addField} className="add-btn">
          + Add Field
        </button>
        <button type="submit">Submit All</button>
      </form>

      <div className="live-preview">
        <strong>Current Fields:</strong>
        <pre>{JSON.stringify(fields, null, 2)}</pre>
      </div>

      <div className="info-box">
        <strong>Key Concepts:</strong>
        <ul>
          <li>Array of objects to store multiple fields</li>
          <li>
            Unique <code>id</code> for each field (using Date.now())
          </li>
          <li>Map over array to render inputs</li>
          <li>Filter to remove, map to update</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
