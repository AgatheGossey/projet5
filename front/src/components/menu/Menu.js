import React, { Component } from 'react';

// COMPONENTS
import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';

class Menu extends Component {
  render() {
    return (
      <div>
        <TopBar 
          toggleSideBar={ this.props.toggleSideBar }
          isSideBarOpen={ this.props.isSideBarOpen }
          toggleSignOut= { this.props.toggleSignOut }
          isSignOutOpen= {this.props.isSignOutOpen}
          logout={ this.props.logout }
        />
        <LeftBar
          isSideBarOpen= { this.props.isSideBarOpen }
          toggleSideBar= { this.props.toggleSideBar }
        />
        {this.props.children}
      </div>
    )
  }
}

export default Menu;