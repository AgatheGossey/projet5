import React, { Component, Fragment } from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import MaterialTable from 'material-table';
import { Card, CardContent, Typography } from '@material-ui/core';

// STYLE 
import styles from '../user.module.css';

// CONSTANTS
import { USERS_TABLE_COLUMNS } from 'constants.js';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';

class Users extends Component {
  render () {

  // If on large screens, display a Table. If not, display Cards 
    if (isWidthUp('md', this.props.width)) {
      // Prepare table data
      const tableData = this.props.users.map(user => {
        const { id, username, first_name, last_name } = user;
        return {
          id,
          pseudo: username,
          prenom: first_name,
          nom: last_name,
          supprimer: (
            <IconButton aria-label="Clear" onClick={() => this.props.showModal('CONFIRMATION', { action: () => this.props.deleteUser(id) }) }>
              <Clear />
            </IconButton>
          )
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
      const userCards = this.props.users.map(user => {
        const { id, username, first_name, last_name} = user;

        return (
          <Fragment key={id}>
            <Card>
              <CardContent>
                <Typography>Pseudo : { username }</Typography>
                <Typography>Prénom : { first_name }</Typography>
                <Typography>Nom : { last_name }</Typography> 
                <IconButton aria-label="Clear" onClick={() => this.props.showModal('CONFIRMATION', { action: () => this.props.deleteUser(id) }) }>
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
        </div>   
      )
    }  
  }
    
}

export default withWidth()(Users);