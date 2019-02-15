import React, { Component } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class usersWaitingNotification extends Component {

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={ this.props.open }
          autoHideDuration={ 6000 }
          onClose={ this.props.handleClose }
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={ <span id="message-id">Vous avez des inscriptions en attente.</span> }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={ this.props.handleClose }
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

export default usersWaitingNotification;