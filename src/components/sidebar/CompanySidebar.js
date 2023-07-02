import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux'

class CompanySidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true}); 
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          
          {/* <a className="sidebar-brand brand-logo" href="index.html"><img src={require('../../assets/images/logo.svg')} alt="logo" /></a> */}
          {/* main heading or icon */}
          <a className="sidebar-brand brand-logo" href="index.html">
            <h3 style={{ color: 'white' }}>Placement App</h3>
          </a>
          
          {/* <a className="sidebar-brand brand-logo-mini" href="index.html"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></a> */}
          <a className="sidebar-brand brand-logo-mini" href="index.html">
            <h3 style={{ color: 'white' }}>PA</h3>
          </a>
        </div>
        <ul className="nav">

          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={require('../../assets/images/faces/face1.jpg')} alt="profile" />
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">{this.props.userObj.name}</h5>
                  <span>{this.props.userType}</span>
                </div>
              </div>
            </div>
          </li>


          {/* <li className={ this.isPathActive('/company/home') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/company/home">
              <span className="menu-icon"><i className="mdi mdi-home-variant"></i></span>
              <span className="menu-title">Home</span>
            </Link>
          </li> */}
          <li className={ this.isPathActive('/company/applications') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/company/applications">
              <span className="menu-icon"><i className="mdi mdi-library-books"></i></span>
              <span className="menu-title">Applications Recieved</span>
            </Link>
          </li>
          <li className={ this.isPathActive('/company/feedback') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/company/feedback">
              <span className="menu-icon"><i className="mdi mdi-clipboard-text"></i></span>
              <span className="menu-title">Feedback</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

const mapStateToProps = (state) => {
  return {
      userType: state.user.userType,
      userObj: state.user.userObj
  };
};

const mapDispatchToProps = (dispatch) => {
  return {}
  // return {
      // increment: () => dispatch({ type: "increment" }),
  // };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CompanySidebar));