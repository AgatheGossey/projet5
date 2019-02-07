import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

// STYLE
import styles from '../menu.module.css';

const TopBar = (props) => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton aria-label="Menu" color="inherit" onClick={props.toggleSideBar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={styles.menuText}>
          My Manager
        </Typography>
        <IconButton
          color="inherit"
          aria-owns='menu-appbar'
          aria-haspopup="true"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar;