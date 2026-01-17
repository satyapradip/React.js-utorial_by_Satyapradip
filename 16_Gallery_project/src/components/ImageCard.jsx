/**
 * ImageCard Component
 *
 * This is a reusable component that displays a single image card
 * Props (data passed from parent component):
 * - image: object containing image data (id, download_url, author)
 */

const ImageCard = ({ image }) => {
  return (
    // Anchor tag to open original image in new tab
    // href points to the original image URL from API
    // target="_blank" opens link in new tab
    // rel="noopener noreferrer" is for security (prevents tab hijacking)
    <a
      href={image.download_url}
      target="_blank"
      rel="noopener noreferrer" 
      className="block"
    >
      <div className="h-60 w-72 overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
        {/* Image Section */}
        <img
          className="h-48 w-full object-cover"
          src={image.download_url}
          alt={`Photo by ${image.author}`}
          loading="lazy" // Lazy loading for better performance
        />

        {/* Author Info Section */}
        <div className="p-3 text-center bg-linear-to-r from-gray-50 to-gray-100">
          <h2 className="text-gray-800 font-semibold text-sm truncate">
            📸 {image.author}
          </h2>
        </div>
      </div>
    </a>
  );
};

export default ImageCard;
