import { connect } from 'react-redux';

// ACTIONS
import { 
  getUsersWaiting,
  getUsers,
  deleteUser,
  checkUser,
} from 'actions/user-actions';

import { showModal, hideModal } from 'actions/modal-actions';

// COMPONENTS
import User from 'components/user/User';

const mapStateToProps = (state) => {
  return {
    usersWaiting: state.user.usersWaiting,
    users: state.user.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersWaiting: () => {
      dispatch(getUsersWaiting());
    },
    getUsers: () => {
      dispatch(getUsers());
    },
    deleteUser: (userId) => {
      dispatch(deleteUser(userId));
    },
    checkUser: (userId) => {
      dispatch(checkUser(userId));
    },
    showModal: (modalType, modalProps) => {
      dispatch(showModal(modalType, modalProps));
    },
    hideModal: (modalType) => {
      dispatch(hideModal(modalType));
    },
  }
}

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User);

export default UserContainer;