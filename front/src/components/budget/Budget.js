import React, { Component, Fragment } from 'react';
import moment from 'moment';
import intersection from 'lodash/intersection';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {Button, TextField, Switch, MenuItem } from '@material-ui/core';

// COMPONENTS
import BudgetTable from './components/budget-table/BudgetTable';
import BudgetCards from './components/budget-table/BudgetCards';
import ManageCategory from './components/manage-category/ManageCategory';
import AddRow from './components/add-row/AddRow';

// STYLE 
import styles from './budget.module.css';

class Budget extends Component {
  state = {
    // Operations
    filteredDateOperations: [],
    filteredCategoryOperations: [],
    // Add row dialog 
    // Filter the table by date
    date_budget_start: moment(),
    date_budget_end: moment(),
    // Filter the table by category
    category: '',
  }

  componentDidMount = () => {
    this.props.getCategories();
    this.props.getOperations();
  }

  getOperationsList = () => {
    const { filteredDateOperations, filteredCategoryOperations } = this.state;

    if (this.props.isFilterByCategory && this.props.isFilterByDate) {
      return intersection(filteredCategoryOperations, filteredDateOperations);
    }

    if (this.props.isFilterByCategory) {
      return filteredCategoryOperations;
    }

    if (this.props.isFilterByDate) {
      return filteredDateOperations;
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

  // Filter by date
  handleChangeStartDate = async (date_budget_start) => {
    const date = moment(date_budget_start);
    await this.setState({ date_budget_start: date });
    this.filterByDate();
  }

  handleChangeEndDate = async (date_budget_end) => {
    const date = moment(date_budget_end);
    await this.setState({ date_budget_end: date });
    this.filterByDate();
  }

  filterByDate = () => {
    const list = [];
    this.props.operations.forEach(element => {
      if (moment(element.date_budget).isBetween(this.state.date_budget_start, this.state.date_budget_end)) {
        list.push(element);
      } 
    })
    this.setState({ filteredDateOperations: list })
  }

  filterByDateText = () => {
    if (this.props.isFilterByDate) {
      return (
        <Fragment>    
          <p>Voir tout le tableau</p>
          <div className={styles.filterByDate}>          
            <p className={styles.dateIntervalText}>Du</p>
            <TextField  
              variant='outlined'
              type='date' 
              value={ this.state.date_budget_start.format('YYYY-MM-DD') }
              onChange={ e => this.handleChangeStartDate(e.target.value) }
            />   
            <p className={styles.dateIntervalText} >Au</p>
            <TextField 
              variant='outlined'
              type='date'
              value={ this.state.date_budget_end.format('YYYY-MM-DD') }
              onChange={ e => this.handleChangeEndDate(e.target.value) }
            />  
          </div>
        </Fragment>
      )
    } else {
      return <p>Filtrer par date</p>
    }
  }

  // Filter by category
  displayCategory = () => {
    return this.props.categories.map((categoryOperation) => {
      return <MenuItem key={ categoryOperation.id } value={ categoryOperation }>{ categoryOperation.name_category }</MenuItem>
    });
  }

  handleCategoryChange = async (category) => {
    await this.setState({ category });
    this.filterByCategory();
  }

  filterByCategory = () => {
    const list = [];
    this.props.operations.forEach(element => {
      if (element.category === this.state.category.id) {
        list.push(element);
      }
    })
    this.setState({ filteredCategoryOperations: list });
  }

  filterByCategoryText = () => {
    if (this.props.isFilterByCategory) {
      return (
        <TextField 
          className={ styles.textFieldCategory }
          select variant="outlined"
          label="Catégorie :"
          value={ this.state.category }
          onChange={ e => this.handleCategoryChange(e.target.value) }>
          { this.displayCategory() }              
        </TextField>
      )
    } else {
      return <p>Filtrer par catégorie</p>
    }
  }

  render() {
    return (
      <div className={ styles.container }>

        <div className={styles.switch}>
          <Switch 
            value={ this.props.isFilterByDate }
            color="secondary"
            onChange={ this.props.toggleFilterByDate }
          />
          { this.filterByDateText() }

          <Switch
            className={ styles.switchCategory }
            value={ this.props.isFilterByCategory }
            color="secondary"
            onChange={ this.props.toggleFilterByCategory }
          />
          { this.filterByCategoryText() }
        </div>

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

        <Button 
          variant="contained"
          color="secondary"
          onClick={ this.props.toggleAddRow }
        >
          Ajouter
        </Button>

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