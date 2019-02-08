import { connect } from 'react-redux';

// ACTIONS
import { createUser } from 'actions/admin-actions';

// COMPONENTS
import Home from 'components/home/Home';

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (data) => {
      dispatch(createUser(data));
    },
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;


