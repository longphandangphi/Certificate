import React, { Component } from 'react'
import cookie from "react-cookies"
//import { Redirect } from "react-router-dom"

export default class SignedInLinks extends Component {
    signOut() {
        //e.preventDefault();
        cookie.remove("token");
        this.props.history.push('/');
    }

    render() {
        return (
            <ul id="nav-mobile" className="right cyan lighten-3 waves-effect waves-green">
                <li><a href="/" onClick={this.signOut}>Đăng xuất</a></li>
                <li><i className="material-icons" style={{marginTop:3, marginLeft: 15, marginRight: 15}}>fingerprint</i></li>
            </ul>
        )
    }
}
