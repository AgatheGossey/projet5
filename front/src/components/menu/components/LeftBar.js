import React from 'react';
import { Link } from "react-router-dom";
import { IconButton, Drawer, Divider, List, ListItem, ListItemIcon, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';

// STYLE
import style from '../menu.module.css';

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
        <Link to='/' className={style.link}>
          <ListItem button>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <Typography color="textPrimary">
              Budget
            </Typography>
          </ListItem>
        </Link>
        <Link to='/parametres' className={style.link}>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <Typography color="textPrimary">
              Paramètres
            </Typography>
          </ListItem>
        </Link>
        {props.userIsAdmin ? 
          (
            <Link to='/user' className={style.link}>
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <Typography color="textPrimary">
                  Utilisateurs
                </Typography>
              </ListItem>
            </Link>
          ) : null
        }
        
      </List>
    </Drawer>
  )
}

export default LeftBar;

