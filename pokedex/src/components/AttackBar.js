import React from 'react';

const AttackBar = ({ currentAttack, maxAttack }) => {
    const attackPercentage = (currentAttack / maxAttack) * 100;

    return (
        <div className="atk-bar-container" style={{ width: '200px', height: '20px', backgroundColor: '#ddd' }}>
        <div className="atk-bar" style={{ width: `${attackPercentage}%`, height: '100%', backgroundColor: 'red' }}>
        </div>
        </div>
    );
};

export default AttackBar;