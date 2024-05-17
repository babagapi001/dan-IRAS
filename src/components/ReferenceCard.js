import React, { useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const ReferenceImage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleButtonClick = () => {
      const iframe = document.getElementById('iframe1');
      iframe.contentWindow.postMessage('triggerButton2Click', '*');
    };

    const button = document.getElementById('button1');
    button.addEventListener('click', handleButtonClick);

    // Cleanup the event listener on component unmount
    return () => {
      button.removeEventListener('click', handleButtonClick);
    };
  }, []);

  const handleClick = () => {
    navigate('/reference'); // Navigate to the '/reference' route
  };

  return (
    <div className="flex-1  p-4 ml-4  bg-gray-200 rounded-md">
      <h1 className="text-lg font-bold text-gray-600">Reference Image</h1>
      <div className="flex space-x-4 mt-4">
        <button
          id="button1"
          className="flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-200 ease-in-out"
        >
          Capture
        </button>
        <button
          type='button'
          onClick={handleClick}
          className="flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-200 ease-in-out"
        >
          Compare
        </button>
      </div>
      <iframe id="iframe1" allow="camera" src="http://localhost/testcap/capture.php"
        style={{
          minWidth: '620px',
          minHeight: '500px',
          margin: '20px',
          borderRadius: '8px',
          maxWidth: '620px',
          maxHeight: '500px'
        }}></iframe>

    </div>
  );
};

export default ReferenceImage;
