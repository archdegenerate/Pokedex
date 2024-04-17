import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function PokemonList() {
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 9;


    useEffect(() => {
        const fetchData = async (offset, LIMIT) => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset='+ offset + '&limit=' + LIMIT);
            const data = await response.json();
            setPokemonData(data.results);
            setTotalPages(Math.ceil(data.count / LIMIT));
            console.log(totalPages);
        };

        fetchData((currentPage - 1) * LIMIT, LIMIT);
    }, [currentPage, LIMIT, totalPages]);

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
            <div className="pokemon-list-container">
                {pokemonData.map((pokemon) => (
                <Link
                    to={'/pokemon/' + pokemon.url.split('/')[6]}
                    key={pokemon.name}
                    className="pokemon-item"
                    >
                    <div key={pokemon.name} className = "pokemon-item">
                        <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemon.url.split('/')[6] + '.png'} alt={pokemon.name} 
                        />
                        <div className="pokemon-details">
                            <h2>{pokemon.name}</h2>
                            <p>ID: {pokemon.url.split('/')[6]}</p>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
            <div className="button-container">
            <div>
                <button onClick={handlePrevPage} disabled={currentPage <= 1}>
                    Prev Page
                </button>
            </div>
            <div>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
                Next Page
            </button>
            </div>
        </div>
            
        </>
    )
}

export default PokemonList;