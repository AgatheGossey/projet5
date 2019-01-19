import React, { Component } from 'react';
import axios from 'axios';

import styles from './deleterow.module.css';

class DeleteRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    delete(event) {
        event.preventDefault();
        axios.delete(`http://localhost/my_manager/api/budget/${this.props.operationId}`)
        .then(response => {
            this.props.getOperations();
        })

    }

    render() {
        return(
            <div>
                <button onClick={this.delete.bind(this)}>Supprimer</button>
            </div>
        );
    }
}

export default DeleteRow;