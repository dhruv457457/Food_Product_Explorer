import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

function BarcodeScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const codeReader = useRef(null);

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();
  
    codeReader.current
      .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          onDetected(result.getText());
          onClose();
        }
      })
      .catch((err) => console.error("Camera error:", err));
  
    // Clean up the camera stream manually
    return () => {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [onDetected, onClose]);
  
  

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    try {
      const result = await codeReader.current.decodeFromImageUrl(imageUrl);
      if (result) {
        onDetected(result.getText());
        onClose();
      }
    } catch (err) {
      console.error("Image decode error:", err);
      alert("Could not detect barcode from image.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Scan Barcode</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <video ref={videoRef} className="w-full h-64 mb-2" />

        <div className="flex justify-between items-center mt-2">
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-indigo-600 hover:underline text-sm"
          >
            📷 Upload from Gallery
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default BarcodeScanner;
