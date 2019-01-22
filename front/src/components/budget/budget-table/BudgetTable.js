import React, { Component } from 'react';
import axios from 'axios';

// STYLE 
import styles from './budgettable.module.css';

// COMPONENTS
import MaterialTable from 'material-table'
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import Button from '@material-ui/core/Button';
import AddRow from '../add-row/AddRow';

class BudgetTable extends Component {

  state = {

    operations: [],
    isAddRowOpen: false,
    selectedStartDate: new Date(),
    selectedEndDate: new Date(),

  }

  handleChangeOfStartDate = date => {

    this.setState({ selectedStartDate: date });

  }

  handleChangeOfEndDate = date => {

    this.setState({ selectedEndDate: date });

  }

  getOperations = () => {

    axios.get('http://localhost/my_manager/api/budget')

      .then(response => {
        this.setState({
          operations: response.data.result || [],
        });

      })
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

  handleAddRowClick = () => {

    this.setState({ isAddRowOpen: true });

  }

  handleAddRowClose = () => {

    this.setState({ isAddRowOpen: false });

  }

  componentDidMount = () => {

    this.getOperations();

  }

  displayOperations = () => {

    return this.state.operations.map(operation => {
      return { 
        id: operation.id,
        date: operation.date, 
        nom: operation.name,
        mode: operation.mode,
        motif: operation.reason,
        recette: operation.type === "Recette" ? operation.amount : "",
        depense: operation.type === "Depense" ? operation.amount : "", 
      };
    })

  }

  
  render() {

    const { selectedStartDate } = this.state;
    const { selectedEndDate } = this.state;

    return (

      <div className={styles.container}>
        <div className={styles.selectedDateContainer}>
        <p>
          <span className={styles.selectedDate}>Du</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={selectedStartDate} onChange={this.handleChangeOfStartDate} />
          </MuiPickersUtilsProvider>
          <span className={styles.selectedDate}>au</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={selectedEndDate} onChange={this.handleChangeOfEndDate} />
          </MuiPickersUtilsProvider>
        </p>
        </div>

        
        <MaterialTable
          columns={[
            { title: 'id', field: 'id', hidden: true},
            { title: 'Date', field: 'date', type: 'numeric'},
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

        <Button variant="outlined" color="primary" onClick={this.handleAddRowClick}> Ajouter </Button>
        <AddRow open={this.state.isAddRowOpen} handleClose={this.handleAddRowClose} getOperations={this.getOperations} />
        
  </div>

    )}

}

export default BudgetTable;