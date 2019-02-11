import { connect } from 'react-redux';

// COMPONENTS
import Menu from 'components/menu/Menu';

// ACTION 
import { toggleSideBar, toggleLogOut } from 'actions/menu-actions';
import { logout } from 'actions/login-actions';

const mapStateToProps = (state) => {
  return {
    isSideBarOpen: state.menu.open, 
    isLogOutOpen: state.menu.isLogOutOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideBar: () => {
      dispatch(toggleSideBar());
    },
    toggleLogOut: () => {
      dispatch(toggleLogOut());
    },
    logout: () => {
      dispatch(logout());
    },
  }
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;

