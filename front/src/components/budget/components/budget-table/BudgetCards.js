import React, { Fragment } from 'react';

// COMPONENTS
import BudgetCard from './BudgetCard';

// STYLES
import styles from './budgetcards.module.css';

const BudgetCards = (props) => {
 return (
   <Fragment>
      <div className={ styles.balanceText }>
        Solde total : <span>{ props.balance }€</span>
      </div>
      {props.operations.map(operation => <BudgetCard key={operation.id} operation={operation} deleteOperation={props.deleteOperation} showModal={props.showModal} hideModal={props.hideModal} />)}
   </Fragment>
 )
}

export default BudgetCards;