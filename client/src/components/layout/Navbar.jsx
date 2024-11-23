import './layout.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserFromToken } from '../../helpers/getUser';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const user = getUserFromToken();
    const signOut = () => {
        localStorage.removeItem('token')
        setMenuOpen(false);
        return navigate('/');
    }

    return (
        <nav>
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        {/* <img src="images/logo.png" alt="Logo" /> */}
                        <span className="italiana">Carbonite</span>
                    </Link>
                </div>

                <div className="burger" onClick={toggleMenu}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>

                <div className={`nav_links ${menuOpen ? "open" : ""}`}>
                    {
                        user ? 
                            <>
                                <Link to='/' onClick={toggleMenu}>Home</Link>
                                <Link to='/profile' onClick={toggleMenu}>Profile</Link>
                                <Link onClick={signOut}>Sign Out</Link>
                            </>
                            :
                            <>
                                <Link to='/login' onClick={toggleMenu}>Login</Link>
                                <Link to='/register' onClick={toggleMenu}>Sign up</Link>
                            </>
                    }
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;