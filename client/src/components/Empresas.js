import React, { Component } from 'react'
import EmpresaService from '../services/EmpresaService';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Draggable from "react-draggable";
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, ListItemAvatar, ListItemIcon, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';

const service = new EmpresaService();
export default class Empresas extends Component {

    state = {
        empresas: null,
        status: false,
        open: false
    }

    nombre = React.createRef();
    imagen = React.createRef();

    componentDidMount = () => {
        this.getAllEmpresas();
    }

    getAllEmpresas() {
        service.getAllEmpresas().then(result => {
            this.state.empresas = result;
            this.state.status = true
            this.setState({
                empresas: this.state.empresas,
                status: this.state.status
            })
        });
    }

    listEmpresas = () => {
        return (
            <div>
                {/* <Button variant="outlined" onClick={() => this.handleClickOpen()}>
                    Añadir
                </Button> */}
                <ListItem component="div" disablePadding onClick={() => this.handleClickOpen()}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddBoxIcon fontSize='large'/>
                        </ListItemIcon>
                        {/* <ListItemText primary={"Añadir"} /> */}
                    </ListItemButton>
                </ListItem>
                <List>
                    {
                        this.state.empresas.map((empresa, index) => {
                            return (
                                // <Draggable>
                                <ListItem component="div" disablePadding key={index}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" color='error'>
                                            <DeleteIcon />
                                        </IconButton>
                                    }>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={empresa.imagen} />
                                        </ListItemAvatar>
                                        <ListItemText primary={empresa.nombreEmpresa} />
                                    </ListItemButton>
                                </ListItem>
                                // {/* </Draggable>                             */}
                            )
                        })
                    }
                </List>
            </div>
        );
    }

    spinner = () => {
        return (
            <CircularProgress />
        )
    }

    addEmpresa = () => {
        console.log(this.nombre.current.value)
        console.log(this.imagen.current.value);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div>
                <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '8px' }}>
                    {/* borderRight: 1, borderColor: 'grey.500' */}
                    {
                        this.state.status == false &&
                        this.spinner()
                    }
                    {
                        this.state.status == true &&
                        this.listEmpresas()
                    }
                </Box>
                <Dialog open={this.state.open} onClose={() => this.handleClose()}>
                    <DialogTitle>Añadir una empresa</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre de la empresa"
                            type="text"
                            fullWidth
                            variant="standard"
                            ref={this.nombre}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Imagen"
                            type="text"
                            fullWidth
                            variant="standard"
                            ref={this.imagen}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()}>Cancelar</Button>
                        <Button onClick={() => this.addEmpresa()}>Añadir</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
