import React, { Component } from 'react';
import MaterialTable from 'material-table'
import axios from 'axios';

// STYLE 
import styles from './budgettable.module.css';

// COMPONENTS
import Button from '@material-ui/core/Button';

import AddRow from '../add-row/AddRow';

class BudgetTable extends Component {
  state = {
    operations: [],
    isAddRowOpen: false,
  }

  getOperations = () => {
    axios.get('http://localhost/my_manager/api/budget')
      .then(response => {
        this.setState({
          operations: response.data.result || [],
        });
      })
  }

  handleAddRowClick = () => {
    this.setState({ isAddRowOpen: true });
  };

  handleAddRowClose = () => {
    this.setState({ isAddRowOpen: false });
  };

  componentDidMount = () => {
    this.getOperations();
  }

  displayOperations = () => {
    return this.state.operations.map(operation => {
      return { 
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
    return (
      <div>
        <MaterialTable className={styles.test}
          columns={[
            { title: 'Date', field: 'date', type: 'numeric'},
            { title: 'Nom', field: 'nom'},
            { title: 'Mode', field: 'mode'},
            { title: 'Motif', field: 'motif'},
            { title: 'Recette', field: 'recette', type: 'numeric'},
            { title: 'Dépense', field: 'depense', type: 'numeric'},
          ]}
          data={this.displayOperations()}
          title="Gérer le budget :"
          actions={[
            {
              icon: 'done_all',
              tooltip: 'Do',
              onClick: (event, rows) => {
              alert('You selected ' + rows.length + ' rows')
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