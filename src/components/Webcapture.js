import React, { useEffect, useRef, useState } from 'react';

const RoboflowDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null); // State to hold the captured frame

  useEffect(() => {
    const setupWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play(); // Start playing the video stream
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    setupWebcam(); // Initialize webcam stream on mount
  }, []); // Runs only once when the component is mounted

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !video) return; // Ensure the video and canvas are available

    const ctx = canvas.getContext('2d');
    // Draw the current video frame onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a Base64 data URL
    const capturedFrame = canvas.toDataURL('image/png');
    setCapturedImage(capturedFrame); // Store the captured frame
  };

  return (
    <div style={{ position: 'relative' }}>
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
      <button onClick={captureFrame}>Capture Frame</button> {/* Button to capture the frame */}
      
      {capturedImage && ( // Display the captured frame as an image if it exists
        <div>
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured Frame" style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default RoboflowDetection;
