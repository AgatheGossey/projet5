import React, { Fragment } from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import MaterialTable from 'material-table';
import { Card, CardContent, Typography } from '@material-ui/core';

// STYLE 
import styles from '../user.module.css';

// CONSTANTS
import { USERS_TABLE_COLUMNS } from 'constants.js';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';

const Users = (props) => {
  const users = props.users;

    // If on large screens, display a Table. If not, display Cards 
    if (isWidthUp('md', props.width)) {
      // Prepare table data
      const tableData = users.map(user => {
        const { id, username, first_name, last_name } = user;
        return {
          id,
          pseudo: username,
          prenom: first_name,
          nom: last_name,
          supprimer: (
            <IconButton aria-label="Clear" onClick={() => props.deleteUser(id)}>
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

export default withWidth()(Users);