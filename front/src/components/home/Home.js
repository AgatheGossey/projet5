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
              <Connection /> 
              : 
              <Register 
                createUser={ this.props.createUser }
                toggleMessage= { this.props.toggleMessage }
                isMessageOpen= { this.props.isMessageOpen }
              />
            }
          </div>

        </Grid>  
     )
  }

}
export default Home;