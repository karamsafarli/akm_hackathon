import './layout.css';
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav>
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        <img src="images/logo.png" alt="Logo" />
                        <span className="italiana">Carbonite</span>
                    </Link>
                </div>

                <div className="burger" onClick={toggleMenu}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>

                <div className={`nav_links ${menuOpen ? "open" : ""}`}>
                    <Link to='/' onClick={toggleMenu}>Home</Link>
                    <Link to='/upload' onClick={toggleMenu}>Upload</Link>
                    <Link to='/profile' onClick={toggleMenu}>Profile</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;