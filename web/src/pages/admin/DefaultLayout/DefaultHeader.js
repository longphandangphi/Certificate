import React, { Component } from "react";
import cookie from "react-cookies";
// import { Link } from 'react-router-dom'
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import PropTypes from "prop-types";

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../../assets/img/brand/logo.svg";
import sygnet from "../../../assets/img/brand/sygnet.svg";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    let an = 1;
    const userLogin = cookie.load("userLogin");
    console.log(userLogin, "aaaaaaaaaaaaa");

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
        </Nav> */}
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell" />
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-list" />
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-location-pin" />
            </NavLink>
          </NavItem>
          {userLogin ? (
            <UncontrolledDropdown direction="down">
              <DropdownToggle nav>
                <img src={"../../assets/img/avatars/6.jpg"} className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>
              <DropdownMenu right style={{ right: "auto" }}>
                <DropdownItem header tag="div" className="text-center">
                  <strong>Account</strong>
                </DropdownItem>
                <DropdownItem onClick={e => this.props.onLogout(e)}>
                  <i className="fa fa-lock" /> EEE
                </DropdownItem>
                <DropdownItem onClick={e => this.props.onLogout(e)}>
                  <i className="fa fa-lock" /> EEE
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <UncontrolledDropdown direction="down">
              <DropdownToggle nav>
                <img src={"../../assets/img/avatars/6.jpg"} className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>
              <DropdownMenu right style={{ right: "auto" }}>
                <DropdownItem header tag="div" className="text-center">
                  <strong>Account</strong>
                </DropdownItem>
                <DropdownItem onClick={e => this.props.onLogout(e)}>
                  <i className="fa fa-lock" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile />
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
