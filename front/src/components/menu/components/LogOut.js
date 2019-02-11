import React, { Component } from 'react';
import { Dialog, Button, DialogActions, DialogContent } from '@material-ui/core';

class LogOut extends Component {
  handleClick = () => {
    this.props.handleClose();
    this.props.logout();
  }

  render() {
    return (
      <div>
        <Dialog open={ this.props.open } onClose={ this.props.handleClose } aria-labelledby="responsive-dialog-title">
          <DialogContent>
            <DialogActions>
              <Button 
                size="large"               
                color="secondary"
                onClick={() => this.handleClick()}
              >
                Se déconnecter
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default LogOut;