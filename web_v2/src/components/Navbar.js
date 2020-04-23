import React  from 'react';
import { NavLink, withRouter} from 'react-router-dom';

const Navbar = (props) => {
    // setTimeout(() => {
    //     props.history.push("/about")
    // }, 20000);
    return (
        <nav className="nav-wrapper blue darken-3">
            <div className="container">
                <span className="brand-logo">DUE</span>
                <ul className="right">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </div>
        </nav>
        
        
        
    )
}

export default withRouter(Navbar)