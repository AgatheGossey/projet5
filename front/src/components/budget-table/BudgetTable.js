import React, { Component } from 'react';
import axios from 'axios';

// STYLE 
import styles from './budgettable.module.css';

// COMPONENTS
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

class BudgetTable extends Component {
    constructor() {
        super();
        this.state = {
            operations: [],
        };
    }

    getOperations() {
        axios.get('http://localhost/my_manager/api/budget')
            .then(response => {
                this.setState({
                    operations: response.data.result,
                });
            })
    }

    componentDidMount() {
        this.getOperations();
    }

    displayOperations() {
        return this.state.operations.map(operation => {
            return (
                <TableRow key={operation.id}>
                    <TableCell component="th" scope="row">{operation.date}</TableCell>
                    <TableCell align="right">{operation.name}</TableCell>
                    <TableCell align="right">{operation.type}</TableCell>
                    <TableCell align="right">{operation.reason}</TableCell>
                    { operation.amount < 0 ? <TableCell></TableCell> : <TableCell align="right">{operation.amount}</TableCell>}
                    { operation.amount < 0 ? <TableCell>{operation.amount}</TableCell> : <TableCell></TableCell>}
                </TableRow>
            )
        })
    }

    render() {
        return (
            <Paper className={styles.test}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align='right'>Nom</TableCell>
                            <TableCell align='right'>Type</TableCell>
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
        )
    }

}


export default BudgetTable;