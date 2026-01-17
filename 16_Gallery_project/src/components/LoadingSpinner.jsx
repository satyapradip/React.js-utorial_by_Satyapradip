/**
 * LoadingSpinner Component
 *
 * Displays a loading animation while data is being fetched
 * This improves user experience by showing that something is happening
 */

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        {/* Animated spinning circles */}
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="text-gray-400 mt-4 text-center">Loading images...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
