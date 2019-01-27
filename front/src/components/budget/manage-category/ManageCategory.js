import React, { Component } from 'react';
import axios from 'axios';

// // STYLE
// import styles from './addrow.module.css';

// COMPONENTS 
import AddCategory from '../manage-category/AddCategory';
// dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// list
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit'
import Clear from '@material-ui/icons/Clear';
import { ListItemSecondaryAction } from '@material-ui/core';
import Button from '@material-ui/core/Button';


class ManageCategory extends Component {

  state = {
    // dialog
    isAddCategoryOpen: false,
    editingCategory: {},
    // get categories
    categoriesOperations: [],
    // list
    secondary: false, 
  };

  // dialog add category

  handleAddCategoryClick = () => {
    this.setState( { isAddCategoryOpen: true});
  }

  handleAddCategoryClose = () => {
    this.setState({ isAddCategoryOpen: false});
  }
  
  //  categories
  getCategories = () => {
    axios.get('http://localhost/my_manager/api/category')
    .then(response => {
      this.setState({
        categoriesOperations: response.data.result || [],
      });
    })
  }

  componentDidMount() {
    this.getCategories();
  }  

  displayCategory = () => {
    return this.state.categoriesOperations.map((categoryOperation) => 
      (<List key={categoryOperation.id}>
        <ListItem button onClick={this.handleClickList}>
          <ListItemText 
            primary= {categoryOperation.name_category} 
            secondary={this.state.secondary ? 'Secondary text' : null}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Clear" onClick={() => this.deleteCategory(categoryOperation)}>
              <Clear />
            </IconButton>
            <IconButton aria-label="Edit" onClick={() => this.editCategory(categoryOperation)}>
              <Edit />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>));
  }

  deleteCategory = (category) => {
    axios.delete(`http://localhost/my_manager/api/category/${category.id}`)
      .then(() => {
        this.getCategories();
      })
  }

  editCategory = (category) => {
    this.setState({
      editingCategory: category,
      isAddCategoryOpen: true,
    })
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Gérer les catégories :</DialogTitle>
        <DialogContent>
          {this.displayCategory()}
          <Button variant="outlined" color="primary" onClick={this.handleAddCategoryClick}>
              Ajouter
          </Button>    
          <AddCategory open={this.state.isAddCategoryOpen} handleClose={this.handleAddCategoryClose} getCategories={this.getCategories} category={this.state.editingCategory}/>
        </DialogContent>
      </Dialog>
      )
  }
}

export default ManageCategory;