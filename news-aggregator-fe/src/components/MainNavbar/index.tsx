import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

export interface MainNavbarProps{
    isAuth: boolean;
    name?: string;
}


export const MainNavbar: React.FC<MainNavbarProps> = ({ name, isAuth }) =>{

    return (
        <Navbar bg="light" expand="lg">
        <Link className="navbar-brand" to="/">News</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                {isAuth ? (
                    <React.Fragment>
                        <a className="nav-link" href="/#">{(name) && `${name}`}</a>
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </React.Fragment>
                )}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    
    )
}


export default MainNavbar;