import React, { Component } from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { AppBar, Tabs, Tab, Grid, TextField, Button, FormHelperText } from '@material-ui/core';

// STYLE 
import styles from './tabhome.module.css';

class TabHome extends Component {
  state = {
    // tabs
    value: 0,
    // form
    // connection
    username_connection: '',
    password_connection: '', 
    // register
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
        alpha_num: 'Le :attribute ne doit pas contenir de caractères spéciaux',
        alpha: 'Le :attribute ne doit pas contenir de caractères spéciaux ni de chiffres',
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

  // TABS

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClickChange = () => {
    if (this.state.value === 0) {
      return (

        // Connection form 
          <form className={styles.formConnection}>        
            <Grid container direction="column" justify="center" alignItems="center">

              <TextField 
                label="Pseudo :"
                value={this.state.username_connection}
                onChange={e => this.handleUsernameConnectionChange(e.target.value)}
              />
              {this.validator.message('pseudo', this.state.username_connection, 'required|alpha_num|between:1,10')}

              <TextField 
                label="Mot de passe :"
                type="password"
                value={this.state.password_connection}
                onChange={e => this.handlePasswordConnectionChange(e.target.value)}
              />
              {this.validator.message('mot de passe', this.state.password_connection, 'required|between:6,30')}

              <Button 
                type="submit"
                onClick={this.handleSubmitConnection}
                color="secondary"
              >
                Se connecter
              </Button>

            </Grid> 
          </form>
   
      )
    } else {
      return (
        // Register form 
        <form className={styles.formRegister}>
          <Grid container direction="column" justify="center" alignItems="center">

            <TextField
              label="Pseudo :"
              value={this.state.username}
              onChange={e => this.handleUsernameRegisterChange(e.target.value)}      
            />
            {this.validator.message('pseudo', this.state.username, 'required|alpha_num|between:1,10')}

            <TextField
              label="Prénom :"
              value={this.state.first_name}
              onChange={e => this.handleFirstNameRegisterChange(e.target.value)}
            />
            {this.validator.message('prénom', this.state.first_name, 'required|alpha|between:1,30')}

            <TextField
              label="Nom :"
              value={this.state.last_name}
              onChange={e => this.handleLastNameRegisterChange(e.target.value)}
            />
            {this.validator.message('nom', this.state.last_name, 'required|alpha|between:1,30')}

            <TextField
              label="Mot de passe :"
              type="password"
              value={this.state.password}
              onChange={e => this.handlePasswordRegisterChange(e.target.value)}
            />
            {this.validator.message('mot de passe', this.state.password, 'required|between:6,30')}

            <TextField
              label="Répétez le mot de passe :"
              type="password"
              value={this.state.password_register_repeat}
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
              onClick={this.handleSubmitRegister}
              color="secondary"
            >
            S'inscrire
            </Button>

          </Grid>
        </form>
      )
    }
  }

  // FORM 

  // connection
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
    if (this.validator.allValid()) {
      e.preventDefault();
    }
    else {
      this.validator.showMessages();
      this.forceUpdate();
      e.preventDefault();
    }
  }

  // register

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
      axios.post('http://localhost/my_manager/api/users', data)
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render () {
    return ( 
        <Grid className={styles.container} container direction="row" justify="center" alignItems="center" >
          <div className={styles.test} >

            <AppBar position="static">
              <Tabs  indicatorColor="secondary" value={this.state.value} onChange={this.handleChange}>
                <Tab  label="Connexion" />
                <Tab label="S'inscrire" />
              </Tabs>
            </AppBar>

            {this.handleClickChange()}
          </div>
        </Grid>  
     )
  }

}
export default TabHome;