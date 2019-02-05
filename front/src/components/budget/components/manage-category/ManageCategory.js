import React, { Component } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, List, Fab, ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Edit, Clear } from '@material-ui/icons';

// STYLE
import styles from './managecategory.module.css';

// CONSTANTS
import { API_HOST } from 'constants.js';

// COMPONENTS 
import AddCategory from '../manage-category/AddCategory';
import EditCategory from '../manage-category/EditCategory';

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
    return this.props.categories.map((categoryOperation) => 
      (<List key={categoryOperation.id}>
        <ListItem button onClick={this.handleClickList}>
          <ListItemText 
            primary= {categoryOperation.name_category} 
            secondary={this.state.secondary ? 'Secondary text' : null}
          />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Clear"
              onClick={() => this.deleteCategory(categoryOperation)}>
              <Clear />
            </IconButton>
            <IconButton
              aria-label="Edit"
              color="primary"
              onClick={() => this.handleEditCategoryClick(categoryOperation)} >
              <Edit />
            </IconButton> 
          </ListItemSecondaryAction>
        </ListItem>
      </List>));
  }

  deleteCategory = (category) => {
    axios.delete(`${API_HOST}/category/${category.id}`)
      .then(() => {
        this.props.getCategories();
      })
  }

  render() {
    return (
      <Dialog 
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Gérer les catégories :
        </DialogTitle>
        <DialogContent>
          {this.displayCategory()}
          <Fab 
          className={ styles.addButton }
                    size="small"
                    color="secondary"
                    aria-label="Add"
                    onClick={this.handleAddCategoryClick}>
                    <AddIcon />
                  </Fab>
          <AddCategory 
            open={this.state.isAddCategoryOpen}
            handleClose={this.handleAddCategoryClose}
            getCategories={this.props.getCategories}
          />
          <EditCategory 
            open={this.state.isEditCategoryOpen}
            handleClose={this.handleEditCategoryClose}
            category={this.state.category}
            getCategories={this.props.getCategories}
          />
        </DialogContent>
      </Dialog>
      )
  }
}

export default ManageCategory;