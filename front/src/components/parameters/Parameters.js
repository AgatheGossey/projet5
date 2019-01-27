import React from 'react';

// STYLES
import styles from './parameters.module.css';

// COMPONENTS
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

const Parameters = (props) => {
  return (
    <div className={styles.container}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={props.isDarkThemeEnable}
              onChange={props.toggleDarkTheme}
            />
          }
          label="Theme sombre"
        />
      </FormGroup>
    </div>
  )
}

export default Parameters;