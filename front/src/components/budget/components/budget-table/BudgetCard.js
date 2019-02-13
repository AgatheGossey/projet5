import React, { Fragment } from 'react';
import moment from 'moment';
import { Card, CardContent, IconButton, Typography } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';

// STYLES
import styles from './budgetcard.module.css';

const BudgetCard = (props) => {
  const { id, date_budget, name, mode, name_category, reason, type, amount } = props.operation;

  return (
    <Fragment key={ id }>
      <Card className={ styles.card }>
        <CardContent className={ styles.cardContent } >
          <IconButton aria-label='Clear' className={ styles.clearButton } onClick={ () => props.deleteOperation(id) } >  
            <Clear />
          </IconButton>
          <Typography>Date : { moment(date_budget).format('DD/MM/YYYY') }</Typography>
          <Typography>Nom : { name }</Typography>
          <Typography>Mode : { mode }</Typography>
          <Typography>Categorie : { name_category }</Typography>
          <Typography>Détails : { reason }</Typography>
          <Typography>{type === 'Recette' ? 'Recette' : 'Dépense'}: { amount }€</Typography>
        </CardContent>
      </Card> 
    </Fragment>
  )
}

export default BudgetCard;