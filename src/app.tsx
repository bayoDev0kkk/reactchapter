import React, { useState } from 'react';
import Countdown from './components/Countdown/Countdown'; 
import Timer from './components/Timer/Timer';
import SwitchButton from './components/SwitchButton/SwitchButton';

function App() {
    const [isTimer, setIsTimer] = useState(true);

    const toggleView = () => {
        setIsTimer(prev => !prev);
    };

    return (
        <>
            {isTimer ? <Timer /> : <Countdown />}
            <SwitchButton toggleView={toggleView} />
        </>
    );
}

export default App;
