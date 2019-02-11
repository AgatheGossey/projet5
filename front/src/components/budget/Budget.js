import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import intersection from 'lodash/intersection';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {Button, Switch } from '@material-ui/core';

// COMPONENTS
import BudgetTable from './components/budget-table/BudgetTable';
import BudgetCards from './components/budget-table/BudgetCards';
import ManageCategory from './components/category/ManageCategory';
import FilterByDate from './components/filter/FilterByDate';
import FilterByCategory from './components/filter/FilterByCategory';
import AddRow from './components/add-row/AddRow';
import Snackbar from './components/snackbar/UsersWaitingNotification';

// STYLE 
import styles from './budget.module.css';

class Budget extends Component {
  componentDidMount = () => {
    this.props.getUsersWaiting();
    this.props.getCategories();
    this.props.getOperations();
  }

  getOperationsList = () => {
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
      return <BudgetTable operations={operations} balance={this.calculateBalance()} deleteOperations={this.props.deleteOperations} />
    } else {
      return <BudgetCards operations={operations} balance={this.calculateBalance()} deleteOperation={this.props.deleteOperation} />
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
            className={ styles.switchCategory }
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
          onClick={ this.props.openManageCategories }
        >
          Gérer les catégories
        </Button>

        <ManageCategory 
          open={ this.props.isManageCategoryOpen }
          isAddCategoryOpen={ this.props.isAddCategoryOpen }
          toggleAddCategory={ this.props.toggleAddCategory }
          handleClose={ this.props.closeManageCategories }
          getCategories={ this.props.getCategories }
          deleteCategory={this.props.deleteCategory}
          categories={ this.props.categories }
        />

        <div>
          { this.displayOperations() }
        </div>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={ styles.button }
          >

        <Button 
          size="large"
          variant="contained"
          color="secondary"
          onClick={ this.props.toggleAddRow }
        >
          Ajouter
        </Button>

        </Grid>

        <AddRow 
          open={ this.props.isAddRow }
          handleClose={ this.props.toggleAddRow }
          getOperations={ this.props.getOperations }
          categories={ this.props.categories }
          displayCategory={ this.displayCategory }
          getCategories={ this.props.getCategories }
        /> 

        <Snackbar 
          open= { this.props.isSnackbarOpen }
          handleClose= { this.props.closeSnackbar }
          openSnackbar= { this.props.openSnackbar }
        />

      </div>
    )
  }
}

export default  withWidth()(Budget);