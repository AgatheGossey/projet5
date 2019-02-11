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
          toggleLogOut={ this.props.toggleLogOut }
          isLogOutOpen={this.props.isLogOutOpen}
          logout={ this.props.logout }
        />
        <LeftBar
          isSideBarOpen={ this.props.isSideBarOpen }
          toggleSideBar={ this.props.toggleSideBar }
          userIsAdmin={ this.props.userIsAdmin }
        />
        {this.props.children}
      </div>
    )
  }
}

export default Menu;