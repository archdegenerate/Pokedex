import React from 'react';
import PokemonList from '../components/PokemonList';
import Navbar from '../components/Navbar';
function Home(){
    return(
        <>
            <Navbar />
            <PokemonList />
        </>
    )
}

export default Home;