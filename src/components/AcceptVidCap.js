import React, { useEffect, useRef } from 'react';

const RoboflowDetection = ({ videoRef }) => {
  const modelRef = useRef(null);
  const canvasRef = useRef(null);
  const confidenceThreshold = 0.3;

  useEffect(() => {
    const initializeRoboflow = async () => {
      if (window.roboflow) {
        try {
          const model = await window.roboflow
            .auth({
              publishable_key: 'rf_jRHjLz1MZPaq37KsZgldA8zfSbw1', // Ensure the key is correct
            })
            .load({
              model: 'out-of-stock-tnjj1',
              version: 6,
            });

          modelRef.current = model;
          startDetectionLoop();
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

          const filteredPredictions = predictions.filter(
            (prediction) => prediction.confidence >= confidenceThreshold
          );

          renderPredictions(filteredPredictions);

          setTimeout(detect, 1000); // Call detect every second
        }
      };

      detect(); // Start the detection loop
    };

    initializeRoboflow(); // Load the Roboflow model when component mounts
  }, [videoRef]);

  const renderPredictions = (predictions) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas

    predictions.forEach((prediction) => {
      const { x, y, width, height } = prediction.bbox;
      const color = prediction.color || 'red';
      const label = prediction.class;

      // Draw the bounding box
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.strokeRect(x - width / 2, y - height / 2, width, height);

      // Draw label background
      const textWidth = ctx.measureText(label).width;
      ctx.fillStyle = color;
      ctx.fillRect(
        x - width / 2,
        y - height / 2,
        textWidth + 8,
        20 // Label height
      );

      // Draw label text
      ctx.fillStyle = '#000000';
      ctx.font = '8px sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText(
        label,
        x - width / 2 + 4,
        y - height / 2 + 1
      );
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: '100%', height: 'auto' }} // Ensure video fills container
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default RoboflowDetection;
