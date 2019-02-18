import React, { Component } from 'react';
import intersection from 'lodash/intersection';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Button, Switch, Grid } from '@material-ui/core';

// COMPONENTS
import BudgetTable from './components/budget-table/BudgetTable';
import BudgetCards from './components/budget-table/BudgetCards';
import FilterByDate from './components/filter/FilterByDate';
import FilterByCategory from './components/filter/FilterByCategory';
import Snackbar from './components/snackbar/UsersWaitingNotification';

// STYLE 
import styles from './budget.module.css';

class Budget extends Component {
  componentDidMount = () => { // after all the elements of the page is rendered correctly, this method is called
    // If user is admin, get users waiting to show the snackbar
    if (this.props.userIsAdmin) {
      this.props.getUsersWaiting();
    }
    this.props.getCategories();
    this.props.getOperations();
  }

  getOperationsList = () => {
    // If we filter both by date and by category, return the intersection between both filtered list
    if (this.props.isFilterByCategory && this.props.isFilterByDate) {
      return intersection(this.props.operationsFilteredByCategory, this.props.operationsFilteredByDate);
    }
    if (this.props.isFilterByCategory) {
      return this.props.operationsFilteredByCategory;
    }
    if (this.props.isFilterByDate) {
      return this.props.operationsFilteredByDate;
    }
    return this.props.operations;
  }

  displayOperations = () => {
    const operations = this.getOperationsList();

    // If on large screens, display a Table. If not, display Cards 
    if (isWidthUp('md', this.props.width)) {
      return <BudgetTable 
        operations={operations} 
        balance={this.calculateBalance()} 
        deleteOperations={this.props.deleteOperations} 
        showModal={this.props.showModal} 
      />
    } else {
      return <BudgetCards 
        operations={operations} 
        balance={this.calculateBalance()} 
        deleteOperation={this.props.deleteOperation} 
        showModal={this.props.showModal} 
      />
    }   
  }

  calculateBalance = () => {
    let solde = 0;
    this.props.operations.forEach(element => {
      if (element.type === 'Recette') {
        solde += Number(element.amount);   
      } else {
        solde -= Number(element.amount);
      }
    });
    return solde;
  }

  render() {
    return (
      <div className={ styles.container }>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={ styles.filter }>

          <Switch 
            value={ this.props.isFilterByDate }
            color="secondary"
            onChange={ this.props.toggleFilterByDate }
          />

          <FilterByDate
            isFilterByDate={ this.props.isFilterByDate }
            selectedDateStart= { this.props.selectedDateStart }
            selectedDateEnd= { this.props.selectedDateEnd }
            handleChangeDate= { this.props.handleChangeDate }
            operations={ this.props.operations }
            />

          <Switch
            value={ this.props.isFilterByCategory }
            color="secondary"
            onChange={ this.props.toggleFilterByCategory }
          />

          <FilterByCategory 
            isFilterByCategory={ this.props.isFilterByCategory } 
            selectedCategory={ this.props.selectedCategory } 
            handleSelectedCategoryChange={ this.props.handleSelectedCategoryChange }
            operations={ this.props.operations }
            categories={ this.props.categories }
            />

        </Grid>

        <Button 
          className={ styles.buttonManageCategory }
          variant="outlined" 
          color="secondary"
          onClick={() => this.props.showModal('MANAGE_CATEGORIES')}
        >
          Gérer les catégories
        </Button>

        <div>
          { this.displayOperations() }
        </div>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={ styles.buttonAddOperation }
          >

        <Button 
          size="large"
          variant="contained"
          color="secondary"
          onClick={ () => this.props.showModal('ADD_OPERATION', { addOperation: this.props.addOperation, categories: this.props.categories, username: this.props.username }) }
        >
          Ajouter
        </Button>

        </Grid>

        { this.props.userIsAdmin ? 
        <Snackbar 
          open= { this.props.isSnackbarOpen }
          handleClose= { this.props.closeSnackbar }
          openSnackbar= { this.props.openSnackbar }
        />
        : null}
      </div>
    )
  }
}

export default withWidth()(Budget);