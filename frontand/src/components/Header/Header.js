import React from 'react';
import {NavLink} from "react-router-dom";

const Header = props => {
    return (
        <nav className="navbar navbar-dark bg-info">
            <NavLink to="/" className="navbar-brand">Forum</NavLink>

            {props.user
                ? <div>
                    <span className="text-light mr-3">Hello, {props.user.username} </span>
                    <NavLink to="/posts/new" className="btn btn-sm btn-outline-light mr-2">Add post</NavLink>
                    <span onClick={props.logout} className="btn btn-sm btn-outline-light">Log out</span>
                </div>
                : <div>
                    <NavLink to="/register" className="btn btn-sm btn-outline-light mr-2">Register</NavLink>
                    <NavLink to="/login" className="btn btn-sm btn-outline-light">Login</NavLink>
                </div>
            }

        </nav>
    );
};

export default Header;
