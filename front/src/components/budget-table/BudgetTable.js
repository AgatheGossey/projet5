import React, { Component } from 'react';
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
                    <TableCell padding="checkbox">
                        <Checkbox />
                    </TableCell>
                    <TableCell component="th" scope="row">{operation.date}</TableCell>
                    <TableCell align="right">{operation.name}</TableCell>
                    <TableCell align="right">{operation.mode}</TableCell>
                    <TableCell align="right">{operation.reason}</TableCell>
                    { operation.amount < 0 ? <TableCell></TableCell> : <TableCell align="right">{operation.amount}</TableCell>}
                    { operation.amount < 0 ? <TableCell>{operation.amount}</TableCell> : <TableCell></TableCell>}
                    <TableCell><DeleteRow operationId={operation.id} getOperations={this.getOperations.bind(this)} /></TableCell>
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
        )
    }

}


export default BudgetTable;