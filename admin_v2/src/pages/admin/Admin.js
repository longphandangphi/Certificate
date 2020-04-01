import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import cookie from "react-cookies";

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";
import { getProfile } from "../../actions/profile.action";
import { connect } from "react-redux";

const DefaultAside = React.lazy(() => import("./DefaultLayout/DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultLayout/DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultLayout/DefaultHeader"));

class DefaultLayout extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Đang tải...</div>;

  signOut(e) {
    e.preventDefault();
    cookie.remove("token", { path: "/" });
    this.props.history.push("/login");
  }

  componentDidMount = () => {
    this.props.getProfile();
  };

  getEmployeeSidebar = () => {
    const { profile } = this.props.profileReducer;
    const roles = profile.roles || [];
    const menus =
      roles.filter(role => {
        if (role.name === "Super Admin") {
          return true;
        }
        return false;
      }).length === 1
        ? navigation.items
        : this.checkPermissionsSideBar(roles);
    return menus;
  };

  checkPermissionsSideBar = roles => {
    var menus = [];
    navigation.items.map(item =>
      roles.map(role => {
        item.permissions.map(permission => permission === role.name && menus.push(item));
      })
    );
    return menus;
  };

  getEmployeeRoutes = () => {
    const { profile } = this.props.profileReducer;
    const roles = profile.roles || [];
    const allowRoutes =
      roles.filter(role => {
        if (role.name === "Super Admin") {
          return true;
        }
        return false;
      }).length === 1
        ? routes
        : this.checkPermissionsRoutes(roles);
    return allowRoutes;
  };

  checkPermissionsRoutes = roles => {
    var allowRoutes = [];
    routes.map(item =>
      roles.map(role => {
        item.permissions.map(permission => permission === role.name && allowRoutes.push(item));
      })
    );
    return allowRoutes;
  };

  render() {
    //const items = navigation.items;
    const items = this.getEmployeeSidebar();
    const allowRoutes = this.getEmployeeRoutes();

    return (
      <>
        <div className="app">
          <ToastContainer />
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DefaultHeader onLogout={e => this.signOut(e)} />
            </Suspense>
          </AppHeader>

          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={{ items }} {...this.props} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>

            <main className="main">
              <AppBreadcrumb appRoutes={routes} />
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {allowRoutes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => <route.component {...props} />}
                        />
                      ) : null;
                    })}
                    <Redirect from="/" to="/admin/dashboard" />
                  </Switch>
                </Suspense>
              </Container>
            </main>

            <AppAside fixed>
              <Suspense fallback={this.loading()}>
                <DefaultAside />
              </Suspense>
            </AppAside>
          </div>

          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter />
            </Suspense>
          </AppFooter>
        </div>
      </>
    );
  }
}

export default connect(
  state => ({
    profileReducer: state.profileReducer
  }),
  { getProfile }
)(DefaultLayout);
