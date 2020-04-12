import React, { Component } from "react";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import { Carousel } from 'antd';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="animated fadeIn">
        
        <Carousel autoplay>
    <div>
      <img className="d-block w-100" style={{height:300}} src="https://due.udn.vn/Portals/0/Banner%20Truong/COVER%20website%202.jpg" alt="Second slide"/>
    </div>
    <div>
      <img className="d-block w-100" style={{height:300}} src="https://due.udn.vn/Portals/0/Banner%20Truong/MICAbanner_2501.png" alt="Second slide"/>
    </div>
    <div>
      <img className="d-block w-100" style={{height:300}} src="https://due.udn.vn/Portals/0/Banner%20Truong/banner_datchuan_clgd.jpg" alt="Second slide"/>
    </div>
    <div>
      <img className="d-block w-100" style={{height:300}} src="https://due.udn.vn/Portals/0/Banner%20Truong/01_AUN_2019.png" alt="Second slide"/>
    </div>
  </Carousel>

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
