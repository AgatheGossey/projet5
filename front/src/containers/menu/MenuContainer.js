import { connect } from 'react-redux';

// COMPONENTS
import Menu from 'components/menu/Menu';

// ACTION 
import { toggleSideBar, toggleSignOut } from '../../actions/menu-actions';

const mapStateToProps = (state) => {
  return {
    isSideBarOpen: state.menu.open, 
    isSignOutOpen: state.menu.isSignOutOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideBar: () => {
      dispatch(toggleSideBar());
    },
    toggleSignOut: () => {
      dispatch(toggleSignOut());
    }
  }
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;

