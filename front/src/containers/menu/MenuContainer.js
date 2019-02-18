import { connect } from 'react-redux';

// COMPONENTS
import Menu from 'components/menu/Menu';

// ACTION 
import { toggleSideBar } from 'actions/menu-actions';
import { logout } from 'actions/login-actions';
import { showModal } from 'actions/modal-actions';

const mapStateToProps = (state) => {
  return {
    isSideBarOpen: state.menu.open, 
    // If user status equal to 1, he's admin -> Used to show (or not) the users page link
    userIsAdmin: parseInt(state.login.user.status, 10) === 1, 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // modal
    showModal: (modalType, modalProps) => {
      dispatch(showModal(modalType, modalProps));
    },
    // sidebar
    toggleSideBar: () => {
      dispatch(toggleSideBar());
    },
    // logout
    logout: () => {
      dispatch(logout());
    },
  }
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;

