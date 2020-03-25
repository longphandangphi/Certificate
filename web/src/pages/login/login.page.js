import React, { Component } from "react";
import cookie from "react-cookies";
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
import Loading from "../../components/common/LoadingIndicator";
import Api from "../../api/api";
import lodash from "lodash";

class Login extends Component {
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

  onLogin = async () => {
    let { user } = this.state;
    if (!user.email || !user.password)
      return this.setState({
        error: "Username or password please!"
      });
    try {
      this.setState({ loading: true, error: "" });
      const data = await Api.login(user);
      const token = data.token;
      cookie.save("token", token);
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

  render() {
    const { loading, error } = this.state;
    return (
      <>
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
}

export default Login;
