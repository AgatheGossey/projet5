import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';

// COMPONENTS
import MenuLink from 'components/menu/MenuLink';

// ACTION 
import { toggleSideBar } from '../../actions/menu-actions';

// STYLE
import styles from './menu.module.css';

class Menu extends Component {
  render() {
    return (
      // TOP-BAR
      <div>
        <AppBar>
          <Toolbar>
            <IconButton aria-label="Menu" color="inherit" onClick={this.props.toggleSideBar}>
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
        {/* LEFT BAR */}
        <Drawer
          color="primary"
          anchor="left"
          open={this.props.isSideBarOpen}
          onClose={this.props.toggleSideBar}
        >
          <div className={styles.drawerHeader}>
            <IconButton aria-label="Menu" onClick={this.props.toggleSideBar}>
              <ChevronLeftIcon/> 
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <EditIcon></EditIcon>
              </ListItemIcon>
              <MenuLink to="/budget" label="Budget" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NoteAddIcon></NoteAddIcon>
              </ListItemIcon>
              <ListItemText inset primary="Factures" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon></SettingsIcon>
              </ListItemIcon>
              <MenuLink to="/parametres" label="Paramètres" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon></PeopleIcon>
              </ListItemIcon>
              <MenuLink to="/admin" label="Utilisateurs" />
            </ListItem>
          </List>
        </Drawer>
        {this.props.children}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    isSideBarOpen: state.sidebar.open, 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideBar: () => {
      dispatch(toggleSideBar());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

