import React from 'react';
import { Dialog, DialogContent, Typography, Button } from '@material-ui/core';

// STYLE
import styles from './confirmation.module.css';

const Confirmation = (props) => {
  return (
    <div>
      <Dialog open={ true } onClose={ () => props.hideModal('CONFIRMATION') }>
        <DialogContent align="center">
          <Typography> Confirmez-vous la suppression ?</Typography>
          <Button 
            className={ styles.button }
            variant="contained" 
            color="secondary"
            onClick={ async () => {
              await props.action();
              props.hideModal('CONFIRMATION')
            }}
          >
            OUI
          </Button>
          <Button 
            className={ styles.button }
            variant="outlined" 
            color="secondary"
            onClick={ () => props.hideModal('CONFIRMATION') }
          >
            NON
          </Button> 
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Confirmation;