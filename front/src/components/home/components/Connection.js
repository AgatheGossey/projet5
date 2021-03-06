import React, { Component } from 'react';
import { Grid, TextField, Button, Card } from '@material-ui/core';

// STYLE 
import styles from '../home.module.css';

class Connection extends Component {
  state = {
    username: '',
    password: '', 
  };

  handleUsernameConnectionChange = (username) => {
    this.setState({
      username: username,
    })
  }

  handlePasswordConnectionChange = (password) => {
    this.setState({
      password: password,
    })
  }

  handleSubmitConnection = (e) => {
    e.preventDefault();
    this.props.login({ username: this.state.username, password: this.state.password });
    if (this.props.connectionError) {
      this.setState({
        password: '',
      })
    }
  }

  render() {
    return (
      <Card>
        <form className={ styles.formConnection }>        
          <Grid container direction="column" justify="center" alignItems="center">

            <TextField 
              label="Pseudo :"
              value={ this.state.username }
              onChange={e => this.handleUsernameConnectionChange(e.target.value)}
            />

            <TextField 
              label="Mot de passe :"
              type="password"
              value={ this.state.password }
              onChange={e => this.handlePasswordConnectionChange(e.target.value)}
            />
            <div className={ styles.connectionError }>{ this.props.connectionError }</div>
            <Button 
              type="submit"
              onClick={ this.handleSubmitConnection }
              color="secondary"
            >
              Se connecter
            </Button>

          </Grid> 
        </form>
      </Card>
    )
  }
}

export default Connection;