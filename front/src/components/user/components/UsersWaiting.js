import React, { Component, Fragment } from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import MaterialTable from 'material-table';
import { Card, CardContent, Typography } from '@material-ui/core';

// STYLE 
import styles from '../user.module.css';

// CONSTANTS
import { USERS_TABLE_COLUMNS_WAITING } from 'constants.js';

// COMPONENTS 
import ConfirmationMessage from './ConfirmationMessage';

class UsersWaiting extends Component {

  state = {
    deleteId: null,
  };

  handleDeleteClick = (id) => {
    this.setState({
      deleteId: id,
    });
    this.props.toggleConfirmationMessage();
  };

  render() {

    // If on large screens, display a Table. If not, display Cards 
    if (isWidthUp('md', this.props.width)) {
      // Prepare table data
      const tableData = this.props.usersWaiting.map(user => {
        const { id, username, first_name, last_name } = user;
        return {
          id,
          pseudo: username,
          prenom: first_name,
          nom: last_name,
          approuver: (
            <IconButton aria-label="Check" onClick={() => this.props.checkUser(id)}>
              <Check />
            </IconButton>
          ),
          supprimer: (
            <IconButton aria-label="Clear" onClick={() => this.handleDeleteClick(id) }>
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
          <ConfirmationMessage
            open={ this.props.isConfirmationMessageOpen }
            handleClose={ this.props.toggleConfirmationMessage }
            deleteUser={ this.props.deleteUser }
            deleteId={ this.state.deleteId }
          />     
        </div>
      ) 
    } else {
      const userCards = this.props.usersWaiting.map(user => {
        const { id, username, first_name, last_name} = user;
  
        return (
          <Fragment key={id}>
            <Card>
              <CardContent>
                <Typography>Pseudo : { username }</Typography>
                <Typography>Prénom : { first_name }</Typography>
                <Typography>Nom : { last_name }</Typography> 
                <IconButton aria-label="Check" onClick={() => this.props.checkUser(id)}>
                  <Check />
                </IconButton>
                <IconButton aria-label="Clear" onClick={() => this.handleDeleteClick(id) }>
                  <Clear />
                </IconButton>
              </CardContent>
            </Card>
          </Fragment>
        ) 
      })
      return (
        <div>
          <Fragment>
            { userCards }
          </Fragment>
          <ConfirmationMessage
            open={ this.props.isConfirmationMessageOpen }
            handleClose={ this.props.toggleConfirmationMessage }
            usersWaiting={ this.props.usersWaiting }
            deleteUser={ this.props.deleteUser }
            deleteId={ this.state.deleteId } 
          />     
        </div>
  
      )
    }
  }
 
}

export default withWidth()(UsersWaiting);