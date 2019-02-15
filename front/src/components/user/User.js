import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';


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
          <p>Inscriptions en attente :</p>
          <UsersWaiting usersWaiting={ this.props.usersWaiting }
                        checkUser={ this.props.checkUser }
                        deleteUser={ this.props.deleteUser }
                        openConfirmationMessage={ this.props.openConfirmationMessage }
          />
          <p>Utilisateurs :</p>
          <Users users={ this.props.users } 
                deleteUser={ this.props.deleteUser }
                openConfirmationMessage={ this.props.openConfirmationMessage }
          />
        </div>
      </Grid>
    )
  }
}

export default User;