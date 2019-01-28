import React, { Component } from 'react';
import axios from 'axios';

// STYLE 
import styles from './tabhome.module.css';

// COMPONENTS
// tabs 
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// form
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    password: '',
    password_register_repeat: '',
    email: '',
  }

  // TABS

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClickChange = () => {
    if (this.state.value === 0) {
      return (
        // Connection form 
        <form className={styles.form}>
          <TextField label="Nom :" value={this.state.username_connection} onChange={e => this.handleUsernameConnectionChange(e.target.value)}/>
          <TextField label="Mot de passe :" type="password" value={this.state.password_connection} onChange={e => this.handlePasswordConnectionChange(e.target.value)}/>
          <Button type="submit" onClick={this.handleSubmitConnection} color="primary">Se connecter</Button>
        </form>
      )
    } else {
      return (
        // Register form 
        <form className={styles.form}>
          <TextField label="Nom :" value={this.state.username} onChange={e => this.handleUsernameRegisterChange(e.target.value)}/>
          <TextField label="Mot de passe :" type="password" value={this.state.password} onChange={e => this.handlePasswordRegisterChange(e.target.value)}/>
          <TextField label="Répétez le mot de passe :" type="password" value={this.state.password_register_repeat} onChange={e => this.handlePasswordRegisterRepeatChange(e.target.value)}/>
          <TextField label="Email :" value={this.state.email} onChange={e => this.handleEmailRegisterChange(e.target.value)}/>
          <Button onClick={this.handleSubmitRegister} color="primary">S'inscrire</Button>
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

  handleSubmitConnection = () => {

  }

  // register

  handleUsernameRegisterChange = (username) => {
    this.setState({
      username: username,
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
    const data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };

      axios.post('http://localhost/my_manager/api/user', data)
        .then( () => {

        })
  }

  render () {
    return (
      <div className={styles.grid}>
  
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="Connexion" />
            <Tab label="S'inscrire" />
          </Tabs>
        </AppBar>
        {this.handleClickChange()}
      </div>
    )
  }
}

export default TabHome;