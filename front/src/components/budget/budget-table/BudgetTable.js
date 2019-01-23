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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class BudgetTable extends Component {

  state = {
    // Operations
    operations: [],
    // Add row dialog 
    isAddRowOpen: false,
    // Filter the table
    date_budget_start:'',
    date_budget_end: '',
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
    return this.state.operations.map(operation => {
      return { 
        id: operation.id,
        date_budget: operation.date_budget, 
        nom: operation.name,
        mode: operation.mode,
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
    this.state.operations.forEach(element => {
      if (element.date_budget >= this.state.date_budget_start && element.date_budget <= this.state.date_budget_end) {
        var getOperationsFilter = element;
        console.log(getOperationsFilter);
      } 
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
  }

  handleChangeEndDate = (date_budget_end) => {
    this.setState({
      date_budget_end: date_budget_end,
    })
  }

  // Filter 

  handleFilterByDateActive = () => {
    this.setState({isFilterByDate: true});
  }

  handleFilterByDateDeactivate = () => {
    this.setState({isFilterByDate: false});
  }

  render() {

    let button;

    if (this.state.isFilterByDate) {
      button = <NoFilterByDateButton onClick={this.handleFilterByDateDeactivate} />;
    } else {
      button = <FilterByDateButton onClick={this.handleFilterByDateActive} />;
    }
    return (

      <div className={styles.container}>

          Du
          <TextField className={styles.textField} variant='outlined' type='date' value={this.state.date_budget_start} onChange={e => this.handleChangeStartDate(e.target.value)}/>   
          Au
          <TextField className={styles.textField} variant='outlined' type='date' value={this.state.date_budget_end} onChange={e => this.handleChangeEndDate(e.target.value)}/>   
          <Button variant="outlined" color="primary" onClick={this.filterByDate()}>
            Ajouter
          </Button>

          <div>
            <FilterStatus isFilterByDate={this.state.isFilterByDate} />
            {button}
          </div>

        <MaterialTable
          columns={[
            { title: 'id', field: 'id', hidden: true},
            { title: 'Date', field: 'date_budget', type: 'numeric'},
            { title: 'Nom', field: 'nom'},
            { title: 'Mode', field: 'mode'},
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

function FilterActivate(props) {
  return <h1>Filtre activé</h1>
}

function FilterDesactivate(props) {
  return <h1>Filtre désactivé</h1>
}

function FilterStatus(props) {
  const isFilterByDate = props.isFilterByDate;
  if (isFilterByDate) {
    return <FilterActivate />;
  } 
  return <FilterDesactivate />;
}

function FilterByDateButton(props) {
  return (
    <FormControlLabel control={<Switch value="checkedC" />} label="Filtrer par date" />
  );
}

function NoFilterByDateButton(props) {
  return (
    <FormControlLabel control={<Switch value="checkedC" />} label="Voir tout le tableau" />
  )
}

export default BudgetTable;