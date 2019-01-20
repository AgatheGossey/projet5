import React, { Component } from 'react';
import axios from 'axios';

// STYLE
import styles from './deleterow.module.css';

// COMPONENTS
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }

  delete = (event) => {
    event.preventDefault();
    axios.delete(`http://localhost/my_manager/api/budget/${this.props.operationId}`)
    .then(() => {
      this.props.getOperations();
    })
  }

  render() {
    return(
      <div>
        <Fab aria-label="Delete">
          <DeleteIcon onClick={this.delete}/>
        </Fab>
      </div>
    );
  }
}

export default DeleteRow;