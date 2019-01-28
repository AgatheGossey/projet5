import React, { Component } from 'react';
import axios from 'axios';

// // STYLE

// COMPONENTS 
// dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// add category form
import TextField from '@material-ui/core/TextField';

class EditCategory extends Component {
    state = {
      category: {},
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.category !== this.props.category) {
        this.setState({
          category: nextProps.category,
        })
      }
    }

    handleTextChange = (name_category) => {
      this.setState((state) => ({ category: { ...state.category, name_category:name_category }}));
    }

    handleSubmit = () => {
      const data = {
        name_category: this.state.category.name_category,
      };

      axios.put(`http://localhost/my_manager/api/category/${this.state.category.id}`, data)
        .then(() => {
          this.props.getCategories();
          this.props.handleClose();
        })
    }

    render() {
      return (
        <div>
          <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">Modifier la catégorie</DialogTitle>
            <DialogContent>
              <TextField label="Nom" value={this.state.category.name_category} onChange={e => this.handleTextChange(e.target.value)} />
            </DialogContent>
            <DialogActions>
              <Button  color="primary" autoFocus onClick={this.handleSubmit}>
                Ajouter
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
}

export default EditCategory;