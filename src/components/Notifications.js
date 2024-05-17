import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { FaCircle } from 'react-icons/fa';

const NotificationCard = () => {
    return (
        <div className="bg-white ml-16 rounded-xl mb-4 h-72 w-64 p-4">
            <div className="flex items-center">
                <p className="m-0 font-bold text-gray-700 text-md">Notification</p>
                <IoIosArrowForward className="ml-20 mt-2" />
            </div>
            <div className='ml-2'>
                <div className='pt-4 flex items-center'>
                    <FaCircle style={{ fontSize: '12px', color: 'red' }} />
                    <div className="flex flex-col">
                        <p className='pl-4'>2 Empty Spaces Detected</p>
                        <p className='pl-4 font-light text-sm'>4/12/24 3:00 pm</p>
                    </div>
                </div>
                <div className='pt-4 flex items-center'>
                    <FaCircle style={{ fontSize: '12px', color: 'green' }} />
                    <div className="flex flex-col">
                        <p className='pl-4'>3 Reduced Area</p>
                        <p className='pl-4 font-light text-sm'>4/12/24 3:00 pm</p>
                    </div>
                </div>
                <div className='pt-4 flex items-center'>
                    <FaCircle style={{ fontSize: '12px', color: 'green' }} />
                    <div className="flex flex-col">
                        <p className='pl-4'>2 Empty Spaces Detected</p>
                        <p className='pl-4 font-light text-sm'>4/12/24 3:00 pm</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;
