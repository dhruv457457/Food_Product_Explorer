import { useState } from "react";
import { X } from "lucide-react";

function ProductImage({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const imageSrc = src || "https://via.placeholder.com/400x400?text=No+Image";

  return (
    <>
      {/* Main Image Block */}
      <div
        onClick={() => setIsZoomed(true)}
        className="group relative cursor-zoom-in bg-gray-50 border rounded-xl p-4 flex items-center justify-center overflow-hidden"
      >
        <img
          src={imageSrc}
          alt={alt}
          className="object-contain h-[300px] w-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Fullscreen Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl">
            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-3 right-3 text-white hover:text-red-400 transition"
              aria-label="Close zoom"
            >
              <X size={28} />
            </button>

            {/* Zoomed Image */}
            <img
              src={imageSrc}
              alt={alt}
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductImage;
