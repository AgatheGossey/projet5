import React, { Component } from 'react';
import axios from 'axios';

// // STYLE

// COMPONENTS 
// dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// add category form
import TextField from '@material-ui/core/TextField';

class AddCategory extends Component {
    state = {
        open: false,
        category: '',
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
      const data = {
        category: this.state.category,
      };

      axios.post('http://localhost/my_manager/api/budget', data)
        .then(() => {
          this.props.getOperations();
          this.props.handleClose();
          });
  }



    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Ajouter
                </Button>
                <Dialog fullScreen={fullScreen} open={this.state.open} onClose={this.handleClose} aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">{"Ajouter une catégorie"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                          <TextField label="Nom :"/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary" autoFocus>
                            Ajouter
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default AddCategory;