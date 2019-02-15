import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Grid } from '@material-ui/core';

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

  render () {
    return ( 
        <Grid className={ styles.container } container direction="row" justify="center" alignItems="center" >

          <div className={ styles.appBar } >
            <AppBar position="static">
              <Tabs  indicatorColor="secondary" value={ this.state.value } onChange={ this.handleChange }>
                <Tab  label="Connexion" />
                <Tab label="S'inscrire" />
              </Tabs>
            </AppBar>
            { 
              this.state.value  === 0 ?
              <Connection 
                login={ this.props.login }
                connectionError={ this.props.connectionError }
              /> 
              : 
              <Register
                registerUsernameError={ this.props.registerUsernameError }
                createUser={ this.props.createUser }
                toggleMessageAfterRegister= { this.props.toggleMessageAfterRegister }
                isMessageAfterRegisterOpen= { this.props.isMessageAfterRegisterOpen }
              />
            }
          </div>

        </Grid>  
     )
  }

}
export default Home;