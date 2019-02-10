import React from 'react';
import {  IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';

// COMPONENTS
import MenuLink from './MenuLink';

const LeftBar = (props) => {
  return (
    <Drawer
      color="primary"
      anchor="left"
      open={ props.isSideBarOpen }
      onClose={ props.toggleSideBar }
    >
      <div>
        <IconButton aria-label="Menu" onClick={ props.toggleSideBar }>
          <ChevronLeftIcon/> 
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <EditIcon></EditIcon>
          </ListItemIcon>
          <MenuLink to="/" label="Budget" />
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
  )
}

export default LeftBar;

