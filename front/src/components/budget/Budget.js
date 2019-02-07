import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import intersection from 'lodash/intersection';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {Button, Switch } from '@material-ui/core';

// COMPONENTS
import BudgetTable from './components/budget-table/BudgetTable';
import BudgetCards from './components/budget-table/BudgetCards';
import ManageCategory from './components/manage-category/ManageCategory';
import FilterByDate from './components/filter/FilterByDate';
import FilterByCategory from './components/filter/FilterByCategory';
import AddRow from './components/add-row/AddRow';

// STYLE 
import styles from './budget.module.css';

class Budget extends Component {
  state = {
    filteredDateOperations: [],

    // date_budget_start: moment(),
    // date_budget_end: moment(),
  }

  componentDidMount = () => {
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

  
  // handleChangeStartDate = async (date_budget_start) => {
  //   const date = moment(date_budget_start);
  //   await this.setState({ date_budget_start: date });
  //   this.filterByDate();
  // }

  // handleChangeEndDate = async (date_budget_end) => {
  //   const date = moment(date_budget_end);
  //   await this.setState({ date_budget_end: date });
  //   this.filterByDate();
  // }

  // filterByDate = () => {
  //   const list = [];
  //   this.props.operations.forEach(element => {
  //     if (moment(element.date_budget).isBetween(this.state.date_budget_start, this.state.date_budget_end)) {
  //       list.push(element);
  //     } 
  //   })
  //   this.setState({ filteredDateOperations: list })
  // }

  // filterByDateText = () => {
  //   if (this.props.isFilterByDate) {
  //     return (
  //       <Fragment>    
  //         <p>Voir tout le tableau</p>
  //         <div className={styles.filterByDate}>          
  //           <p className={styles.dateIntervalText}>Du</p>
  //           <TextField  
  //             variant='outlined'
  //             type='date' 
  //             value={ this.state.date_budget_start.format('YYYY-MM-DD') }
  //             onChange={ e => this.handleChangeStartDate(e.target.value) }
  //           />   
  //           <p className={styles.dateIntervalText} >Au</p>
  //           <TextField 
  //             variant='outlined'
  //             type='date'
  //             value={ this.state.date_budget_end.format('YYYY-MM-DD') }
  //             onChange={ e => this.handleChangeEndDate(e.target.value) }
  //           />  
  //         </div>
  //       </Fragment>
  //     )
  //   } else {
  //     return <p>Filtrer par date</p>
  //   }
  // }

  render() {
    return (
      <div className={ styles.container }>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={styles.filter}>
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
            isFilterByCategory={this.props.isFilterByCategory} 
            selectedCategory={this.props.selectedCategory} 
            handleSelectedCategoryChange={this.props.handleSelectedCategoryChange}
            operations={this.props.operations}
            categories={this.props.categories}
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
          handleClose={ this.props.closeManageCategories }
          getCategories={ this.props.getCategories }
          categories={ this.props.categories }
        />
        <div>
          {this.displayOperations()}
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
          categoriesOperations={ this.state.categoriesOperations }
          getCategories={ this.props.getCategories }
          displayCategory={ this.displayCategory }
        />
      </div>
    )
  }
}

export default  withWidth()(Budget);