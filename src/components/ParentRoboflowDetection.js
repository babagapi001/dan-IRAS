import React, { useRef, useState } from 'react';
import RoboflowDetection from './RoboflowDetection'; // Import the RoboflowDetection component

const CaptureAndDownload = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const captureStream = () => {
    if (!canvasRef.current || !videoRef.current) {
      console.error("Canvas or Video element not found");
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png'); // Convert to data URL
    setCapturedImage(imageData); // Store the captured image
  };

  const downloadImage = () => {
    if (!capturedImage) {
      console.error("No captured image to download");
      return;
    }

    const link = document.createElement('a');
    link.href = capturedImage; // Set the captured image data URL
    link.download = 'captured_image.png'; // Set the download filename
    link.click(); // Trigger the download
  };

  return (
    <div>
      {/* Use RoboflowDetection and pass the videoRef */}
      <RoboflowDetection videoRef={videoRef} />
      
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ display: 'none' }} // Hide canvas, used only for capturing
      />

      <button onClick={captureStream}>Capture Stream</button> {/* Capture button */}
      
      {/* Display the captured image and a download button */}
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" style={{ width: '100%' }} />
          <button onClick={downloadImage}>Download Image</button>
        </div>
      )}
    </div>
  );
};

export default CaptureAndDownload;
