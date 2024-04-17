import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
    return(
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">Pokédex</div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;