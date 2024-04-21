import React from 'react';

const PokemonHpBar = ({ currentHp, maxHp }) => {
    const hpPercentage = (currentHp / maxHp) * 100;

    return (
        <div className="hp-bar-container" style={{ width: '200px', height: '20px', backgroundColor: '#ddd' }}>
        <div className="hp-bar" style={{ width: `${hpPercentage}%`, height: '100%', backgroundColor: 'green' }}>
        </div>
        </div>
    );
};

export default PokemonHpBar;
