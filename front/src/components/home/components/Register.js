import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Grid, TextField, Button, FormHelperText } from '@material-ui/core';

// COMPONENTS 
import Message from './Message';

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

  componentWillMount = () => {
    this.validator = new SimpleReactValidator({
      element: message => <FormHelperText error id="component-error-text">{message}</FormHelperText>,
      messageReplace: (message, params) => {
        message.replace(':attribute', params.attribute);
        message.replace(':min', params.min);
        message.replace(':max', params.max);
      }, 
      messages: {
        required: 'Ce champ est requis',
        email: 'Cette adresse mail n\'est pas valide',
        between: 'Le :attribute doit contenir entre :min et :max caractères',
      },
      validators: {
        repeatPassword: {
          message: 'Les mots de passe ne sont pas identiques',
          rule: (val) => {
            return val === this.state.password;
          },
          required: true,
        }
      }
    });
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
    if (this.validator.allValid()) {
      const data = {
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        email: this.state.email,
      };
      this.props.createUser(data)
      this.cleanInput();
      this.props.toggleMessage();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  cleanInput() {
    this.setState({
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      password_register_repeat: '',
      email: '',
    })
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
          {this.validator.message('pseudo', this.state.username, 'required|between:1,10')}

          <TextField
            label="Prénom :"
            value={ this.state.first_name }
            onChange={e => this.handleFirstNameRegisterChange(e.target.value)}
          />
          {this.validator.message('prénom', this.state.first_name, 'required|between:1,30')}

          <TextField
            label="Nom :"
            value={ this.state.last_name }
            onChange={e => this.handleLastNameRegisterChange(e.target.value)}
          />
          {this.validator.message('nom', this.state.last_name, 'required|between:1,30')}

          <TextField
            label="Mot de passe :"
            type="password"
            value={ this.state.password }
            onChange={e => this.handlePasswordRegisterChange(e.target.value)}
          />
          {this.validator.message('mot de passe', this.state.password, 'required|between:6,30')}

          <TextField
            label="Répétez le mot de passe :"
            type="password"
            value={ this.state.password_register_repeat }
            onChange={e => this.handlePasswordRegisterRepeatChange(e.target.value)}
          />
          {this.validator.message('mot de passe', this.state.password_register_repeat, 'required|repeatPassword')}

          <TextField
            label="Email :" 
            value={this.state.email}
            onChange={e => this.handleEmailRegisterChange(e.target.value)}
          />
          {this.validator.message('email', this.state.email, 'required|email')}

          <Button
            onClick={ this.handleSubmitRegister }
            color="secondary"
          >
          S'inscrire
          </Button>
          <Message 
            open={ this.props.isMessageOpen }
            handleClose= { this.props.toggleMessage }
          />

        </Grid>
      </form>
    )
  }
}

export default Register;