import React, { Fragment } from 'react';

// COMPONENTS
import BudgetCard from 'components/budget/budget-table/BudgetCard';

// STYLES
import styles from './budgetcards.module.css';

const BudgetCards = (props) => {
 return (
   <Fragment>
      <div className={ styles.balanceText }>
        Solde total : <span>{ props.balance }€</span>
      </div>
      {props.operations.map(operation => <BudgetCard key={operation.id} operation={operation} deleteOperation={props.deleteOperation} />)}
   </Fragment>
 )
}

export default BudgetCards;