import React, { Component, Fragment } from 'react';
import axios from 'axios';
import intersection from 'lodash/intersection';
import MaterialTable from 'material-table';
import { Card, CardContent, IconButton, Button, Typography, TextField, Switch, MenuItem } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Clear from '@material-ui/icons/Clear';

// STYLE 
import styles from './budgettable.module.css';

// CONSTANTS
import { API_HOST, BUDGET_TABLE_COLUMNS } from '../../../constants';

// COMPONENTS
import ManageCategory from '../manage-category/ManageCategory'
import AddRow from '../add-row/AddRow';


class BudgetTable extends Component {
  state = {
    // Operations
    operations: [],
    filteredDateOperations: [],
    filteredCategoryOperations: [],
    // Add row dialog 
    isAddRowOpen: false,
    // Manage category dialog
    isManageCategoryOpen: false,
    // Filter the table by date
    date_budget_start: '',
    date_budget_end: '',
    isFilterByDate: false, 
    // Filter the table by category
    category: '',
    isFilterByCategory: false,
    categoriesOperations: [],
  }

  componentDidMount = () => {
    this.getCategories();
    this.getOperations();
  }

  getOperations = async () => {
    const response = await axios.get(`${API_HOST}/budget`);
    this.setState({ operations: response.data.result || [] });
  }

  getOperationsList = () => {
    const { operations, isFilterByDate, isFilterByCategory, filteredDateOperations, filteredCategoryOperations } = this.state;

    if (isFilterByCategory && isFilterByDate) {
      return intersection(filteredCategoryOperations, filteredDateOperations);
    }

    if (isFilterByCategory) {
      return filteredCategoryOperations;
    }

    if (isFilterByDate) {
      return filteredDateOperations;
    }

    return operations;
  }

  displayOperations = () => {
    const operations = this.getOperationsList();

    // If on large screens, display a Table. If not, display Cards 
    if (isWidthUp('md', this.props.width)) {
      // Prepare table data
      const tableData = operations.map(operation => {
        const { id, date_budget, name, mode, name_category, reason, type, amount } = operation;
        return { 
          id,
          date_budget, 
          nom: name,
          mode,
          category: name_category || '',
          motif: reason,
          recette: type === "Recette" ? amount : "",
          depense: type === "Depense" ? amount : "", 
        };
      })

      return (
        <MaterialTable
          columns={ BUDGET_TABLE_COLUMNS }
          data={ tableData }
          title={ `Solde: ${this.calculateBalance()}€` }
          actions={[
            {
              icon: 'delete',
              tooltip: 'Supprimer',
              onClick: (event, rows) => {
                this.deleteOperations(rows);
              },
            },
          ]}
          options={ { selection: true } }
        />
      )
    } else {
      // Generate a Card for each operation
      const operationsCards = operations.map(operation => {
        const { id, date_budget, name, mode, name_category, reason, type, amount } = operation;
        let operationType;

        if (type === 'Recette') {
          operationType = <Typography>Recette : { amount }€</Typography>
        } else {
          operationType = <Typography>Dépense : { amount }€</Typography>
        }
  
        return (
          <Fragment key={ id }>
            <Card className={ styles.card }>
              <CardContent className={ styles.cardContent } >
                <IconButton aria-label='Clear' className={ styles.clearButton } onClick={ () => this.deleteOperation(operation) } >  
                  <Clear />
                </IconButton>
                <Typography>Date : { date_budget }</Typography>
                <Typography>Nom : { name }</Typography>
                <Typography>Mode : { mode }</Typography>
                <Typography>Categorie : { name_category }</Typography>
                <Typography>Motif : { reason }</Typography>
                { operationType } 
              </CardContent>
            </Card> 
          </Fragment>
        ) 
      })
      return (
        <Fragment>
          <div>Solde: { this.calculateBalance() }€</div>
          { operationsCards }
        </Fragment>
      )
    }   
  }

  calculateBalance = () => {
    let solde = 0;
    this.state.operations.forEach(element => {
      if (element.type === 'Recette') {
        solde += Number(element.amount);   
      } else {
        solde -= Number(element.amount);
      }
    });
    return solde;
  }

  deleteOperations = async (operations) => {
    const operationsIds = operations.map(operation => operation.id);
    const promises = [];
    operationsIds.map((operationId) => {
      return promises.push(axios.delete(`${API_HOST}/budget/${operationId}`));
    }); 
    await Promise.all(promises);
    this.getOperations();
  }

