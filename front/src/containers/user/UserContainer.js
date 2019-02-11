import { connect } from 'react-redux';

// ACTIONS
import { 
  getUsersWaiting,
  getUsers,
  deleteUser,
  checkUser,
  toggleConfirmationMessage
} from 'actions/user-actions';

// COMPONENTS
import User from 'components/user/User';

const mapStateToProps = (state) => {
  return {
    usersWaiting: state.user.usersWaiting,
    users: state.user.users,
    isConfirmationMessageOpen: state.user.isConfirmationMessageOpen,
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
    toggleConfirmationMessage: () => {
      dispatch(toggleConfirmationMessage());
    },
  }
}

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User);

export default UserContainer;