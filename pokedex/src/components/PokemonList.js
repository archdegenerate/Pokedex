import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../App.css';

function PokemonList() {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const LIMIT = 9;
    const getTypeColorName = (typeName) => 'pokemon-type-'+typeName;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=964`);
                if (!response.ok) throw new Error('Failed to fetch Pokémon data');
                const data = await response.json();
    
                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const pokemonResponse = await fetch(pokemon.url);
                        if (!pokemonResponse.ok) throw new Error(`Failed to fetch data for ${pokemon.name}`);
                        const pokemonData = await pokemonResponse.json();
                        return pokemonData;
                    })
                );
    
                setPokemonData(pokemonDetails);
                setTotalPages(Math.ceil(data.results.length / LIMIT));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    useEffect(() => {
        if (searchQuery) {
            const results = pokemonData.filter(pokemon => 
                pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(results);
            setTotalPages(Math.ceil(results.length / LIMIT));
            setCurrentPage(1);
        } else {
            setFilteredData(pokemonData);
            setTotalPages(Math.ceil(pokemonData.length / LIMIT));
        }
    }, [searchQuery, pokemonData]);

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
                {filteredData
                    .slice((currentPage - 1) * LIMIT, currentPage * LIMIT)
                    .map((pokemon) => (
                    <Link
                        to={'/pokemon/' + pokemon.id} 
                        key={pokemon.id}
                        className="pokemon-item"
                        id={pokemon.types && pokemon.types.length > 0 ? getTypeColorName(pokemon.types[0].type.name) : 'pokemon-type-default'}
                    >
                        <div className="pokemon-item">
                        <img src={pokemon.sprites?.front_default || 'path/to/placeholder/image.png'} alt={pokemon.name} />
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
