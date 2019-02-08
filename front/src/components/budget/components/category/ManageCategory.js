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
import AddCategory from '../category/AddCategory';
import EditCategory from '../category/EditCategory';

class ManageCategory extends Component {
  state = {
    // dialog
    isEditCategoryOpen: false,
    // get categories
    category: {},
  };

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
          />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Clear"
              onClick={() => this.props.deleteCategory(categoryOperation.id)}>
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

  render() {
    return (
      <Dialog 
        open={ this.props.open }
        onClose={ this.props.handleClose }
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
            onClick={this.props.toggleAddCategory}
          >
            <AddIcon />
          </Fab>
          <AddCategory 
            open={ this.props.isAddCategoryOpen }
            handleClose={ this.props.toggleAddCategory }
            getCategories={ this.props.getCategories }
          />
          <EditCategory 
            open={ this.state.isEditCategoryOpen }
            handleClose={ this.handleEditCategoryClose }
            category={ this.state.category }
            getCategories={ this.props.getCategories }
          />
        </DialogContent>
      </Dialog>
      )
  }
}

export default ManageCategory;