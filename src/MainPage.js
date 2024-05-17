import React, { useState } from 'react';
import bg from './assets/bg.png';
import { MdNotifications } from 'react-icons/md';
import NotificationCard from './components/Notifications';
import ReferenceCard from './components/ReferenceCard';
import Detection from './components/detectionTest'; // Import the Detection component
import ShelfCamera from './components/ShelfStream';
import RoboflowDetection from './components/Roboflow';

const MainPage = () => {
    const today = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, dateOptions);

    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="min-h-screen relative">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-primary text-white z-50 transition-transform duration-300 ease-in-out transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex justify-end">
                    <button onClick={() => setShowSidebar(false)}>
                        <MdNotifications size={24} className="text-white" />
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-bold">Notifications</h2>
                    {/* Add sidebar content here */}
                </div>
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col">
                {/* Header */}
                <div className="bg-white rounded-b-lg rounded-t-none py-2 px-4 mb-8 flex justify-between items-center">
                    <button onClick={() => setShowSidebar(!showSidebar)}>
                        <MdNotifications size={24} className="text-primary" />
                    </button>
                    <h2 className="text-lg font-bold text-primary">Dashboard</h2>
                    <div className="flex items-center">
                        {/* Date */}
                        <p className="text-primary">{formattedDate}</p>
                    </div>
                </div>
                
                {/* Main Content */}
                <div className="flex justify-center mx-2  my-4 sm:my-8">
                    <Detection />
                    <div className="flex flex-col sm:flex-row">
                       
                        <ReferenceCard />
                     </div> 
                </div>
            </div>
            
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src={bg} alt="Background" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}

export default MainPage;
