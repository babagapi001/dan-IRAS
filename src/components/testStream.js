import React, { useEffect, useRef } from 'react';

const RoboflowDetectionTest = () => {
  const videoRef = useRef(null);
  const modelRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup webcam stream
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

    const initializeRoboflow = async () => {
      if (window.roboflow) {
        try {
          const model = await window.roboflow
            .auth({
              publishable_key: 'rf_jRHjLz1MZPaq37KsZgldA8zfSbw1',
            })
            .load({
              model: 'out-of-stock-tnjj1',
              version: '9',
            });

          modelRef.current = model; // Store the loaded model

          startDetectionLoop(); // Start the detection loop if model is loaded
        } catch (error) {
          console.error('Error loading Roboflow model:', error);
        }
      }
    };

    const startDetectionLoop = () => {
      const model = modelRef.current;
      if (!model) return;

      const detect = async () => {
        if (model && videoRef.current) {
          const predictions = await model.detect(videoRef.current);

          // Log predictions to console
          console.log('Predictions:', predictions);

          renderPredictions(predictions); // Render predictions
          requestAnimationFrame(detect); // Continuously detect
        }
      };

      detect(); // Start the detection loop
    };

    initializeRoboflow(); // Load the Roboflow model
  }, []); // Run only once on mount

  const getVideoDimensions = (video) => {
    const videoRatio = video.videoWidth / video.videoHeight;
    const elementWidth = video.offsetWidth;
    const elementHeight = video.offsetHeight;
    const elementRatio = elementWidth / elementHeight;

    if (elementRatio > videoRatio) {
      return { width: elementHeight * videoRatio, height: elementHeight };
    } else {
      return { width: elementWidth, height: elementWidth / videoRatio };
    }
  };

    // Function to render prediction boxes and labels
    const renderPredictions = (predictions) => {
      const canvas = canvasRef.current;
      if (!canvas || !videoRef.current) return;
    
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
    
      const { width, height } = getVideoDimensions(videoRef.current); // Adjust canvas
    
      canvas.width = width;
      canvas.height = height;
    
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      predictions.forEach((prediction) => {
        const { x, y, width, height } = prediction.bbox;
        const color = prediction.color || 'red';
        const label = `${prediction.class} (${(prediction.confidence * 100).toFixed(1)}%)`;
    
        const xPos = x - width / 2;
        const yPos = y - height / 2;
    
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.strokeRect(xPos, yPos, width, height); // Bounding box
    
        const textWidth = ctx.measureText(label).width;
        ctx.fillStyle = color;
        ctx.fillRect(xPos, yPos, textWidth + 8, 20); // Label background
    
        ctx.fillStyle = '#000000';
        ctx.font = '16px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText(label, xPos + 4, yPos + 2); // Label with confidence
      });
    };

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: '100%', height: 'auto' }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />
    </div>
  );
};

export default RoboflowDetectionTest;
