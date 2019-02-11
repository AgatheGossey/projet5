import React, { Component } from 'react';
import { Dialog, Button, DialogActions, DialogContent } from '@material-ui/core';

class ConfirmationMessage extends Component {
  handleClick = () => {
    this.props.deleteUser(this.props.deleteId);
    this.props.handleClose();
  }

  render() {
    return (
      <div>
        <Dialog open={ this.props.open } onClose={ this.props.handleClose } aria-labelledby="responsive-dialog-title">
          <DialogContent>
            Confirmez-vous la suppression ?
            <DialogActions>
              <Button 
                size="large"               
                color="secondary"
                onClick={() => this.handleClick()}
              >
                Supprimer
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default ConfirmationMessage;