import React from 'react';

// STYLE
import styles from './topbar.module.css';

// COMPONENTS
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';


const TopBar = (props) => {
    return (
        <AppBar>
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu" onClick={props.toggleSideBar}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={styles.menuText}>
                    My Manager
                </Typography>
                <IconButton
                  aria-owns='menu-appbar'
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
};

export default TopBar;