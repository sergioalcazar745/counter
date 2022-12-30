import React, { Component } from 'react';
import "./../assests/css/Menu.css";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import Menu0 from '@mui/material/Menu';
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
import { NavLink, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';


export default class Menu extends Component {
    state = {
        open: false,
        refresh: false,
        anchorEl: null,
        setAnchorEl: null,
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
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/salas" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <MeetingRoomIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Salas"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/empresas" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <WorkIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Empresas"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/categorias" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Categorias"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/temporizadores" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccessAlarmIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Temporizadores"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ color: 'rgba(0, 0, 0, 0.54)' }} component={NavLink} to="/eventos" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CalendarMonthIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Eventos"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </div>

    );

    metodo = (hola) => {
        this.setState({
            refresh: !this.state.refresh
        })
    }


    handleMenu = (event) => {
        this.setState({
            setAnchorEl: event.currentTarget
        })
    };


    handleClose = () => {
        this.setState({
            setAnchorEl: null
        })
    };


    render() {
        return (
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            {
                                localStorage.getItem("token") &&
                                (
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
                                )
                            }
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Timer
                            </Typography>
                            
                                {
                                    localStorage.getItem("token") ?
                                (
                                <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu0
                                    id="menu-appbar"
                                    anchorEl={this.state.setAnchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(this.state.setAnchorEl)}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={()=>{
                                        localStorage.removeItem("token");
                                        this.metodo("b")
                                    }}>Cerrar Sesión</MenuItem>
                                </Menu0>
                            </div>
                            ):(
                                <Button component={NavLink} to="/login" color="inherit">Login</Button>
                            )
                        }          
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
                <Outlet context={{ "para": this.metodo }} />
            </div>
        )
    }
}
