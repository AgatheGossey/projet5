import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, InputAdornment, Select, OutlinedInput, InputLabel, FormControl } from '@material-ui/core';
import moment from 'moment';

// STYLE
import styles from './addoperation.module.css';

class AddOperation extends Component {
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

  handleSubmit = async () => {
    const data = {
      date_budget: this.state.date_budget,
      name: this.state.name,
      mode: this.state.mode,
      category: this.state.category.id,
      reason: this.state.reason,
      type: this.state.type,
      amount: this.state.amount,
   };

    await this.props.addOperation(data);
    this.props.hideModal('ADD_OPERATION');
  }

  render() {
    return (
      <form>

        <Dialog 
          open={true}
          onClose={() => this.props.hideModal('ADD_OPERATION') }
          aria-labelledby="responsive-dialog-title" 
          maxWidth="xl"
        >
          <DialogTitle id="responsive-dialog-title">Ajouter un élément dans le budget :</DialogTitle>

          <DialogContent>
            <div className={ styles.container }>

            <FormControl>
              <TextField 
                className={ styles.addOperationTextField }
                variant='outlined'
                type='date'
                value={ moment(this.state.date_budget).format('YYYY-MM-DD') } 
                onChange={ e => this.handleDateChange(e.target.value) }
              />
            </FormControl>

            <FormControl>
              <TextField 
                className={ styles.addOperationTextField }
                variant="outlined"
                label="Nom :"
                onChange={ e => this.handleNameChange(e.target.value) }
              />
            </FormControl>
              
            <FormControl>
              <TextField 
                className={ styles.addOperationTextField }
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
            </FormControl>
              

            <FormControl variant="outlined">
              <InputLabel 
                className={ styles.categoryLabel }
                htmlFor="category"
              > 
                Categorie : 
              </InputLabel>
              <Select
                className={ styles.addOperationTextField }
                input={
                  <OutlinedInput
                    name="category"
                    id="category"
                    labelWidth={0}
                  />
                }
                value={ this.state.category }
                onChange={ e => this.handleCategoryChange(e.target.value) }
              >
                {this.props.categories.map((categoryOperation) => {
                  return <MenuItem key={ categoryOperation.id } value={ categoryOperation }>{ categoryOperation.name_category }</MenuItem>
                })}
              </Select>
            </FormControl>
            
            <FormControl>
              <TextField 
                className={ styles.addOperationTextField }
                variant="outlined"
                label="Détails :"
                onChange={ e => this.handleReasonChange(e.target.value) }
              />
            </FormControl>
              
            <FormControl>
              <TextField
                className={ styles.addOperationTextField }
                select variant="outlined"
                label="Type :"
                value={ this.state.type }
                onChange={ e => this.handleTypeChange(e.target.value) }
              >
                <MenuItem value="Recette">Recette</MenuItem>
                <MenuItem value="Depense">Dépense</MenuItem>
              </TextField> 
            </FormControl>
              
            <FormControl>
              <TextField 
                className={ styles.addOperationTextField }
                variant="outlined"
                label="Montant"
                onChange={ e => this.handleAmountChange(e.target.value) }
                InputProps={{
                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}>
              </TextField>
            </FormControl>
              
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

export default AddOperation;