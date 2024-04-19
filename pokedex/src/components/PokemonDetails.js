import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const getTypeColorName = (typeName) => 'type-'+typeName;

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
        if (response.ok) {
            const data = await response.json();
            setPokemonData(data);
        } else {
            throw new Error('Failed to fetch data');
        }
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    fetchData();
    }, [id]);

    if (!pokemonData) {
    return <div>Loading...</div>;
    }

    return (
        <>
        <Navbar />
        <div className="pokemon-container">
        <div className="pokemon-card">
        <h2>{pokemonData.name.toUpperCase()}</h2>
        <div className="horizontal-line"></div>

        <div className="pokemon-card-header">
        <div className="pokemon-image-container">
        <img
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        className="pokemon-image"
        />
        </div>
        <div className="pokemon-types-container">
        <h3>Types:</h3>
        <ul className="pokemon-list-types">
        {pokemonData.types.map((type, index) => (
            <li key={index} className={getTypeColorName(type.type.name)}>{type.type.name}</li>
        ))}
        </ul>
        </div>
        </div>
        
        <h3>Abilities:</h3>
        <ul className="pokemon-list-abilities">
        {pokemonData.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
        ))}
        </ul>
        
        <h3>Stats:</h3>
        <ul className="pokemon-list-stats">
        {pokemonData.stats.map((stat, index) => (
            <li key={index}>
            {stat.stat.name}: {stat.base_stat}
            </li>
        ))}
        </ul>
        <h3>Moves:</h3>
        <ul className="pokemon-list-moves">
        {pokemonData.moves.slice(0, 5).map((move, index) => (
            <li key={index}>{move.move.name}</li>
        ))}
        </ul>
        </div>
    </div>
    </>
    );
};

export default PokemonDetails;