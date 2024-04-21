import React from 'react';

const DefenseBar = ({ currentDef, maxDef }) => {
    const defPercentage = (currentDef / maxDef) * 100;

    return (
        <div className="def-bar-container" style={{ width: '200px', height: '20px', backgroundColor: '#ddd' }}>
        <div className="def-bar" style={{ width: `${defPercentage}%`, height: '100%', backgroundColor: 'darkgray' }}>
        </div>
        </div>
    );
};

export default DefenseBar;