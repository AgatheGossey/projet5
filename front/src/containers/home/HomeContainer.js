import { connect } from 'react-redux';

// ACTIONS
import { createUser, toggleMessageAfterRegister } from 'actions/user-actions';
import { login } from 'actions/login-actions';

// COMPONENTS
import Home from 'components/home/Home';

const mapStateToProps = (state) => {
  return {
    isMessageAfterRegisterOpen: state.user.isMessageAfterRegisterOpen,
    registerUsernameError: state.user.registerUsernameError,
    connectionError: state.login.connectionError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: async (data) => {
      await dispatch(createUser(data));
    },
    toggleMessageAfterRegister: () => {
      dispatch(toggleMessageAfterRegister());
    },
    login: (data) => {
      dispatch(login(data))
    },
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;


