import React, { Component } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { getUsersWaiting } from 'actions/admin-actions';
import { getUsers } from 'actions/admin-actions';
import { deleteUser } from 'actions/admin-actions';
import { checkUser } from 'actions/admin-actions';

// COMPONENTS 
import UsersWaiting from 'components/admin/UsersWaiting';
import Users from 'components/admin/Users';

// STYLE 
import styles from './admin.module.css';

class Admin extends Component {

  componentDidMount = () => {
    this.props.getUsersWaiting();
    this.props.getUsers();
  }

  render () {
    return (
      <div className={styles.container}>
        Inscriptions en attente : 
        <UsersWaiting usersWaiting={this.props.usersWaiting} checkUser={this.props.checkUser} deleteUser={this.props.deleteUser}/>
        Utilisateurs : 
        <Users users={this.props.users} />
      </div>       
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usersWaiting: state.admin.usersWaiting,
    users: state.admin.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersWaiting: () => {
      dispatch(getUsersWaiting())
    },
    getUsers: () => {
      dispatch(getUsers())
    },
    deleteUser: (userId) => {
      dispatch(deleteUser(userId));
    },
    checkUser: (userId) => {
      dispatch(checkUser(userId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);