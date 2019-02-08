import React, { Component } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

// CONSTANTS
import { API_HOST } from 'constants.js';

class EditCategory extends Component {
    state = {
      category: {},
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.category !== this.props.category) {
        this.setState({ category: nextProps.category })
      }
    }

    handleTextChange = (name_category) => {
      this.setState((state) => ({ category: { ...state.category, name_category:name_category }}));
    }

    handleSubmit = () => {
      const data = {
        name_category: this.state.category.name_category,
      };

      axios.put(`${API_HOST}/category/${this.state.category.id}`, data)
        .then(() => {
          this.props.getCategories();
          this.props.handleClose();
        })
    }

    render() {
      return (
        <div>
          <Dialog 
            open={ this.props.open }
            onClose={ this.props.handleClose }
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">Modifier la catégorie</DialogTitle>
            <DialogContent>
              <TextField 
                label="Nom"
                value={ this.state.category.name_category }
                onChange={ e => this.handleTextChange(e.target.value) }
              />
            </DialogContent>
            <DialogActions>
              <Button 
                color="primary"
                autoFocus
                onClick={this.handleSubmit}
              >
                Ajouter
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
}

export default EditCategory;