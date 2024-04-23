import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HealthBar from './HealthBar';
import AttackBar from './AttackBar';
import DefenseBar from './DefenseBar';
import SpeedBar from './SpeedBar';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const getTypeColorName = (typeName) => 'type-'+typeName;


    useEffect(() => {
        const fetchPokemonData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!response.ok) throw new Error('Failed to fetch Pokémon data');
                
                const data = await response.json();
                const speciesResponse = await fetch(data.species.url);
                if (!speciesResponse.ok) throw new Error('Failed to fetch species data');
                
                const speciesData = await speciesResponse.json();
                const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
                if (!evolutionChainResponse.ok) throw new Error('Failed to fetch evolution chain');
                
                const evolutionData = await evolutionChainResponse.json();
                const evolutionChain = await processEvolutionChain(evolutionData.chain);
                
                setPokemonData({ ...data, evolutionChain });
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
                setLoading(false);
            }
        };
    
        fetchPokemonData();
    }, [id]);

    const processEvolutionChain = async (chain) => {
        const evolutionChain = [];
        let currentStage = chain;
    
        while (currentStage) {
            const speciesResponse = await fetch(currentStage.species.url);
            const speciesData = await speciesResponse.json();
            const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}`);
            const pokemonData = await pokemonResponse.json();
    
            evolutionChain.push({
                speciesName: currentStage.species.name,
                speciesId: speciesData.id,
                spriteUrl: pokemonData.sprites.front_default
            });
    
            currentStage = currentStage.evolves_to.length > 0 ? currentStage.evolves_to[0] : null;
        }
    
        return evolutionChain;
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!pokemonData) return <div>No data available.</div>;

    const spriteUrl = pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default || 
                        pokemonData.sprites.front_default;
    return (
        <>
        <Navbar sticky="top"/>
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
        
        <div className="pokemon-abilities-container">
        <div className="pokemon-abilities-header">
        <h3>Abilities:</h3>
        </div>
        <ul className="pokemon-list-abilities">
        {pokemonData.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
        ))}
        </ul>
        </div>
        
        <div className="pokemon-list-stats">
        <h3>Stats:</h3>
        <p>HP: {pokemonData.stats[0].base_stat}</p>
        <HealthBar currentHp={pokemonData.stats[0].base_stat} maxHp={340} />
        <p>Attack: {pokemonData.stats[1].base_stat}</p>
        <AttackBar currentAttack={pokemonData.stats[1].base_stat} maxAttack={160} />
        <p>Defense: {pokemonData.stats[2].base_stat}</p>
        <DefenseBar currentDef={pokemonData.stats[2].base_stat} maxDef={230} />
        <p>Special Attack: {pokemonData.stats[3].base_stat}</p>
        <AttackBar currentAttack={pokemonData.stats[3].base_stat} maxAttack={471} />
        <p>Special Defense: {pokemonData.stats[4].base_stat}</p>
        <DefenseBar currentDef={pokemonData.stats[4].base_stat} maxDef={615} />
        <p>Speed: {pokemonData.stats[5].base_stat}</p>
        <SpeedBar currentSpeed={pokemonData.stats[5].base_stat} maxSpeed={200} />
        </div>
        <h3>Moves:</h3>
        <ul className="pokemon-list-moves">
        {pokemonData.moves.slice(0, 5).map((move, index) => (
            <li key={index}>{move.move.name}</li>
        ))}
        </ul>
        </div>
        <div className="pokemon-other">
            <h2>Other information:</h2>
            <div className="pokemon-sprites">
            <h3>Sprite</h3>
            <img src={spriteUrl} alt={pokemonData.name} />
            </div>
        </div>
        <div className="pokemon-evolution-chain">
            <h3>Evolution Chain:</h3>
            <ul className="pokemon-evolution-chain-sprites">
                {pokemonData.evolutionChain.map((evolution, index) => (
                    <li key={index}>
                        <img src={evolution.spriteUrl} alt={evolution.speciesName} />
                        <break></break>
                        <p>{evolution.speciesName}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    </>
    );
};

export default PokemonDetails;