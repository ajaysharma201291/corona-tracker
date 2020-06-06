import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {

    const data = [{
        name: 'World',
        path: '/',
    }, {
        name: 'India',
        path: '/country/india'
    }]

    return (
        <div className="container">
            <Navbar bg="dark" variant="dark">
                <Link to={data[0].path}>
                    <Navbar.Brand>{data[0].name}</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                    {data.map((d, index) => (
                        <Link to={d.path} key={index}>{d.name}</Link>
                    ))}
                </Nav>
            </Navbar>

        </div>
    )
}

export default NavbarComponent;