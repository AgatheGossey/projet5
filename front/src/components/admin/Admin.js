import React, { Component, Fragment } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Card, CardContent, Typography } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';

// STYLE 
import styles from './admin.module.css';

// CONSTANTS
import { API_HOST, USERS_TABLE_COLUMNS_WAITING, USERS_TABLE_COLUMNS } from '../../constants';

class Admin extends Component {
  state = {
    usersWaiting: [],
    users: [],
  }

  componentDidMount = () => {
    this.getUsersWaiting();
    this.getUsers();
  }

  // PENDING REGISTRATIONS 

  getUsersWaiting = async () => {
    const response = await axios.get(`${API_HOST}/users/approve`);
    this.setState({ usersWaiting: response.data.result || [] });
  }

  displayUsersWaiting = () => {
    const usersWaiting = this.state.usersWaiting;

    // If on large screens, display a Table. If not, display Cards 
    if (isWidthUp('md', this.props.width)) {
      // Prepare table data
      const tableData = usersWaiting.map(user => {
        const { id, username, first_name, last_name } = user;
        return {
          id,
          pseudo: username,
          prenom: first_name,
          nom: last_name,
          approuver: (
            <IconButton 
              aria-label="Check"
              onClick={ () => this.checkUser(user) }>
              <Check />
            </IconButton>
          ),
          supprimer: (
            <IconButton 
              aria-label="Clear"
              onClick={ () => this.deleteUser(user) }>
              <Clear />
            </IconButton>
          )
        };
      })

      return (
        <div className={ styles.materialTable }>
          <MaterialTable 
            columns = { USERS_TABLE_COLUMNS_WAITING }
            data = { tableData }
            options={{
              toolbar: false,
              paging: false,
            }}
            localization={{
              body: {
              emptyDataSourceMessage: 'Aucun utilisateur en attente',
              },
            }}
          />
        </div>
      ) 
    } else {
      const userCards = usersWaiting.map(user => {
        const { id, username, first_name, last_name} = user;

        return (
          <Fragment key={ id }>
            <Card>
              <CardContent>
                <Typography>Pseudo : { username }</Typography>
                <Typography>Prénom : { first_name }</Typography>
                <Typography>Nom : { last_name }</Typography> 
                <IconButton aria-label="Check">
                  <Check />
                </IconButton>
                <IconButton 
                  aria-label="Clear" 
                  onClick={ () => this.deleteUser(user) }>
                  <Clear />
                </IconButton>
              </CardContent>
            </Card>
          </Fragment>
        ) 
      })
      return (
        <Fragment>
          { userCards }
        </Fragment>
      )
    }
  }

  checkUser = async (user) => {
    await axios.put(`${API_HOST}/users/check/${user.id}`);
    this.getUsersWaiting();
    this.displayUsersWaiting();
  }

  // ALL USERS

  getUsers = async () => {
    const response = await axios.get(`${API_HOST}/users`);
    this.setState({ users: response.data.result || [] });
  }


  displayUsers = () => {
    const users = this.state.users;

    // If on large screens, display a Table. If not, display Cards 
    if (isWidthUp('md', this.props.width)) {
      // Prepare table data
      const tableData = users.map(user => {
        const { id, username, first_name, last_name } = user;
        return {
          id,
          pseudo: username,
          prenom: first_name,
          nom: last_name,
        };
      })

      return (
        <div className={ styles.materialTable }>
          <MaterialTable 
            columns = { USERS_TABLE_COLUMNS }
            data = { tableData }
            options={{
              toolbar: false,
              paging: false,
            }}
            localization={{
              body: {
              emptyDataSourceMessage: 'Aucun utilisateur',
              },
            }}
          />
        </div>
      ) 
    } else {
      const userCards = users.map(user => {
        const { id, username, first_name, last_name} = user;

        return (
          <Fragment key={id}>
            <Card>
              <CardContent>
                <Typography>Pseudo : { username }</Typography>
                <Typography>Prénom : { first_name }</Typography>
                <Typography>Nom : { last_name }</Typography> 
              </CardContent>
            </Card>
          </Fragment>
        ) 
      })
      return (
        <Fragment>
          { userCards }
        </Fragment>
      )
    }
  }

  deleteUser = async (user) => {
    await axios.delete(`${API_HOST}/users/${user.id}`)
    this.getUsersWaiting()
  }

  render () {
    return (
      <div className={ styles.container }>
        Inscriptions en attente : { this.displayUsersWaiting() }
        Utilisateurs : { this.displayUsers() }
      </div>       
    )
  }
}

export default withWidth()(Admin);