// Importing useState hook from React
// useState allows us to add state (data that can change) to our component
import { useState } from "react";

// Main App component - this is a functional component
const App = () => {
  // STATE MANAGEMENT
  // useState creates a state variable and a function to update it
  // [currentValue, functionToUpdateValue] = useState(initialValue)

  // State to store the note title (heading) that user types
  const [title, setTitle] = useState("");

  // State to store the note details (description) that user types
  const [details, setDetails] = useState("");

  // State to store all notes as an array of objects
  // Each note will have a title and details
  const [notes, setNotes] = useState([]);

  // SUBMIT HANDLER FUNCTION
  // This function runs when user clicks "Add Note" button
  const submitHandler = (e) => {
    // Prevent default form submission (which would refresh the page)
    e.preventDefault();

    // Create a copy of the current notes array using spread operator (...)
    // We never modify state directly in React - always create a copy first
    const copyNotes = [...notes];

    // Add new note object to the copied array
    // This creates an object with title and details properties
    copyNotes.push({ title, details });

    // Update the state with the new array (this triggers re-render)
    setNotes(copyNotes);

    // Clear the input fields after adding note
    // This resets the form for the next note
    setTitle("");
    setDetails("");
  };

  // DELETE HANDLER FUNCTION
  // This function removes a note at a specific index
  const deleteNote = (idx) => {
    // Create a copy of notes array
    const copyNotes = [...notes];

    // Remove 1 item at the specified index using splice
    // splice(startIndex, howManyToDelete)
    copyNotes.splice(idx, 1);

    // Update state with the modified array
    setNotes(copyNotes);
  };

  // JSX RETURN - This is what gets displayed on screen
  // JSX looks like HTML but it's actually JavaScript
  return (
    <div className="h-screen lg:flex bg-black text-white">
      {/* LEFT SIDE - FORM TO ADD NOTES */}
      {/* onSubmit runs when form is submitted (Enter key or button click) */}
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex gap-4 lg:w-1/2 p-10 flex-col items-start"
      >
        <h1 className="text-4xl mb-2 font-bold">Add Notes</h1>

        {/* INPUT FOR NOTE TITLE */}
        {/* value={title} makes this a controlled component - React controls the value */}
        {/* onChange runs every time user types something */}
        <input
          type="text"
          placeholder="Enter Notes Heading"
          className="px-5 w-full font-medium py-2 border-2 outline-none rounded "
          value={title}
          onChange={(e) => {
            // e.target.value gives us what user typed
            // We update the state with this new value
            setTitle(e.target.value);
          }}
        />

        {/* TEXTAREA FOR NOTE DETAILS */}
        {/* Same concept as input above - controlled component */}
        <textarea
          type="text"
          className="px-5 w-full font-medium h-32 py-2 flex items-start flex-row border-2 outline-none  rounded "
          placeholder="Write Details here"
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        />

        {/* SUBMIT BUTTON */}
        {/* Clicking this triggers form's onSubmit event */}
        <button className="bg-white active:scale-95 font-medium w-full outline-none  text-black px-5 py-2 rounded">
          Add Note
        </button>
      </form>

      {/* RIGHT SIDE - DISPLAY ALL NOTES */}
      <div className="lg:w-1/2 lg:border-l-2  p-10">
        <h1 className="text-4xl font-bold">Recent Notes</h1>
        <div className="flex flex-wrap items-start justify-start gap-5 mt-6 h-[90%] overflow-auto">
          {/* MAP THROUGH NOTES ARRAY */}
          {/* .map() creates a new component for each note in the array */}
          {/* elem = current note object, idx = its position in array (0, 1, 2...) */}
          {notes.map(function (elem, idx) {
            // Return JSX for each individual note card
            // key={idx} helps React identify which items changed (required for lists)
            return (
              <div
                key={idx}
                className=" flex justify-between flex-col items-start relative h-52 w-40 bg-cover rounded-xl text-black pt-9 pb-4 px-4 bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')]"
              >
                {/* NOTE CONTENT */}
                <div>
                  {/* elem.title accesses the title property of current note */}
                  <h3 className="leading-tight text-lg font-bold">
                    {elem.title}
                  </h3>
                  {/* elem.details accesses the details property of current note */}
                  <p className="mt-2 leading-tight text-xs font-semibold text-gray-600">
                    {elem.details}
                  </p>
                </div>

                {/* DELETE BUTTON */}
                {/* onClick runs deleteNote function when clicked */}
                {/* Arrow function () => passes the index to deleteNote */}
                <button
                  onClick={() => {
                    deleteNote(idx);
                  }}
                  className="w-full cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Export so other files can import and use this component
export default App;
