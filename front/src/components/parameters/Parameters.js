import React from 'react';

// STYLES
import styles from './parameters.module.css';

// COMPONENTS
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

const Parameters = (props) => {
  return (
    <div className={ styles.container }>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              className={ styles.switch }
              checked={ props.isDarkThemeEnable }
              onChange={ props.toggleDarkTheme }
            />
          }
          label="Thème sombre"
        />
      </FormGroup>
    </div>
  )
}

export default Parameters;