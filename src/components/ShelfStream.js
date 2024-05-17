import React from 'react';
import Detection from './detectionTest'; // Import the Detection component

const ShelfCamera = ({ title, description, status, percentage, reducedArea}) => {

    return (
        <>
            <h1 className="font-bold text-gray-700 text-2xl">{title}</h1>
            <p className="pb-4 font-thin text-gray-700 text-base">{description}</p>
            <div className='flex'>
                <div className=' w-1/2'>
                    < Detection /> {/* Add the Detection component */}
                </div>
                <div className='ml-4'>
                    <p className="m-0 font-bold text-gray-700 text-xl">Analysis</p>
                    <p className="m-0 text-gray-700">Status: {status}</p>
                    <p className="m-0 text-gray-700">Percentage: {percentage}</p>
                    <p className="m-0 text-gray-700">Reduced Area: {reducedArea}</p>
                </div>
            
                  
             </div>
        </>
    );
}

export default ShelfCamera;
