import { connect } from 'react-redux';

// ACTIONS
import { createUser, toggleMessage } from 'actions/admin-actions';
import { login } from 'actions/login-actions';

// COMPONENTS
import Home from 'components/home/Home';

const mapStateToProps = (state) => {
  return {
    isMessageOpen: state.admin.isMessageOpen,
    registerUsernameError: state.admin.registerUsernameError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: async (data) => {
      await dispatch(createUser(data));
    },
    toggleMessage: () => {
      dispatch(toggleMessage());
    },
    login: (data) => {
      dispatch(login(data))
    },
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;


