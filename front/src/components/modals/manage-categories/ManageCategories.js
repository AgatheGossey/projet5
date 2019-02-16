import React from 'react';
import { Dialog, DialogContent, DialogTitle, List, Fab, ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Edit, Clear } from '@material-ui/icons';

// STYLE
import styles from './manage-categories.module.css';

const ManageCategories = (props) => {
  const displayCategory = () => {
    return props.categories.map((category) => 
      (<List key={category.id}>
        <ListItem button>
          <ListItemText 
            primary= {category.name_category} 
          />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Clear"
              onClick={() => props.deleteCategory(category.id)}>
              <Clear />
            </IconButton>
            <IconButton
              aria-label="Edit"
              color="primary"
              onClick={() => props.showModal('ADD_CATEGORY', {
                editCategory: props.editCategory,
                hideModal: props.hideModal,
                category,
              })} >
              <Edit />
            </IconButton> 
          </ListItemSecondaryAction>
        </ListItem>
      </List>));
  }

  return (
    <Dialog 
      open={ true }
      onClose={ () => {
        props.hideModal('MANAGE_CATEGORIES');
        props.getOperations();
      }}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Gérer les catégories :
      </DialogTitle>

      <DialogContent>
        { displayCategory() }
        <Fab 
          className={ styles.addButton }
          size="small"
          color="secondary"
          aria-label="Add"
          onClick={() => props.showModal('ADD_CATEGORY', {
            addCategory: props.addCategory,
            hideModal: props.hideModal,
          })}
        >
          <AddIcon />
        </Fab>
      </DialogContent>
    </Dialog>
    )
}

export default ManageCategories;