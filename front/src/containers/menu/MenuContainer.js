import { connect } from 'react-redux';

// COMPONENTS
import Menu from 'components/menu/Menu';

// ACTION 
import { toggleSideBar } from 'actions/menu-actions';
import { logout } from 'actions/login-actions';
import { showModal, hideModal } from 'actions/modal-actions';

const mapStateToProps = (state) => {
  return {
    isSideBarOpen: state.menu.open, 
    userIsAdmin: parseInt(state.login.user.status, 10) === 1, 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProps) => {
      dispatch(showModal(modalType, modalProps));
    },
    hideModal: (modalType) => {
      dispatch(hideModal(modalType));
    },
    toggleSideBar: () => {
      dispatch(toggleSideBar());
    },
    logout: () => {
      dispatch(logout());
    },
  }
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;

