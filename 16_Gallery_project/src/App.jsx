// Import necessary hooks from React and axios for API calls
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
// Import our custom components
import ImageCard from "./components/ImageCard";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  // State to store the images fetched from API
  const [userData, setUserData] = useState([]);
  // State to track current page number for pagination
  const [index, setIndex] = useState(1);
  // State to track loading status
  const [loading, setLoading] = useState(false);

  // Async function to fetch image data from API
  const getData = useCallback(async () => {  // useCallback to memoize function, preventing unnecessary re-creations, especially useful for useEffect dependencies  
    try {
      setLoading(true); // Show loading spinner
      // Make API call with current page number
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=20`,
      );
      // Update state with fetched data
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  }, [index]);

  // useEffect runs getData whenever 'index' changes (page navigation)
  useEffect(
    function () {
      getData();
    },
    [getData],
  );

  // Display message if no data, otherwise map through data to create image cards
  let printUserData = "No images available";
  if (userData.length > 0) {
    printUserData = userData.map(function (elem) {
      // Each mapped element must have a unique 'key' prop (important for React performance)
      // Using ImageCard component instead of inline JSX
      return <ImageCard key={elem.id} image={elem} />;
    });
  }

  return (
    <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-600">
          Photo Gallery
        </h1>
        <p className="text-gray-400 mt-2">Page {index}</p>
      </header>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 pb-24">
        {/* Show loading spinner while fetching data */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {printUserData}
          </div>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        {/* Previous Button - onClick needs arrow function to execute code */}
        <button
          className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          onClick={() => {
            // Only go to previous page if not on page 1
            if (index > 1) {
              setIndex(index - 1);
            }
          }}
          disabled={index === 1 || loading} // Disable button on first page or while loading
        >
          ← Previous
        </button>

        {/* Next Button */}
        <button
          className="bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          onClick={() => {
            // Go to next page
            setIndex(index + 1);
          }}
          disabled={loading} // Disable while loading
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default App;
