import React, { Component } from 'react'
import cookie from "react-cookies"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import Loading from "../others/common/LoadingIndicator"
import RequestHelper from "../helpers/request.helper"
import Navbar from '../layout/Navbar'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          user: {
            email: "",
            password: ""
          },
          error: ""
        };
    }
    // state ={
    //     email: '',
    //     password: ''
    // } 
    componentDidMount() {
        if (cookie.load("token")) {
          this.props.history.push("/");
        }
    }

    onLogin = async () => {
    let { user } = this.state;
    if (!user.email || !user.password)
        return this.setState({
        error: "Require both Username and password to login!"
        });
    try {
        this.setState({ loading: true, error: "" });
        // const data = await Api.login(user);
        const data = await RequestHelper.post("https://localhost:44319/api/sso/loginAdmin",user)
        const token = data.token;
        const jwtPayload = data.jwtPayload;
        cookie.save("token", token);
        cookie.save("userLogin", jwtPayload);

        this.setState({ loading: false });
        this.props.history.push("/");
    } catch (err) {
        return this.setState({
        loading: false,
        error: "Invalid username or password!"
        });
    }
    };

    onChange = e => {
        let value = e.target.value;
        let attr = e.target.name;
    
        let user = Object.assign({}, this.state.user);
        user[attr] = value;
        this.setState({ user });
    };

    keyPressed = event => {
        if (event.key === "Enter") {
          this.onLogin();
        }
      };

    // handleSubmit = () => {

    // }

    // handleChange =() => {

    // }

    render() {
        const { loading, error } = this.state;
        return (
          <>
            <div>
              <Navbar/>
            </div>
            {loading && <Loading />}
            <div className={`app flex-row align-items-center ${loading && "wrapper-indicator"}`}>
              <Container>
                <Row className="justify-content-center">
                  <Col md="4">
                    <Card className="p-4 text-center">
                      <CardBody>
                        <p className="text-muted">Login with Admin account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="email"
                            type="text"
                            placeholder="Username"
                            autoComplete="email"
                            onChange={this.onChange}
                            onKeyPress={this.keyPressed}
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="password"
                            onChange={this.onChange}
                            onKeyPress={this.keyPressed}
                          />
                        </InputGroup>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <Row
                          style={{
                            justifyContent: "center"
                          }}
                        >
                          <Col xs="6">
                            <Button onClick={this.onLogin} color="primary" className="px-6">
                              Login
                            </Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </>
        );
      }

    // render() {
    //     return (
    //         <div className="container">
    //         <form className="white" onSubmit={this.handleSubmit}>
    //             <h5 className="grey-text text-darken-3">Sign In</h5>
    //             <div className="input-field">
    //                 <label htmlFor="email">Email</label>
    //                 <input type="email" id="email" onChange={this.handleChange} />
    //             </div>
    //             <div className="input-field">
    //                 <label htmlFor="password">Password</label>
    //                 <input type="password" id="password" onChange={this.handleChange} />
    //             </div>
    //             <div className="input-field">
    //                 <button className="btn orange lighten-1 z-depth-0">Log in</button>
    //                 &nbsp;<a href="long.com">Quên mật khẩu?</a>
    //                 <div className="red-text center">
    //                     {/* { authError ? <p>{authError}</p> : null } */}
    //                 </div>
    //             </div>
    //         </form>
    //     </div>
    //     )
    // }

}

export default SignIn
