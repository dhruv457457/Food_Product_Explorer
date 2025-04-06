import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function BarcodeScanner({ onDetected, onClose }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("scanner", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        onDetected(decodedText);
        scanner.clear();
        onClose();
      },
      (error) => {
        console.warn("Scanning error:", error);
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error("Failed to clear scanner:", err));
    };
  }, [onDetected, onClose]);

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
        <div id="scanner" className="w-full h-64" ref={scannerRef} />
      </div>
    </div>
  );
}

export default BarcodeScanner;
