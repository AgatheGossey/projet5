import { connect } from 'react-redux';

// ACTIONS
import { createUser } from 'actions/user-actions';
import { login } from 'actions/login-actions';

// COMPONENTS
import Home from 'components/home/Home';

const mapStateToProps = (state) => {
  return {
    registerUsernameError: state.user.registerUsernameError,
    connectionError: state.login.connectionError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: async (data) => {
      await dispatch(createUser(data));
    },
    login: (data) => {
      dispatch(login(data))
    },
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;


