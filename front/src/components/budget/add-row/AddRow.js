import React, { Component } from 'react';
import axios from 'axios';

// // STYLE
import styles from './addrow.module.css';

// COMPONENTS 
import AddCategory from '../manage-category/AddCategory';
import Button from '@material-ui/core/Button';
// dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// form
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class AddRow extends Component {
  state = {
    date_budget:'',
    name:'',
    mode:'',
    category: '',
    reason:'',
    type:'',
    amount:'',
    // Add category dialog
    isAddCategoryOpen: false, 
  };

  handleDateChange = (date_budget) => {
    this.setState({
      date_budget: date_budget,
    })
  }

  handleNameChange = (name) => {
    this.setState({
      name: name,
    })
  }


  handleModeChange = (mode) => {
    this.setState({
      mode: mode,
    })
  }

  handleCategoryChange = (category) => {
    this.setState({
      category: category,
    })
  }

  handleReasonChange = (reason) => {
    this.setState({
      reason: reason,
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

    axios.post('http://localhost/my_manager/api/budget', data)
      .then(() => {
        this.props.getOperations();
        this.props.handleClose();
        });
  }

  handleAddCategoryClick = () => {
    this.setState( { isAddCategoryOpen: true});
  }

  handleAddCategoryClose = () => {
    this.setState({ isAddCategoryOpen: false});
  }
  

  render() {
    return (
      <form>
      
        <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="responsive-dialog-title" maxWidth="xl">
          <DialogTitle id="responsive-dialog-title">{"Ajouter un élément dans le budget"}</DialogTitle>
          <DialogContent>
            <div className={styles.container}>

              <TextField variant='outlined' type='date' value={this.state.date_budget} onChange={e => this.handleDateChange(e.target.value)}/>   
              
              <TextField variant="outlined" label="Nom :" onChange={e => this.handleNameChange(e.target.value)}/>
              
              <TextField select variant="outlined" label="Mode :" value={this.state.mode} onChange={e => this.handleModeChange(e.target.value)}>
                <MenuItem value="Virement">Virement</MenuItem>
                <MenuItem value="Chèque">Chèque</MenuItem>
                <MenuItem value="Espèce">Espèce</MenuItem>
              </TextField>

              <TextField select variant="outlined" label="Catégorie :" value={this.state.category} onChange={e => this.handleCategoryChange(e.target.value)}>
               {this.props.displayCategory()}              
                <MenuItem value="">
                  <Button variant="outlined" color="primary" onClick={this.handleAddCategoryClick}>
                    Ajouter
                  </Button>
                </MenuItem>
              </TextField>

              <AddCategory open={this.state.isAddCategoryOpen} handleClose={this.handleAddCategoryClose} getCategories ={this.getCategories} />

              <TextField variant="outlined" label="Motif :" onChange={e => this.handleReasonChange(e.target.value)}/>
              
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
            <Button type="submit" onClick={this.handleSubmit} color="primary" autoFocus>
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    )
  }
}

export default AddRow;