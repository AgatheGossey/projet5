import React from 'react';

// COMPONENTS
import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';

const Menu = (props) => {
  return (
    <div>
      <TopBar 
        showModal={ props.showModal }
        hideModal={ props.hideModal }
        toggleSideBar={ props.toggleSideBar }
        isSideBarOpen={ props.isSideBarOpen }
        logout={ props.logout }
      />
      <LeftBar
        isSideBarOpen={ props.isSideBarOpen }
        toggleSideBar={ props.toggleSideBar }
        userIsAdmin={ props.userIsAdmin }
      />
    {props.children}
  </div>
  )
}

export default Menu;