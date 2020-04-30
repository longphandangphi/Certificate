import React, { Component } from 'react'

class SignIn extends Component {
    state ={
        email: '',
        password: ''
    } 

    handleSubmit = () => {

    }

    handleChange =() => {

    }

    render() {
        return (
            <div className="container">
            <form className="white" onSubmit={this.handleSubmit}>
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <button className="btn orange lighten-1 z-depth-0">Log in</button>
                    &nbsp;<a href="long.com">Quên mật khẩu?</a>
                    <div className="red-text center">
                        {/* { authError ? <p>{authError}</p> : null } */}
                    </div>
                </div>
            </form>
        </div>
        )
    }
}

export default SignIn
