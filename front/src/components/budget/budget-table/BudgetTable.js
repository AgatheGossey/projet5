import React, { Component } from 'react';
import axios from 'axios';

// STYLE 
import styles from './budgettable.module.css';

// COMPONENTS
import AddRow from '../add-row/AddRow';
import Button from '@material-ui/core/Button';
// Table 
import MaterialTable from 'material-table'
// Filter 
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

class BudgetTable extends Component {

  state = {
    // Operations
    operations: [],
    filteredOperations: [],
    // Add row dialog 
    isAddRowOpen: false,
    // Filter the table
    date_budget_start: "",
    date_budget_end: "",
    isFilterByDate: false, 
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
    const operations = this.state.isFilterByDate ?  this.state.filteredOperations : this.state.operations;
    return operations.map(operation => {
      return { 
        id: operation.id,
        date_budget: operation.date_budget, 
        nom: operation.name,
        mode: operation.mode,
        category: operation.category,
        motif: operation.reason,
        recette: operation.type === "Recette" ? operation.amount : "",
        depense: operation.type === "Depense" ? operation.amount : "", 
      };
    })
  }

  componentDidMount = () => {
    this.getOperations();
  }

  filterByDate = () => {
    const list = [];
    this.state.operations.forEach(element => {
      if (element.date_budget >= this.state.date_budget_start && element.date_budget <= this.state.date_budget_end) {
        list.push(element);
      } 
    })

    this.setState({
      filteredOperations: list,
    })
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

// Handle state set to select dates to make a filter

  handleChangeStartDate = (date_budget_start) => {
    this.setState({
      date_budget_start: date_budget_start,
    })
    this.filterByDate();
  }

  handleChangeEndDate = (date_budget_end) => {
    this.setState({
      date_budget_end: date_budget_end,
    })
    this.filterByDate();
  }

  // Filter 
  toggleFilterByDate = () => {
    this.setState({
      isFilterByDate: !this.state.isFilterByDate,
    })
  }

  filterText = () => {
    if (this.state.isFilterByDate) {
      return (
        <div>
          <div>Voir tout le tableau</div>
          Du
          <TextField className={styles.textField} variant='outlined' type='date' value={this.state.date_budget_start} onChange={e => this.handleChangeStartDate(e.target.value)}/>   
          Au
          <TextField className={styles.textField} variant='outlined' type='date' value={this.state.date_budget_end} onChange={e => this.handleChangeEndDate(e.target.value)}/>   
        </div>
      )
    } else {
      return <div>Filtrer par date</div>
    }
  }

  render() {
    return (
      <div className={styles.container}>
          <div>
            <Switch value={this.state.isFilterByDate} onChange={this.toggleFilterByDate} />
            {this.filterText()}
          </div>

        <MaterialTable
          columns={[
            { title: 'id', field: 'id', hidden: true},
            { title: 'Date', field: 'date_budget', type: 'numeric'},
            { title: 'Nom', field: 'nom'},
            { title: 'Mode', field: 'mode'},
            { title: 'Catégorie', field: 'categorie'},
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
      
        <Button variant="outlined" color="primary" onClick={this.handleAddRowClick}>
          Ajouter
        </Button>
        <AddRow open={this.state.isAddRowOpen} handleClose={this.handleAddRowClose} getOperations={this.getOperations} />
    
  </div>

    )}

}

export default BudgetTable;