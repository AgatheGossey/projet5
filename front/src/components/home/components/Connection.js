import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

// STYLE 
import styles from '../home.module.css';

class Connection extends Component {
  state = {
    username_connection: '',
    password_connection: '', 
  };

  handleUsernameConnectionChange = (username_connection) => {
    this.setState({
      username_connection: username_connection,
    })
  }

  handlePasswordConnectionChange = (password_connection) => {
    this.setState({
      password_connection: password_connection,
    })
  }

  handleSubmitConnection = (e) => {
    if (this.props.validator.allValid()) {
      e.preventDefault();
    }
    else {
      this.props.validator.showMessages();
      this.forceUpdate();
      e.preventDefault();
    }
  }

  render() {
    return (
      <form className={ styles.formConnection }>        
        <Grid container direction="column" justify="center" alignItems="center">

          <TextField 
            label="Pseudo :"
            value={ this.state.username_connection }
            onChange={e => this.handleUsernameConnectionChange(e.target.value)}
          />
          {/* {this.props.validator.message('pseudo', this.state.username_connection, 'required|between:1,10')} */}

          <TextField 
            label="Mot de passe :"
            type="password"
            value={ this.state.password_connection }
            onChange={e => this.handlePasswordConnectionChange(e.target.value)}
          />
          {/* {this.props.validator.message('mot de passe', this.state.password_connection, 'required|between:6,30')} */}

          <Button 
            type="submit"
            onClick={ this.handleSubmitConnection }
            color="secondary"
          >
            Se connecter
          </Button>

        </Grid> 
      </form>
    )
  }
}

export default Connection;