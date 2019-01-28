import React, { Component } from 'react';
import axios from 'axios';

// // STYLE
// import styles from './addrow.module.css';

// COMPONENTS 
import AddCategory from '../manage-category/AddCategory';
import EditCategory from '../manage-category/EditCategory'
// dialog
import Dialog from '@material-ui/core/Dialog';
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
    isEditCategoryOpen: false,
    // get categories
    category: {},
    // list
    secondary: false, 
  };

  // dialog add category

  handleAddCategoryClick = () => {
    this.setState({ isAddCategoryOpen: true });
  }

  handleAddCategoryClose = () => {
    this.setState({ isAddCategoryOpen: false });
  }

  // dialog edit category 

  handleEditCategoryClick = (category) => {
    this.setState({ 
      isEditCategoryOpen: true,
      category: category,
    });
  }

  handleEditCategoryClose = () => {
    this.setState({ 
      isEditCategoryOpen: false,
      category: '',
    });
  }
  
  //  categories
  displayCategory = () => {
    return this.props.categoriesOperations.map((categoryOperation) => 
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
            <IconButton aria-label="Edit" color="primary" onClick={() => this.handleEditCategoryClick(categoryOperation)} >
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

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Gérer les catégories :</DialogTitle>
        <DialogContent>
          {this.displayCategory()}
          <Button variant="outlined" color="primary" onClick={this.handleAddCategoryClick}>
              Ajouter
          </Button>    
          <AddCategory open={this.state.isAddCategoryOpen} handleClose={this.handleAddCategoryClose} getCategories={this.props.getCategories} />
          <EditCategory open={this.state.isEditCategoryOpen} handleClose={this.handleEditCategoryClose} category={this.state.category} getCategories={this.props.getCategories}/>
        </DialogContent>
      </Dialog>
      )
  }
}

export default ManageCategory;