import React, { Component } from 'react';
import axios from 'axios';

// STYLE 
import styles from './budgettable.module.css';

// COMPONENTS
import ManageCategory from '../manage-category/ManageCategory'
import AddRow from '../add-row/AddRow';
import Button from '@material-ui/core/Button';
// Table 
import MaterialTable from 'material-table'
// Filter 
import { Typography, TextField, Switch} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';


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

  getOperations = () => {
    axios.get('http://localhost/my_manager/api/budget')
      .then(response => {
        this.setState({
          operations: response.data.result || [],
        });
      })
    
  }

  displayOperations = () => {
    let operations = [];
    if (this.state.isFilterByDate) {
      operations = this.state.filteredDateOperations
    } else if (this.state.isFilterByCategory) {
      operations = this.state.filteredCategoryOperations
    } else {
      operations = this.state.operations
    }

    return operations.map(operation => {
      return { 
        id: operation.id,
        date_budget: operation.date_budget, 
        nom: operation.name,
        mode: operation.mode,
        category: operation.name_category || '',
        motif: operation.reason,
        recette: operation.type === "Recette" ? operation.amount : "",
        depense: operation.type === "Depense" ? operation.amount : "", 
      };
    })
  }

  componentDidMount = () => {
    this.getOperations();
    this.getCategories();
  }

  calculateBalance = () => {
    let solde = 0;
    this.state.operations.forEach(element => {
    if (element.type === "Recette") {
      solde = solde + Number(element.amount);   
    } else {
      solde = solde - Number(element.amount);
    }
    });
    return `Solde disponible : ${solde}€`;
  }

  deleteOperations = async (operations) => {
    const operationsIds = operations.map(operation => operation.id);
    const promises = [];
    operationsIds.map((operationId) => {
      return promises.push(axios.delete(`http://localhost/my_manager/api/budget/${operationId}`));
    }); 
    await Promise.all(promises);
    this.getOperations();
  }

// Handle Dialog for add row to the budget

  handleAddRowClick = () => {
    this.setState({ isAddRowOpen: true });
  }

  handleAddRowClose = () => {
    this.setState({ isAddRowOpen: false });
  }

// Handle Dialog for manager category 

  handleManageCategoryClick = () => {
    this.setState({ isManageCategoryOpen: true });
  }

  handleManageCategoryClose = () => {
    this.setState( { isManageCategoryOpen: false })
  }

  // Filter by date

  handleChangeStartDate = async (date_budget_start) => {
    await this.setState({
      date_budget_start: date_budget_start,
    })
    this.filterByDate();
  }

  handleChangeEndDate = async (date_budget_end) => {
    await this.setState({
      date_budget_end: date_budget_end,
    })
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
    this.setState({
      filteredDateOperations: list,
    })
  }

  filterByDateText = () => {
    if (this.state.isFilterByDate) {
      return (
        <div>
          <Typography>Voir tout le tableau</Typography>
          <Typography>Du</Typography>
          <TextField className={styles.textField} variant='outlined' type='date' value={this.state.date_budget_start} onChange={e => this.handleChangeStartDate(e.target.value)}/>   
          <Typography>Au</Typography>
          <TextField className={styles.textField} variant='outlined' type='date' value={this.state.date_budget_end} onChange={e => this.handleChangeEndDate(e.target.value)}/>   
        </div>
      )
    } else {
      return <Typography>Filtrer par date</Typography>
    }
  }

  // Filter by category

  getCategories = () => {
    axios.get('http://localhost/my_manager/api/category')
    .then(response => {
      this.setState({
        categoriesOperations: response.data.result || [],
      });
    })
  }

  displayCategory = () => {
    return this.state.categoriesOperations.map((categoryOperation) => 
      (<MenuItem key={categoryOperation.id} value={categoryOperation}>{categoryOperation.name_category}</MenuItem>) );
  }

  handleCategoryChange = async (category) => {
    await this.setState({
      category: category,
    })
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
    this.setState({
      filteredCategoryOperations: list,
    })
  }

  filterByCategoryText = () => {
    if (this.state.isFilterByCategory) {
      return (
        <div>
          <TextField select variant="outlined" label="Catégorie :" value={this.state.category} onChange={e => this.handleCategoryChange(e.target.value)}>
            {this.displayCategory()}              
          </TextField>
        </div>
      )
    } else {
      return <Typography>Filtrer par catégorie</Typography>
    }
  }

  render() {
    return (
      <div className={styles.container}>

        <div>
          <Switch value={this.state.isFilterByDate} color="secondary" onChange={this.toggleFilterByDate} />
          {this.filterByDateText()}
        </div>
        <div>
          <Switch value={this.state.isFilterByCategory} color="secondary" onChange={this.toggleFilterByCategory} />
          {this.filterByCategoryText()}
        </div>

        <div>
        <Button color="secondary" onClick={this.handleManageCategoryClick}>Gérer les catégories</Button>
        <ManageCategory open={this.state.isManageCategoryOpen} handleClose={this.handleManageCategoryClose} />
        </div>

        <MaterialTable
          columns={[
            { title: 'id', field: 'id', hidden: true},
            { title: 'Date', field: 'date_budget', type: 'numeric'},
            { title: 'Nom', field: 'nom'},
            { title: 'Mode', field: 'mode'},
            { title: 'Catégorie', field: 'category'},
            { title: 'Motif', field: 'motif'},
            { title: 'Recette', field: 'recette', type: 'numeric'},
            { title: 'Dépense', field: 'depense', type: 'numeric'},
          ]}
          data={this.displayOperations()}
          title={this.calculateBalance()}
          actions={[
            {
              icon: 'delete',
              tooltip: 'Supprimer',
              onClick: (event, rows) => {
                this.deleteOperations(rows);
              },
            },
          ]}
          options={{
            selection: true,
          }}
        />
      
        <Button variant="outlined" color="secondary" onClick={this.handleAddRowClick}>
          Ajouter
        </Button>
        <AddRow open={this.state.isAddRowOpen} handleClose={this.handleAddRowClose} getOperations={this.getOperations} getCategories={this.getCategories} displayCategory={this.displayCategory} />
    
  </div>

    )}

}

export default BudgetTable;