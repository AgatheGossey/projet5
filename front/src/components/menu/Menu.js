import React, { Component } from 'react';

// STYLE
import styles from './menu.module.css';

// COMPONENTS
// Top-Bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
// Left-Bar
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EditIcon from '@material-ui/icons/Edit';


class Menu extends Component {

  state = {
    isSideBarOpen: false,
  }

  toggleSideBar = () => {
    this.setState({
      isSideBarOpen: !this.state.isSideBarOpen,
    })
  }

  render() {
    return (
      // TOP-BAR
      <div>
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleSideBar}>
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
        {/* LEFT BAR */}
        <Drawer
          anchor="left"
          open={this.state.isSideBarOpen}
          onClose={this.toggleSideBar}
        >
          <div className={styles.drawerHeader}>
            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleSideBar}>
              <ChevronLeftIcon/> 
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <EditIcon></EditIcon>
              </ListItemIcon>
              <ListItemText inset primary="Budget" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NoteAddIcon></NoteAddIcon>
              </ListItemIcon>
              <ListItemText inset primary="Factures" />
            </ListItem>
          </List>
        </Drawer>
        {this.props.children}
      </div>
    )
  }

};

export default Menu;