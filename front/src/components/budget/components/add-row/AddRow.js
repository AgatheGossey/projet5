import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, InputAdornment, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';

// ACTIONS
import { toggleAddCategory } from 'actions/budget-actions';

// STYLE
import styles from './addrow.module.css';

// CONSTANTS
import { API_HOST } from 'constants.js';

// COMPONENTS 
import AddCategory from '../manage-category/AddCategory';

class AddRow extends Component {
  state = {
    date_budget:'',
    name:'',
    mode:'',
    category: '',
    reason:'',
    type:'',
    amount:'',
  };

  handleDateChange = (date_budget) => {
    const date = moment.utc(date_budget).toDate();
    this.setState({ date_budget: date })
  }

  handleNameChange = (name) => {
    this.setState ({ name: name })
  }

  handleModeChange = (mode) => {
    this.setState({ mode: mode })
  }

  handleCategoryChange = (category) => {
    this.setState ({ category: category })
  }

  handleReasonChange = (reason) => {
    this.setState({ reason: reason })
  }

  handleTypeChange = (type) => {
    this.setState({ type: type })
  }

  handleAmountChange = (amount) => {
    this.setState({ amount: amount })
  }

  handleSubmit = () => {
    const data = {
      date_budget: this.state.date_budget,
      name: this.state.name,
      mode: this.state.mode,
      category: this.state.category.id,
      reason: this.state.reason,
      type: this.state.type,
      amount: this.state.amount,
   };

    axios.post(`${API_HOST}/budget`, data)
      .then(() => {
        this.props.getOperations();
        this.props.handleClose();
        });
  }

  render() {
    return (
      <form>

        <Dialog 
          open={ this.props.open }
          onClose={ this.props.handleClose }
          aria-labelledby="responsive-dialog-title" 
          maxWidth="xl"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Ajouter un élément dans le budget :"}
          </DialogTitle>

          <DialogContent>
            <div className={ styles.container }>

              <TextField 
                className={ styles.addRowTextField }
                variant='outlined'
                type='date'
                value={ moment(this.state.date_budget).format('YYYY-MM-DD') }
                onChange={ e => this.handleDateChange(e.target.value) }
              />   

              <TextField 
                className={ styles.addRowTextField }
                variant="outlined"
                label="Nom :"
                onChange={ e => this.handleNameChange(e.target.value) }
              />

              <TextField 
                className={ styles.addRowTextField }
                select 
                variant="outlined"
                label="Mode :"
                value={ this.state.mode }
                onChange={ e => this.handleModeChange(e.target.value) }
              >
                <MenuItem value="Virement">Virement</MenuItem>
                <MenuItem value="Chèque">Chèque</MenuItem>
                <MenuItem value="Espèce">Espèce</MenuItem>
              </TextField>

              <TextField 
                className={ styles.addRowTextField }
                select
                variant="outlined"
                label="Catégorie :"
                value={ this.state.category }
                onChange={ e => this.handleCategoryChange(e.target.value) }
              >
                {this.props.categories.map((categoryOperation) => {
                  return <MenuItem key={categoryOperation.id} value={categoryOperation}>{categoryOperation.name_category}</MenuItem>
                })}
                <div value="">
                  <Fab 
                    className={ styles.addButton }
                    size="small"
                    color="secondary"
                    aria-label="Add"
                    onClick={ this.props.toggleAddCategory }>
                    <AddIcon />
                  </Fab>
                </div> 
              </TextField>

              <AddCategory
                open={ this.props.isAddCategory }
                handleClose={ this.props.toggleAddCategory }
                getCategories ={ this.props.getCategories }
              />

              <TextField 
                required
                className={ styles.addRowTextField }
                variant="outlined"
                label="Motif :"
                onChange={ e => this.handleReasonChange(e.target.value) }
              />
              
              <TextField
                className={ styles.addRowTextField }
                select variant="outlined"
                label="Type :"
                value={ this.state.type }
                onChange={ e => this.handleTypeChange(e.target.value) }
              >
                <MenuItem value="Recette">Recette</MenuItem>
                <MenuItem value="Depense">Dépense</MenuItem>
              </TextField> 

              <TextField 
                className={ styles.addRowTextField }
                variant="outlined"
                label="Montant"
                onChange={ e => this.handleAmountChange(e.target.value) }
                InputProps={{
                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}>
              </TextField>

            </div>    
          </DialogContent>

          <DialogActions>
            <Button 
              type="submit"
              onClick={ this.handleSubmit }
              color="primary" 
              autoFocus
            >
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>

      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.budget.categories,
    isAddCategory: state.budget.isAddCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddCategory: () => {
      dispatch(toggleAddCategory());
    }
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(AddRow));