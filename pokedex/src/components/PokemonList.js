import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../App.css';

function PokemonList() {
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const LIMIT = 9;
    const getTypeColorName = (typeName) => 'pokemon-type-'+typeName;


    useEffect(() => {
        const fetchData = async (offset, LIMIT) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${LIMIT}`);
            const data = await response.json();
            setTotalPages(Math.ceil(data.count / LIMIT));

            const pokemonDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                const pokemonResponse = await fetch(pokemon.url);
                return pokemonResponse.json();
                })
            );
    
            setPokemonData(pokemonDetails);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };
    
        fetchData((currentPage - 1) * LIMIT, LIMIT);
        }, [currentPage, LIMIT]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="pokemon-list-container">
            {pokemonData
                    .filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery))
                    .map((pokemon) => (
                    <Link
                        to={'/pokemon/' + pokemon.id} 
                        key={pokemon.id}
                        className="pokemon-item"
                        id={pokemon.types && pokemon.types.length > 0 ? getTypeColorName(pokemon.types[0].type.name) : 'pokemon-type-default'}
                    >
                <div className="pokemon-item">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <div className="pokemon-details">
                    <h2>{pokemon.name}</h2>
                    <p>ID: {pokemon.id}</p> 
                </div>
                </div>
            </Link>
            ))}
            </div>
            <div className="button-container">
            <div>
                <button onClick={handlePrevPage} disabled={currentPage <= 1} className="pokemon-list-button">
                    ←
                </button>
            </div>
            <div>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="pokemon-list-button">
                →
            </button>
            </div>
        </div>
            
        </>
    )
}

export default PokemonList;