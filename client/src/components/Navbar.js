import React, { useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (e) => {
        e.preventDefault();
        auth.logout();
        history.push('/');

    };
    return (
        <nav>
            <div className="nav-wrapper blue darken-2" style={{ padding: '0 2rem' }}>
                <span href="/" className="brand-logo right">Logo</span>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">List</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
};