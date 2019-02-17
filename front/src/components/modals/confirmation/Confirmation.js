import React from 'react';
import { Dialog, DialogContent, Typography, Button } from '@material-ui/core';

const Confirmation = (props) => {
  return (
    <div>
      <Dialog open={ true } onClose={ () => props.hideModal('CONFIRMATION') } aria-labelledby="responsive-dialog-title">
        <DialogContent align="center">
          <Typography> Etes-vous sûre ?</Typography>
          <Button 
          variant="outlined" 
          color="secondary"
          onClick={ async () => {
            await props.action();
            props.hideModal('CONFIRMATION')
          }}
          >
          OUI
        </Button>
        <Button 
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