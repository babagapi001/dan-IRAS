import React, { useEffect, useRef, useState } from 'react';

const RoboflowDetectionTest = () => {
  const videoRef = useRef(null);
  const modelRef = useRef(null);
  const canvasRef = useRef(null);
  const [analysis, setAnalysis] = useState({ reduced: 0, empty: 0 });

  useEffect(() => {
    const setupWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    setupWebcam();

    const initializeRoboflow = async () => {
      if (window.roboflow) {
        try {
          const model = await window.roboflow
            .auth({
              publishable_key: 'rf_jRHjLz1MZPaq37KsZgldA8zfSbw1',
            })
            .load({
              model: 'out-of-stock-tnjj1',
              version: '11',
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
          predictions.forEach(prediction => {
            console.log('Class detected:', prediction.class);
          });
          renderPredictions(predictions);
          analyzePredictions(predictions);
          requestAnimationFrame(detect);
        }
      };
    
      detect();
    };
    

    initializeRoboflow();
  }, []);

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

  const renderPredictions = (predictions) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = getVideoDimensions(video);

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    predictions.forEach((prediction) => {
      const { x, y, width: bboxWidth, height: bboxHeight } = prediction.bbox;
      const color = prediction.color || 'red';
      const label = `${prediction.class} (${(prediction.confidence * 100).toFixed(1)}%)`;

      const xPos = (x - bboxWidth / 2) * (canvas.width / video.videoWidth);
      const yPos = (y - bboxHeight / 2) * (canvas.height / video.videoHeight);
      const adjBboxWidth = bboxWidth * (canvas.width / video.videoWidth);
      const adjBboxHeight = bboxHeight * (canvas.height / video.videoHeight);

      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.strokeRect(xPos, yPos, adjBboxWidth, adjBboxHeight);

      const textWidth = ctx.measureText(label).width;
      ctx.fillStyle = color;
      ctx.fillRect(xPos, yPos, textWidth + 8, 20);

      ctx.fillStyle = '#000000';
      ctx.font = '16px sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText(label, xPos + 4, yPos + 2);
    });
  };

  const analyzePredictions = async (predictions) => {
    const counts = { reduced: 0, empty: 0 };
    predictions.forEach((prediction) => {
      if (prediction.class === 'Reduced') {
        counts.reduced += 1;
      } else if (prediction.class === 'Empty-Space') {
        counts.empty += 1;
      }
    });
    console.log('Analysis counts:', counts); // Debug log
    setAnalysis(counts);

  };
  
  
 

  return (
    <div style={{ display: 'flex', width: '75%', height: 'auto', backgroundColor: '#f0f0f0', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ flex: 1, position: 'relative', backgroundColor: '#000' }}>
        <h1 style={{ textAlign: 'center', color: '#fff' }}>Shelf 1/ Camera 1</h1>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: '100%', height: 'auto' }}
          onLoadedMetadata={() => {
            const video = videoRef.current;
            const { width, height } = getVideoDimensions(video);
            canvasRef.current.width = width;
            canvasRef.current.height = height;
          }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        />
      </div>
      <div style={{ flex: 1, padding: '20px', color: '#000' }}>
        <h1 className="text-lg font-bold text-gray-600">Analysis</h1>
        <p>Reduced: {analysis.reduced}</p>
        <p>Empty: {analysis.empty}</p>
        
      </div>
    </div>
  );
};

export default RoboflowDetectionTest;
