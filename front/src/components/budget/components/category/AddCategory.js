import React, { Component } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

// CONSTANTS
import { API_ROUTES } from 'constants.js';


class AddCategory extends Component {
    state = {
      name_category: '',
    };

    handleSubmit = () => {
      const data = {
        name_category: this.state.name_category
      };

      axios.post(API_ROUTES.category, data)
        .then(() => {
          this.props.getCategories();
          this.props.handleClose();
        });
    }

    handleTextChange = (name_category) => {
      this.setState({
        name_category: name_category,
      })
    }

    render() {
      return (
        <div>
          <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Ajouter une catégorie"}</DialogTitle>
            <DialogContent>
              <TextField label="Nom :" value={this.state.name_category} onChange={e => this.handleTextChange(e.target.value)}/>
            </DialogContent>
            <DialogActions>
              <Button  color="primary" onClick={this.handleSubmit} autoFocus>
                Ajouter
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
}

export default AddCategory;