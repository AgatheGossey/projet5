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
import Grid from '@material-ui/core/Grid';
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
    first_name: '',
    last_name: '',
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
          <form className={styles.formConnection}>        
            <Grid container direction="column" justify="center" alignItems="center">
              <TextField label="Nom :" value={this.state.username_connection} onChange={e => this.handleUsernameConnectionChange(e.target.value)}/>
              <TextField label="Mot de passe :" type="password" value={this.state.password_connection} onChange={e => this.handlePasswordConnectionChange(e.target.value)}/>
              <Button type="submit" onClick={this.handleSubmitConnection} color="secondary">Se connecter</Button>
            </Grid> 
          </form>
   
      )
    } else {
      return (
        // Register form 
        <form className={styles.formRegister}>
          <Grid container direction="column" justify="center" alignItems="center">
            <TextField required label="Pseudo :" value={this.state.username} onChange={e => this.handleUsernameRegisterChange(e.target.value)}/>
            <TextField required label="Prénom :" value={this.state.first_name} onChange={e => this.handleFirstNameRegisterChange(e.target.value)}/>
            <TextField required label="Nom :" value={this.state.last_name} onChange={e => this.handleLastNameRegisterChange(e.target.value)}/>
            <TextField required label="Mot de passe :" type="password" value={this.state.password} onChange={e => this.handlePasswordRegisterChange(e.target.value)}/>
            <TextField required label="Répétez le mot de passe :" type="password" value={this.state.password_register_repeat} onChange={e => this.handlePasswordRegisterRepeatChange(e.target.value)}/>
            <TextField required label="Email :" value={this.state.email} onChange={e => this.handleEmailRegisterChange(e.target.value)}/>
            <Button onClick={this.handleSubmitRegister} color="secondary">S'inscrire</Button>
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

  handleSubmitConnection = () => {

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
    const data = {
      username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      email: this.state.email,
    };
    
      axios.post('http://localhost/my_manager/api/users', data)
  
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