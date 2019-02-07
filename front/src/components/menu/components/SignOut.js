import React, { Component } from 'react';
import { Dialog, Button, DialogActions, DialogContent } from '@material-ui/core';

// STYLE
import styles from '../menu.module.css';

class SignOut extends Component {
  render() {
    return (
      <div>
        <Dialog className={ styles.test } open={ this.props.open } onClose={ this.props.handleClose } aria-labelledby="responsive-dialog-title">
          <DialogContent>
            <DialogActions>
              <Button 
                size="large"               
                color="secondary"
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

export default SignOut;