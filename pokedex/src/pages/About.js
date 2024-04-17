import React from "react";
import Navbar from "../components/Navbar";

const randomFacts = [
    "Pikachu, arguably the most iconic Pokémon, was originally going to have a second evolution named Gorochu, which would have had horns and fangs.",
    "Pokémon Gold and Silver were supposed to be the final games in the series, but their massive success kept the franchise going strong.",
    "Surprisingly, the Pokémon Hitmonlee and Hitmonchan are not just fighting types; they are also named after famous martial artists Bruce Lee and Jackie Chan.",
    "The Pokémon games are set in regions inspired by real-world locations; for example, Kanto, Johto, Hoenn, and Sinnoh are based on various regions of Japan, Unova is modeled after New York, and Kalos is based on France.",
    "Clefairy was initially intended to be the franchise mascot, but Pikachu was ultimately chosen due to its wider appeal and adorable design.",
    "In Pokémon Red and Blue, a programming glitch led to the creation of MissingNo, a famous glitch Pokémon that can corrupt game files but also allow players to duplicate items.",
    "Pokémon X and Y were the first games in the series to introduce a fairy type, adding a new layer of strategy against dragon, dark, and fighting types.",
    "Did you know that the designs of several Pokémon are inspired by real animals? For example, Poliwag’s swirl pattern is based on the intestines of a tadpole, which are visible through its transparent skin.",
    "In the world of Pokémon, Wobbuffet is actually just the tail; the blue part is a decoy.",
    "The Pokémon Company collaborates with scientists to name newly discovered species, such as the protein Shellder, named after the Pokémon.",
    "Before Pokémon was internationally known, it was called Capsule Monsters during its conceptual phase.",
    "The Pokémon games introduced the concept of shiny Pokémon in Pokémon Gold and Silver, with shiny Pokémon having different colorations than their regular counterparts and being extremely rare.",
    "In an unusual twist, Ekans and Arbok’s names are snake and kobra spelled backwards, adding a playful element to their design.",
    "Pokémon has a special Pokémon, Ditto, which can transform into any other Pokémon, making it a unique asset in battles.",
    "Lastly, the first Pokémon ever designed was not Pikachu or Charmander, but rather Rhydon, evidenced by early sketches from the game's development."
];

function About(){
    const randomFact = randomFacts[Math.floor(Math.random() * randomFacts.length)];

    return (
        <>
            <Navbar />
            <div className='about-container'>
                <h1>Random fact about Pokemon:</h1>
                <p>{randomFact}</p> 
            </div>
        </>
    )
}

export default About;