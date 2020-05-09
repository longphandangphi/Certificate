import React, { Component } from 'react'
import logo from '../../images/due-logo.png'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { NavLink } from 'react-router-dom'
import cookie from "react-cookies"

class Narbar extends Component {
    state = {
        value: '',
        token: null
    }

    componentDidMount() {
        const token = cookie.load("token");
        this.setState({ token });
    }

    render(){
        return (
            <nav className="nav-wrapper light-blue lighten-5">
                <div className="container">
                    <NavLink to="/"><img src={logo} alt="Trang chủ" style={{width:'30%'}}/></NavLink>
                    {
                        this.state.token !== undefined
                            ? <SignedInLinks value={this.state.value} onChangeValue={() => this.render}/>
                            : <SignedOutLinks />
                    }
                </div>
            </nav>
        );
    }
}

export default Narbar;