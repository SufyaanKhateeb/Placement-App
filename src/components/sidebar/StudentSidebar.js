import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { userActions } from "../../store/user-slice";

class StudentSidebar extends Component {
    state = {};

    toggleMenuState(menuState) {
        if (this.state[menuState]) {
            this.setState({ [menuState]: false });
        } else if (Object.keys(this.state).length === 0) {
            this.setState({ [menuState]: true });
        } else {
            Object.keys(this.state).forEach((i) => {
                this.setState({ [i]: false });
            });
            this.setState({ [menuState]: true });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        document.querySelector("#sidebar").classList.remove("active");
        Object.keys(this.state).forEach((i) => {
            this.setState({ [i]: false });
        });

        const dropdownPaths = [
            { path: "/apps", state: "appsMenuOpen" },
            { path: "/basic-ui", state: "basicUiMenuOpen" },
            { path: "/form-elements", state: "formElementsMenuOpen" },
            { path: "/student/jobs", state: "jobMenuOpen" },
            { path: "/tables", state: "tablesMenuOpen" },
            { path: "/icons", state: "iconsMenuOpen" },
            { path: "/charts", state: "chartsMenuOpen" },
            { path: "/user-pages", state: "userPagesMenuOpen" },
            { path: "/error-pages", state: "errorPagesMenuOpen" },
        ];

        dropdownPaths.forEach((obj) => {
            if (this.isPathActive(obj.path)) {
                this.setState({ [obj.state]: true });
            }
        });
    }

    render() {
        // console.log(this.props.userObj)
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                    {/* <a className="sidebar-brand brand-logo" href="index.html"><img src={require('../../assets/images/logo.svg')} alt="logo" /></a> */}
                    {/* main heading or icon */}
                    <a className="sidebar-brand brand-logo" href="index.html">
                        <h3 style={{ color: "white" }}>Placement App</h3>
                    </a>

                    {/* <a className="sidebar-brand brand-logo-mini" href="index.html"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></a> */}
                    <a
                        className="sidebar-brand brand-logo-mini"
                        href="index.html"
                    >
                        <h3 style={{ color: "white" }}>PA</h3>
                    </a>
                </div>
                <ul className="nav">
                    {/* profile pic and three dots */}
                    <li className="nav-item profile">
                        <div className="profile-desc">
                            <div className="profile-pic">
                                <div className="count-indicator">
                                    <img
                                        className="img-xs rounded-circle "
                                        src={require("../../assets/images/faces/face1.jpg")}
                                        alt="profile"
                                    />
                                    {/* <span className="count bg-success"></span> */}
                                </div>
                                <div className="profile-name">
                                    <h5 className="mb-0 font-weight-normal">
                                        {this.props.userObj.name}
                                    </h5>
                                    <span>{this.props.userType}</span>
                                </div>
                            </div>
                            {/* <Dropdown alignRight>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a href="!#" className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">Change Password</p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">To-do list</p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown> */}
                        </div>
                    </li>

                    {/* not needed but let it be */}
                    {/* <li className="nav-item nav-category"> */}
                    {/* <span className="nav-link">Navigation</span> */}
                    {/* </li> */}

                    {/* <li className={ this.isPathActive('/student-home') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/student-home">
              <span className="menu-icon"><i className="mdi mdi-home-variant"></i></span>
              <span className="menu-title">Home</span>
            </Link>
          </li> */}

                    {!this.props.isVerified && (
                        <li
                            className={
                                this.isPathActive("/student-register")
                                    ? "nav-item menu-items active"
                                    : "nav-item menu-items"
                            }
                        >
                            <Link className="nav-link" to="/student-register">
                                <span className="menu-icon">
                                    <i className="mdi mdi-home-variant"></i>
                                </span>
                                <span className="menu-title">Register</span>
                            </Link>
                        </li>
                    )}

                    <li
                        className={
                            this.isPathActive("/student/profile")
                                ? "nav-item menu-items active"
                                : "nav-item menu-items"
                        }
                    >
                        <Link className="nav-link" to="/student/profile">
                            <span className="menu-icon">
                                <i className="mdi mdi-account-box"></i>
                            </span>
                            <span className="menu-title">Placement Stats</span>
                        </Link>
                    </li>
                    {this.props.isVerified && (
                        <li
                            className={
                                this.isPathActive("/student/feedback")
                                    ? "nav-item menu-items active"
                                    : "nav-item menu-items"
                            }
                        >
                            <Link className="nav-link" to="/student/feedback">
                                <span className="menu-icon">
                                    <i className="mdi mdi-clipboard-text"></i>
                                </span>
                                <span className="menu-title">Feedback</span>
                            </Link>
                        </li>
                    )}
                    {/* {this.props.isVerified && <li className={ this.isPathActive('/student/offers') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/student/offers">
              <span className="menu-icon"><i className="mdi mdi-library-books"></i></span>
              <span className="menu-title">Offers</span>
            </Link>
          </li>} */}
                    {this.props.isVerified && (
                        <li
                            className={
                                this.isPathActive("/student/jobs")
                                    ? "nav-item menu-items active"
                                    : "nav-item menu-items"
                            }
                        >
                            <div
                                className={
                                    this.state.jobMenuOpen
                                        ? "nav-link menu-expanded"
                                        : "nav-link"
                                }
                                onClick={() =>
                                    this.toggleMenuState("jobMenuOpen")
                                }
                                data-toggle="collapse"
                            >
                                <span className="menu-icon">
                                    <i className="mdi mdi-playlist-play"></i>
                                </span>
                                <span className="menu-title">
                                    Job Applications
                                </span>
                                <i className="menu-arrow"></i>
                            </div>
                            <Collapse in={this.state.jobMenuOpen}>
                                <div>
                                    <ul className="nav flex-column sub-menu">
                                        <li className="nav-item">
                                            {" "}
                                            <Link
                                                className={
                                                    this.isPathActive(
                                                        "/student/jobs/job-openings"
                                                    )
                                                        ? "nav-link active"
                                                        : "nav-link"
                                                }
                                                to="/student/jobs/job-openings"
                                            >
                                                Job openings
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            {" "}
                                            <Link
                                                className={
                                                    this.isPathActive(
                                                        "/student/jobs/pending-applications"
                                                    )
                                                        ? "nav-link active"
                                                        : "nav-link"
                                                }
                                                to="/student/jobs/pending-applications"
                                            >
                                                Pending Applications
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Collapse>
                        </li>
                    )}
                    {/* {this.props.isVerified && <li className={ this.isPathActive('/student/stats') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/student/stats">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title">Placement statistics</span>
            </Link>
          </li>} */}
                    {!this.props.isVerified && (
                        <li
                            className={
                                this.isPathActive("/student-not-verified")
                                    ? "nav-item menu-items active"
                                    : "nav-item menu-items"
                            }
                        >
                            <Link
                                className="nav-link"
                                to="/student-not-verified"
                            >
                                <span className="menu-icon">
                                    <i className="mdi mdi-information-outline"></i>
                                </span>
                                <span className="menu-title">
                                    Please wait for verification
                                </span>
                            </Link>
                        </li>
                    )}
                    {/* <li className={ this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          <li className={ this.isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('basicUiMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title">Basic UI Elements</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.basicUiMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link' } to="/basic-ui/buttons">Buttons</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link' } to="/basic-ui/dropdowns">Dropdowns</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link' } to="/basic-ui/typography">Typography</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('formElementsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title">Form Elements</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.formElementsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link' } to="/form-elements/basic-elements">Basic Elements</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/mytables') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('tablesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
              <span className="menu-title">Tables</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.tablesMenuOpen && false }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/cooltables/basic-table') ? 'nav-link active' : 'nav-link' } to="/tables/basic-table">Basic Table</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/charts') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('chartsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title">Charts</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.chartsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link' } to="/charts/chart-js">Chart Js</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('iconsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title">Icons</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.iconsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link' } to="/icons/mdi">Material</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('userPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title">User Pages</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.userPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/login-1">Login</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/register-1">Register</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">More</span>
          </li>
          <li className={ this.isPathActive('/error-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title">Error Pages</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.errorPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-404">404</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-500">500</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title">Documentation</span>
            </a>
          </li> */}
                </ul>
            </nav>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname === path;
        // console.log(this.props.location.pathname)
    }

    componentDidMount() {
        this.onRouteChanged();
        // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
        const body = document.querySelector("body");
        document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
            el.addEventListener("mouseover", function () {
                if (body.classList.contains("sidebar-icon-only")) {
                    el.classList.add("hover-open");
                }
            });
            el.addEventListener("mouseout", function () {
                if (body.classList.contains("sidebar-icon-only")) {
                    el.classList.remove("hover-open");
                }
            });
        });
    }
}

const mapStateToProps = (state) => {
    return {
        userType: state.user.userType,
        userObj: state.user.userObj,
        isVerified: state.user.isVerified,
        applicationStatus: state.applications.currentStudentApplication.status || '',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserObj: () => dispatch(userActions),
    };
    // return {
    //     increment: () => dispatch({ type: "increment" }),
    //     decrement: () => dispatch({ type: "decrement" }),
    // };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StudentSidebar)
);
