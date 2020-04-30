import React from 'react';
import logo from '../../images/due-logo.png'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { NavLink } from 'react-router-dom'

const Narbar = (props) => {
    return ( 
        <nav className="nav-wrapper light-blue lighten-5">
            <div className="container">
                <NavLink to="/"><img src={logo} alt="Trang chủ" style={{width:300}}/></NavLink>
                <a href="long.com" className="brand-logo center light-blue-text darken-1" style={{marginLeft: 0}}>
                    {/* <span style={{paddingBottom:5}}>DUE</span> */}
                </a>

                <SignedInLinks />

                <SignedOutLinks />
                    
            </div>
        </nav>
     );
}
 
export default Narbar;