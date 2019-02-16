import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

class AddCategory extends Component {
    state = {
      name_category: '',
    };

    handleSubmit = async () => {
      const data = {
        name_category: this.state.name_category
      };

      if (this.props.category) {
        await this.props.editCategory(this.props.category.id, data);
      } else {
        await this.props.addCategory(data);
      }

      this.props.hideModal('ADD_CATEGORY');
    }

    handleTextChange = (name_category) => {
      this.setState({
        name_category: name_category,
      })
    }

    componentDidMount() {
      if (this.props.category) {
        this.setState({
          name_category: this.props.category.name_category,
        })
      }
    }

    render() {
      return (
        <div>
          <Dialog open={ true }
                  onClose={ () => this.props.hideModal('ADD_CATEGORY') }
                  aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {this.props.category ? 'Editer' : 'Ajouter une catégorie'}
            </DialogTitle>
            <DialogContent>
              <TextField 
                label="Nom :"
                value={ this.state.name_category }
                onChange={ e => this.handleTextChange(e.target.value) }
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={ this.handleSubmit }
                autoFocus
              >
                Ajouter
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
}

export default AddCategory;