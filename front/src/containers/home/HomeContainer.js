import { connect } from 'react-redux';

// ACTIONS
import { createUser, toggleMessage } from 'actions/admin-actions';

// COMPONENTS
import Home from 'components/home/Home';

const mapStateToProps = (state) => {
  return {
    isMessageOpen: state.admin.isMessageOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (data) => {
      dispatch(createUser(data));
    },
    toggleMessage: () => {
      dispatch(toggleMessage());
    }
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;


