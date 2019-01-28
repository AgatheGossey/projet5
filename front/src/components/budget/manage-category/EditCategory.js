import React, { Component } from 'react';

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
      name_category: ['']
    };

    handleTextChange = (name_category) => {
      this.setState({
        name_category: name_category,
      })
    }

    displayCategory = () => {
      this.props.category();
    }

    render() {
      return (
        <div>
          <Dialog category={this.props.category} open={this.props.open} onClose={this.props.handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Modifier la catégorie"}</DialogTitle>
            <DialogContent>
              <TextField label={this.displayCategory} value={this.state.name_category} onChange={e => this.handleTextChange(e.target.value)} />
            </DialogContent>
            <DialogActions>
              <Button  color="primary" autoFocus>
                Ajouter
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
}

export default EditCategory;