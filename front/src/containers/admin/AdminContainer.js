import { connect } from 'react-redux';

// ACTIONS
import { 
  getUsersWaiting,
  getUsers,
  deleteUser,
  checkUser,
} from 'actions/admin-actions';

// COMPONENTS
import Admin from 'components/admin/Admin';

const mapStateToProps = (state) => {
  return {
    usersWaiting: state.admin.usersWaiting,
    users: state.admin.users,
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
    }
  }
}

const AdminContainer = connect(mapStateToProps, mapDispatchToProps)(Admin);

export default AdminContainer;