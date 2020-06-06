import React from 'react';
import Corona from "../corona-virus.png"
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src={Corona} alt="corona" style={{ width: '8%' }} />
                </Link>
                <h1>Corona Tracker</h1>
            </div>
        </header>
    )
}
export default Header;