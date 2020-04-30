import React, { Component } from 'react'

export default class SignedInLinks extends Component {
    render() {
        return (
            <ul id="nav-mobile" className="right cyan lighten-3 waves-effect waves-green">
                <li><a href="sass.html">Đăng xuất</a></li>
                <li><i className="material-icons" style={{marginTop:3, marginLeft: 15, marginRight: 15}}>fingerprint</i></li>
            </ul>
        )
    }
}
