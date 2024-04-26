import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search Pokémon"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value.toLowerCase())}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