  deleteOperation = async (budget) => {
    await axios.delete(`${API_HOST}/budget/${budget.id}`);
    this.getOperations();
  }

  // Handle Dialog for add row to the budget
  toggleAddRow = () => {
    this.setState(state => ({ isAddRowOpen: !state.isAddRowOpen }));
  }

  // Handle Dialog for manager category 
  handleManageCategoryClick = async () => {
    await this.getCategories();
    this.setState({ isManageCategoryOpen: true });
  }

  handleManageCategoryClose = async () => {
    await this.getOperations();
    this.setState( { isManageCategoryOpen: false })
  }

  // Filter by date
  handleChangeStartDate = async (date_budget_start) => {
    await this.setState({ date_budget_start })
    this.filterByDate();
  }

  handleChangeEndDate = async (date_budget_end) => {
    await this.setState({ date_budget_end })
    this.filterByDate();
  }

  toggleFilterByDate = () => {
    this.setState((state) => ({ isFilterByDate: !state.isFilterByDate }));
  }

  filterByDate = () => {
    const list = [];
    this.state.operations.forEach(element => {
      if (element.date_budget >= this.state.date_budget_start && element.date_budget <= this.state.date_budget_end) {
        list.push(element);
      } 
    })
    this.setState({ filteredDateOperations: list })
  }

  filterByDateText = () => {
    if (this.state.isFilterByDate) {
      return (
        <Fragment>           
          <p>Voir tout le tableau</p>
          <div className={styles.filterByDate}>          
            <p className={styles.dateIntervalText}>Du</p>
            <TextField  variant='outlined' type='date' value={ this.state.date_budget_start } onChange={ e => this.handleChangeStartDate(e.target.value) }/>   
            <p className={styles.dateIntervalText} >Au</p>
            <TextField variant='outlined' type='date' value={ this.state.date_budget_end } onChange={ e => this.handleChangeEndDate(e.target.value) }/>  
          </div>

        </Fragment>
      )
    } else {
      return <p>Filtrer par date</p>
    }
  }

  // Filter by category
  getCategories = async () => {
    const response = await axios.get(`${API_HOST}/category`);
    this.setState({ categoriesOperations: response.data.result || [] });
  }

  displayCategory = () => {
    return this.state.categoriesOperations.map((categoryOperation) => {
      return <MenuItem key={categoryOperation.id} value={categoryOperation}>{categoryOperation.name_category}</MenuItem>
    });
  }

  handleCategoryChange = async (category) => {
    await this.setState({ category });
    this.filterByCategory();
  }

  toggleFilterByCategory = () => {
    this.setState((state => ({ isFilterByCategory: !state.isFilterByCategory })));
  }

  filterByCategory = () => {
    const list = [];
    this.state.operations.forEach(element => {
      if (element.category === this.state.category.id) {
        list.push(element);
      }
    })
    this.setState({ filteredCategoryOperations: list });
  }

  filterByCategoryText = () => {
    if (this.state.isFilterByCategory) {
      return (
        <TextField select variant="outlined" label="Catégorie :" value={ this.state.category } onChange={ e => this.handleCategoryChange(e.target.value) }>
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
          <Switch value={ this.state.isFilterByDate } color="secondary" onChange={ this.toggleFilterByDate } />
          { this.filterByDateText() }
          <Switch value={ this.state.isFilterByCategory } color="secondary" onChange={ this.toggleFilterByCategory } />
          { this.filterByCategoryText() }
        </div>
        <Button color="secondary" onClick={ this.handleManageCategoryClick }>Gérer les catégories</Button>
        <ManageCategory 
          open={ this.state.isManageCategoryOpen }
          handleClose={ this.handleManageCategoryClose }
          getCategories={ this.getCategories }
          categoriesOperations={ this.state.categoriesOperations }
        />

        <div>{ this.displayOperations() }</div>
        
        <Button variant="outlined" color="secondary" onClick={ this.toggleAddRow }>Ajouter</Button>
        
        <AddRow 
          open={ this.state.isAddRowOpen }
          handleClose={ this.toggleAddRow }
          getOperations={ this.getOperations }
          categoriesOperations={ this.state.categoriesOperations }
          getCategories={ this.getCategories }
          displayCategory={ this.displayCategory }
        />

      </div>
    )}

}

export default withWidth()(BudgetTable);