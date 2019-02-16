import React, { Component } from 'react';
import { Dialog, DialogContent, Typography } from '@material-ui/core';

class MessageAfterRegister extends Component {
  render() {
    return (
      <div>
        <Dialog open={ true } onClose={ () => this.props.hideModal('MESSAGE_AFTER_REGISTER') } aria-labelledby="responsive-dialog-title">
          <DialogContent align="center">
            <Typography> Formulaire d'inscription saisi avec succès.</Typography> 
            <Typography>Celui ci a été soumis à validation par l'administrateur du site.</Typography>
            <Typography>A très vite !</Typography>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default MessageAfterRegister;