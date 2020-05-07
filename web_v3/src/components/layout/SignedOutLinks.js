import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class SignedOutLinks extends Component {
    render() {
        return (
            <ul id="nav-mobile" className="right cyan lighten-3 waves-effect waves-green">
                <li><NavLink to="/signin" ><span className="font-weight-bold">Đăng nhập</span></NavLink></li>
            </ul>
        )
    }
}
