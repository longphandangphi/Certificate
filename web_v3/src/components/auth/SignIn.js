import React, { Component } from 'react'
import cookie from "react-cookies"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row
} from "reactstrap";
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

    componentDidMount() {
        if (cookie.load("token")) {
          this.props.history.push("/");
        }
    }

    onLogin = async () => {
    let { user } = this.state;
    if (!user.email || !user.password)
        return this.setState({
        error: "Require both email and password to login!"
        });
    try {
        this.setState({ loading: true, error: "" });
        const data = await RequestHelper.post("https://localhost:44319/api/sso/loginStudent",user)
        const token = data.token;
        //const jwtPayload = data.jwtPayload;
        console.log(data.jwtPayload,"DATA JWT PAYLOAD")
        cookie.save("token", token);
        //cookie.save("userLogin", jwtPayload);

        this.props.history.push("/");
    } catch (err) {
        return this.setState({
        // loading: false,
        error: "Invalid email or password!"
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

    render() {
        const {  error } = this.state;
        return (
          <>
            <div>
              <Navbar/>
            </div>
            <div className={`app flex-row align-items-center `} style={{paddingTop:30, width:400, minWidth:400, margin:'auto'}}>
              <Container>
                <Row className="justify-content-center">
                  <Col md="4">
                    <Card className="p-4 text-center">
                      <CardBody style={{padding:10}}>
                        <h5 className="text-muted center">Đăng nhập</h5>
                        <label>Email:</label>
                          <Input
                            name="email"
                            type="text"
                            placeholder="Email.."
                            autoComplete="email"
                            onChange={this.onChange}
                            onKeyPress={this.keyPressed}
                          />
                          <label>Password:</label>
                          <Input
                            name="password"
                            type="password"
                            placeholder="Password.."
                            autoComplete="password"
                            onChange={this.onChange}
                            onKeyPress={this.keyPressed}
                          />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <Row
                          style={{
                            justifyContent: "center"
                          }}
                        >
                            <Button style={{marginTop:10}} onClick={this.onLogin} color="success" className="px-6">
                              Login
                            </Button>
                            {/* &nbsp;
                            <a style={{}} href="long.com">Quên mật khẩu?</a> */}
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
