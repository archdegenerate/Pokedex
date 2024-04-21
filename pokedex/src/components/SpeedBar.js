import React from 'react';

const SpeedBar = ({ currentSpeed, maxSpeed }) => {
    const speedPercentage = (currentSpeed / maxSpeed) * 100;

    return (
        <div className="spd-bar-container" style={{ width: '200px', height: '20px', backgroundColor: '#ddd' }}>
        <div className="spd-bar" style={{ width: `${speedPercentage}%`, height: '100%', backgroundColor: 'lightblue' }}>
        </div>
        </div>
    );
};

export default SpeedBar;