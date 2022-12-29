import React, { Component } from 'react';
import "./../assests/css/Menu.css";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import { NavLink } from 'react-router-dom';


export default class Menu extends Component {
    state = {
        open: false
    }

    toggleDrawer = (value) => {
        this.setState({
            open: value
        })
    }

    list = (anchor) => (
        <div>            
            <Box
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
                onClick={() => this.toggleDrawer(false)}
                onKeyDown={() => this.toggleDrawer(false)}
                >
                <List>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>                            
                            <ListItemText primary={"Home"}/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/salas" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <MeetingRoomIcon/>
                            </ListItemIcon>           
                            <ListItemText primary={"Salas"}/>                         
                        </ListItemButton>                       
                    </ListItem>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/empresas" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <WorkIcon/>
                            </ListItemIcon>                            
                            <ListItemText primary={"Empresas"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/categorias" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CategoryIcon/>
                            </ListItemIcon>                            
                            <ListItemText primary={"Categorias"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/temporizadores" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccessAlarmIcon/>
                            </ListItemIcon>                            
                            <ListItemText primary={"Temporizadores"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/eventos" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CalendarMonthIcon/>
                            </ListItemIcon>                            
                            <ListItemText primary={"Eventos"}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </div>
        
    );

  render() {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => this.toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Timer
                    </Typography>
                    <Button component={NavLink} to="/login" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
        <React.Fragment key={"left"}>
          <Drawer
            anchor={"left"}
            open={this.state.open}
            onClose={() => this.toggleDrawer(false)}
          >
            {this.list("left")}
          </Drawer>
        </React.Fragment>
      </div>
    )
  }
}
