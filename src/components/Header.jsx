import React from "react";
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-blue-600 p-4">
            <nav className="text-white">
                <Link to="/home" className="mr-4">Home</Link>
                <Link to="/login" className="mr-4">Login</Link>
                <Link to="/register" className="mr-4">Register</Link>
       
            </nav>
        </header>
    );
};

export default Header;