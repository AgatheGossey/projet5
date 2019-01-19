import React, { Component } from 'react';
// import axios from 'axios';

// // STYLE
import styles from './addrow.module.css';

// COMPONENTS 
import Button from '@material-ui/core/Button';
// dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// form
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class AddRow extends Component {
    state = {
        // DIALOG
        open: false,
        // FORM
        date:'',
        name:'',
        mode:'',
        motif:'',
        type:'',
        amount:'',
    };

    // DIALOG

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    // FORM

    handleDateChange = (date) => {
        this.setState({
            date: date,
        })
    }

    handleNameChange = (name) => {
        this.setState({
            name: name,
        })
    }

    handleMotifChange = (motif) => {
        this.setState({
            motif: motif,
        })
    }

    handleModeChange = (mode) => {
        this.setState({
            mode: mode,
        })
    }

    handleTypeChange = (type) => {
        this.setState({
            type: type,
        })
    }

    handleAmountChange = (amount) => {
        this.setState({
            amount: amount,
        })
    }

    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Ajouter
                </Button>
                <Dialog fullScreen={fullScreen} open={this.state.open} onClose={this.handleClose} aria-labelledby="responsive-dialog-title" maxWidth="xl">
                    <DialogTitle id="responsive-dialog-title">{"Ajouter un élément dans le budget"}</DialogTitle>
                    <DialogContent>
                        <div className={styles.container}>
                                <TextField className={styles.textField} variant='outlined' type='date' value={this.state.date} onChange={e => this.handleDateChange(e.target.value)}/>   
                                <TextField variant="outlined" label="Nom :" onChange={e => this.handleNameChange(e.target.value)}/>
                                <TextField select variant="outlined" label="Mode :" value={this.state.mode} onChange={e => this.handleModeChange(e.target.value)}>
                                    <MenuItem value="Virement">Virement</MenuItem>
                                    <MenuItem value="Chèque">Chèque</MenuItem>
                                    <MenuItem value="Espèce">Espèce</MenuItem>
                                </TextField>
                                <TextField variant="outlined" label="Motif :" onChange={e => this.handleMotifChange(e.target.value)}/>
                                <TextField select variant="outlined" label="Type :" value={this.state.type} onChange={e => this.handleTypeChange(e.target.value)}>
                                    <MenuItem value="Recette">Recette</MenuItem>
                                    <MenuItem value="Depense">Dépense</MenuItem>
                                </TextField>
                                <TextField 
                                    variant="outlined"
                                    label="Montant"
                                    onChange={e => this.handleAmountChange(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                    }}>
                                </TextField>
                            </div>    
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Ajouter
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default AddRow;