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

    // handleSignOut = () => {

    // }

    componentDidMount() {
        const token = cookie.load("token");
        this.setState({ token });
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(cookie.load("token") !== null) {
    //         this.render();
    //     }

    // }

    // handleChangeValue = (value) => {
    //     console.log(value, "LOG true NE")
    //     //this.setState({value: e.target.value});
    // }

    render(){
        console.log(cookie.load("token"),"NAV RENDER");
        return (
            <nav className="nav-wrapper light-blue lighten-5">
                <div className="container">
                    <NavLink to="/"><img src={logo} alt="Trang chủ" style={{width:'30%'}}/></NavLink>
                    <a href="long.com" className="brand-logo center light-blue-text darken-1" style={{marginLeft: 0}}>
                        {/* <span style={{paddingBottom:5}}>DUE</span> */}
                    </a>
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