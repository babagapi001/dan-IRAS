import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns'; // Optional, for formatting the date

const VideoCaptureComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Function to capture the current frame and store it
  const captureAndDownloadFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Capture frame from the video

    const capturedFrame = canvas.toDataURL('image/png'); // Convert to Base64
    setCapturedImage(capturedFrame); // Store the captured image
  };

  useEffect(() => {
    const setupWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play(); // Start playing video stream
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    setupWebcam(); // Initialize webcam stream on mount
  }, []);

  const captureDate = new Date(); // Date when the frame is captured
  const formattedDate = format(captureDate, 'yyyy-MM-dd'); // Format the date for display

  return (
    <div>
      <div style={{ position: 'relative' }}>
        {/* Live Video Stream */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: '100%', height: 'auto' }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </div>

      {/* Button to capture the frame */}
      <button
        onClick={captureAndDownloadFrame}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
      >
        Capture and Display Frame
      </button>

      {/* Display the captured image with overlay */}
      {capturedImage && (
        <div style={{ position: 'relative', marginTop: '10px' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              background: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
              color: 'white',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <h3>Reference Image - {formattedDate}</h3> {/* Text with the date */}
          </div>
          <img src={capturedImage} alt="Captured Frame" style={{ width: '100%' }} /> {/* Display the captured frame */}
        </div>
      )}
    </div>
  );
};

export default VideoCaptureComponent;
