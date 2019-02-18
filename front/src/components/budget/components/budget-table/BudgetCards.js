import React, { Component, Fragment } from 'react';
import Pagination from "material-ui-flat-pagination";

// COMPONENTS
import BudgetCard from './BudgetCard';

// STYLES
import styles from './budgetTable.module.css';

class BudgetCards extends Component {
  state = {
    offset: 0,
    limit: 5,
  }

  handleClick(offset) {
    this.setState({ offset });
  }

  operationsList = () => {
    const start = this.state.offset;
    const end = (this.state.offset / this.state.limit + 1 ) * this.state.limit;
    return this.props.operations.slice(start, end);
  }

  render() {
    const operations = this.operationsList();

    return (
      <Fragment>
        <div className={ styles.balanceText }>
          Solde total : <span>{ this.props.balance }€</span>
        </div>
        {operations.map((operation) => {
          return (
            <BudgetCard 
              key={ operation.id } 
              operation={ operation } 
              deleteOperation={ this.props.deleteOperation } 
              showModal={ this.props.showModal } 
            />);
          })
        }
        <Pagination 
          align= "center"
          limit={ this.state.limit }
          offset={ this.state.offset }
          total={ this.props.operations.length }
          onClick={ (e, offset) => this.handleClick(offset) }
        />
      </Fragment>
    )
  }
}

export default BudgetCards;