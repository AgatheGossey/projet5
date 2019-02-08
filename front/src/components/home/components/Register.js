import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

// STYLE 
import styles from '../home.module.css';

class Register extends Component {
  state = {
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password_register_repeat: '',
    email: '',
  }

  handleUsernameRegisterChange = (username) => {
    this.setState({
      username: username,
    })
  }

  handleFirstNameRegisterChange = (first_name) => {
    this.setState({
      first_name: first_name,
    })
  }

  handleLastNameRegisterChange = (last_name) => {
    this.setState({
      last_name: last_name,
    })
  }

  handlePasswordRegisterChange = (password) => {
    this.setState({
      password: password,
    })
  }

  handlePasswordRegisterRepeatChange = (password_register_repeat) => {
    this.setState({
      password_register_repeat: password_register_repeat,
    })
  }

  handleEmailRegisterChange = (email) => {
    this.setState({
      email: email,
    })
  }

  handleSubmitRegister = () => {
    if (this.props.validator.allValid()) {
      const data = {
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        email: this.state.email,
      };
      this.props.createUser(data);
    } else {
      this.props.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <form className={ styles.formRegister }>
        <Grid container direction="column" justify="center" alignItems="center">

          <TextField
            label="Pseudo :"
            value={ this.state.username }
            onChange={e => this.handleUsernameRegisterChange(e.target.value)}      
          />
          {this.props.validator.message('pseudo', this.state.username, 'required|between:1,10')}

          <TextField
            label="Prénom :"
            value={ this.state.first_name }
            onChange={e => this.handleFirstNameRegisterChange(e.target.value)}
          />
          {this.props.validator.message('prénom', this.state.first_name, 'required|between:1,30')}

          <TextField
            label="Nom :"
            value={ this.state.last_name }
            onChange={e => this.handleLastNameRegisterChange(e.target.value)}
          />
          {this.props.validator.message('nom', this.state.last_name, 'required|between:1,30')}

          <TextField
            label="Mot de passe :"
            type="password"
            value={ this.state.password }
            onChange={e => this.handlePasswordRegisterChange(e.target.value)}
          />
          {this.props.validator.message('mot de passe', this.state.password, 'required|between:6,30')}

          <TextField
            label="Répétez le mot de passe :"
            type="password"
            value={ this.state.password_register_repeat }
            onChange={e => this.handlePasswordRegisterRepeatChange(e.target.value)}
          />
          {this.props.validator.message('mot de passe', this.state.password_register_repeat, 'required|repeatPassword')}

          <TextField
            label="Email :" 
            value={this.state.email}
            onChange={e => this.handleEmailRegisterChange(e.target.value)}
          />
          {this.props.validator.message('email', this.state.email, 'required|email')}

          <Button
            onClick={ this.handleSubmitRegister }
            color="secondary"
          >
          S'inscrire
          </Button>

        </Grid>
      </form>
    )
  }
}

export default Register;