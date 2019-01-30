import React, { Component, Fragment } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Card, CardContent, Typography } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';

// STYLE 
import styles from './admin.module.css';

// CONSTANTS
import { API_HOST, ADMIN_TABLE_COLUMNS } from '../../constants';

class Admin extends Component {
  state = {
    users: [],
  }

  componentDidMount = () => {
    this.getUsers();
  }

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
          approuver: (
            <IconButton aria-label="Check" onClick={() => this.checkUser(user)}>
              <Check />
            </IconButton>
          ),
          supprimer: (
            <IconButton aria-label="Clear" onClick={() => this.deleteUser(user)}>
              <Clear />
            </IconButton>
          )
        };
      })

      return (
        <div className={ styles.materialTable }>
          <MaterialTable 
            columns = { ADMIN_TABLE_COLUMNS }
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
      const userCards = users.map(user => {
        const { id, username, first_name, last_name} = user;

        return (
          <Fragment key={id}>
            <Card>
              <CardContent>
                <Typography>Pseudo : { username }</Typography>
                <Typography>Prénom : { first_name }</Typography>
                <Typography>Nom : { last_name }</Typography> 
                <IconButton aria-label="Check">
                  <Check />
                </IconButton>
                <IconButton aria-label="Clear" onClick={() => this.deleteUser(user)}>
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
    this.getUsers();
    this.displayUsers();
  }

  deleteUser = async (user) => {
    await axios.delete(`${API_HOST}/users/${user.id}`)
    this.getUsers()
  }

  render () {
    return (
      <div className={styles.container}>
        Inscriptions en attente : { this.displayUsers() }
      </div>       
    )
  }
}

export default withWidth()(Admin);