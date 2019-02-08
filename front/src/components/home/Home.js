import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { AppBar, Tabs, Tab, Grid, FormHelperText } from '@material-ui/core';

// COMPONENTS 
import Connection from './components/Connection';
import Register from './components/Register';

// STYLE 
import styles from './home.module.css';

class Home extends Component {
  state = {
    value: 0,
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

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
            { this.state.value  === 0 ?
            <Connection validator={ this.validator }/> : <Register validator={ this.validator }/>
            }
          </div>
        </Grid>  
     )
  }

}
export default Home;