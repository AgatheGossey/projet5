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

class ManageCategory extends Component {
    state = {
      name_category: '',
    };

    handleSubmit = () => {
      const data = {
        name_category: this.state.name_category
      };

      axios.post('http://localhost/my_manager/api/category', data)
        .then(() => {
          this.props.getCategory();
          this.handleClose();
        })
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
                        <DialogContentText>
                          <TextField label="Nom :" value={this.state.name_category} onChange={e => this.handleTextChange(e.target.value)}/>
                        </DialogContentText>
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

export default ManageCategory;