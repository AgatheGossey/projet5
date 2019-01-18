import React, { Component } from 'react';

// STYLE
import styles from './leftbar.module.css';

// COMPONENTS 
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EditIcon from '@material-ui/icons/Edit';

class LeftBar extends Component {
    render() {
        return (
            <Drawer
                anchor="left"
                open={this.props.open}
                onClose={this.props.toggleSideBar}
             >
                <div className={styles.drawerHeader}>
                <IconButton color="inherit" aria-label="Menu" onClick={this.props.toggleSideBar}>
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
        )
    }
    

}

export default LeftBar;