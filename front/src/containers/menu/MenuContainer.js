import { connect } from 'react-redux';
import Menu from 'components/menu/Menu';

// ACTION 
import { toggleSideBar } from '../../actions/menu-actions';

const mapStateToProps = (state) => {
  return {
    isSideBarOpen: state.sidebar.open, 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideBar: () => {
      dispatch(toggleSideBar());
    }
  }
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);
export default MenuContainer;

