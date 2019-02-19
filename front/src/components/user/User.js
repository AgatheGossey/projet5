import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';


// COMPONENTS
import UsersWaiting from './components/UsersWaiting';
import Users from './components/Users';

// STYLE 
import styles from './user.module.css';

class User extends Component {

  componentDidMount = () => {
    this.props.getUsersWaiting();
    this.props.getUsers();
  }

  render () {
    return (
      <Grid
        container
        direction="row"
        justify="center"
      >
        <div className={ styles.container }>
          <Typography>Inscriptions en attente :</Typography>
          <UsersWaiting usersWaiting={ this.props.usersWaiting }
                        checkUser={ this.props.checkUser }
                        deleteUser={ this.props.deleteUser }
                        showModal={ this.props.showModal }
                        hideModal={ this.props.hideModal }
          />
          <Typography>Utilisateurs :</Typography>
          <Users users={ this.props.users } 
                deleteUser={ this.props.deleteUser }
                showModal={ this.props.showModal }
                hideModal={ this.props.hideModal }
          />
        </div>
      </Grid>
    )
  }
}

export default User;