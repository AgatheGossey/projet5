import React, { Component } from 'react';

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
    username_register: '',
    password_register: '',
    password_register_repeat: '',
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
          <TextField label="Pseudo :" value={this.state.username_connection} onChange={e => this.handleUsernameConnectionChange(e.target.value)}/>
          <TextField label="Mot de passe :" value={this.state.password_connection} onChange={e => this.handlePasswordConnectionChange(e.target.value)}/>
          <Button type="submit" onClick={this.handleSubmitConnection} color="primary">Se connecter</Button>
        </form>
      )
    } else {
      return (
        // Register form 
        <form className={styles.form}>
          <TextField label="Pseudo :" value={this.state.username_register} onChange={e => this.handleUsernameRegisterChange(e.target.value)}/>
          <TextField label="Mot de passe :" value={this.state.password_register} onChange={e => this.handlePasswordRegisterChange(e.target.value)}/>
          <TextField label="Répétez le mot de passe :" value={this.state.password_register_repeat} onChange={e => this.handlePasswordRegisterRepeatChange(e.target.value)}/>
          <Button type="submit" onClick={this.handleSubmitRegister} color="primary">S'inscrire</Button>
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

  // register

  handleUsernameRegisterChange = (username_register) => {
    this.setState({
      username_register: username_register,
    })
  }

  handlePasswordRegisterChange = (password_register) => {
    this.setState({
      password_register: password_register,
    })
  }

  handlePasswordRegisterRepeatChange = (password_register_repeat) => {
    this.setState({
      password_register_repeat: password_register_repeat,
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