import React, { Component, Fragment } from 'react';
import axios from 'axios';
import DeleteRow from '../delete-row/DeleteRow';

// STYLE 
import styles from './budgettable.module.css';

// COMPONENTS
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
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
          operations: response.data.result,
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

      let amountColumns = (
        <Fragment>
          <TableCell align="right">{operation.amount}</TableCell>
          <TableCell />
        </Fragment>
      )

      if (operation.type === "Depense") {
        amountColumns = (
          <Fragment>
            <TableCell />
            <TableCell align="right">{operation.amount}</TableCell>
          </Fragment>
        )
      }

      return (
        <TableRow key={operation.id}>
          <TableCell padding="checkbox">
            <Checkbox />
          </TableCell>
          <TableCell component="th" scope="row">{operation.date}</TableCell>
          <TableCell align="right">{operation.name}</TableCell>
          <TableCell align="right">{operation.mode}</TableCell>
          <TableCell align="right">{operation.reason}</TableCell>
          { amountColumns }
          <TableCell><DeleteRow operationId={operation.id} getOperations={this.getOperations} /></TableCell>
        </TableRow>
      )
    })
  }

  render() {
    return (
      <Fragment>
        <Paper className={styles.test}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell></TableCell>
                <TableCell>Date</TableCell>
                <TableCell align='right'>Nom</TableCell>
                <TableCell align='right'>Mode</TableCell>
                <TableCell align='right'>Motif</TableCell>
                <TableCell align='right'>Recette</TableCell>
                <TableCell align='right'>Dépense</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.displayOperations()}
            </TableBody>
          </Table>
        </Paper>
        <Button variant="outlined" color="primary" onClick={this.handleAddRowClick}>
          Ajouter
        </Button>
        <AddRow open={this.state.isAddRowOpen} handleClose={this.handleAddRowClose} getOperations={this.getOperations} />
      </Fragment>
    )
  }

}


export default BudgetTable;