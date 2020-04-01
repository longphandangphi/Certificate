import React, { Component } from "react";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <span>Dashboad load here</span>
          <Link
            className="link-a"
            style={{ textDecoration: "none" }}
            //to={`/articles/${value.id}/${value.clinicResponse.id}`}
            to={`/articles`}
          >
            kappa
          </Link>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
