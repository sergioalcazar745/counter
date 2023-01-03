import React, { Component } from 'react'
import SalaService from '../services/SalaService';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, ListItemAvatar, TextField, Zoom } from '@mui/material';

const service = new SalaService();
export default class Salas extends Component {

    state = {
        salas: null,
        //no se deberia de poner un status diferente para cada funcion???
        status: false,
        openDialog: false,
        openDialogUpdate: false,
        openAlertSuccess: false,
        openAlertError: false,
        id: 0,
        nombre: "",
        message: "",
    }

    nombre = React.createRef();

    componentDidMount = () => {
        this.getAllsalas();
    }

    getAllsalas = () => {
        service.getSalas().then(result => {
            this.state.salas = result;
            this.state.status = true
            this.setState({
                salas: this.state.salas,
                status: this.state.status
            })
        });
    }

    deletesala = (id) => {
        service.deletesala(id).then(() => {
            this.state.status = false;
            this.setState({
                status: this.state.status,
                openDialogUpdate: false
            })
            this.getAllsalas();
            this.handleClickOpenAlertSuccess("Se ha eliminado correctamente")
        })
    }

    addsala = () => {
        service.postsala(this.nombre.current.value).then(result => {
            this.getAllsalas();
            this.handleClickCloseDialog();
            this.handleClickOpenAlertSuccess("Se ha añadido correctamente")
        })
    }

    updatesala = () => {
        service.updatesala(this.state.id, this.nombre.current.value).then(result => {
            this.getAllsalas();
            this.handleClickCloseDialogUpdate();
            this.handleClickOpenAlertSuccess("Se ha actualizado correctamente")
        });
    }

    // -- Dialogo Añadir --

    handleClickOpenDialog = (message) => {
        this.setState({
            openDialog: true
        })
    }

    handleClickCloseDialog = () => {
        this.setState({
            openDialog: false
        })
    }

    // -- Dialogo Update --

    handleClickOpenDialogUpdate = (id, nombre) => {
        this.setState({
            openDialogUpdate: true,
            id: id,
            nombre: nombre
        })
    }

    handleClickCloseDialogUpdate = () => {
        this.setState({
            openDialogUpdate: false
        })
    }

    // -- Alerta Success --

    handleClickCloseAlertSuccess = () => {
        this.setState({
            openAlertSuccess: false
        })
    }

    handleClickOpenAlertSuccess = (message) => {
        this.setState({
            openAlertSuccess: true,
            message: message
        })
    }

    // -- Alerta Error --

    handleClickCloseAlertError = () => {
        this.setState({
            openAlertError: false
        })
    }

    handleClickOpenAlertError = (message) => {
        this.setState({
            openAlertError: true,
            message: message
        })
    }

    // -------------------------------------------------------------------------------------

    listsalas = () => {
        return (
            <div>
                {/* <ListItem component="div" disablePadding onClick={() => this.handleClickOpenDialog()}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddBoxIcon fontSize='large' />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem> */}
                <List>
                    {
                        this.state.salas.map((sala, index) => {
                            return (
                                <ListItem component="div" disablePadding key={index} onClick={() => this.handleClickOpenDialogUpdate(sala.idSala, sala.nombreSala)}>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            
                                            
                                            <h2>{sala.idSala}</h2>
                                        </ListItemAvatar>
                                        <ListItemText primary={sala.nombreSala} />
                                    </ListItemButton>
                                </ListItem>
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

    render() {
        return (
            <div>
                {
                    this.state.openAlertSuccess &&
                    <Alert onClose={() => this.handleClickCloseAlertSuccess()}>{this.state.message}</Alert>
                }
                {
                    this.state.openAlertError &&
                    <Alert onClose={() => this.handleClickCloseAlertError()}>{this.state.message}</Alert>
                }
                <Box sx={{ width: '100%', bgcolor: 'background.paper'}}>
                    {
                        this.state.status === false &&
                        this.spinner()
                    }
                    {
                        this.state.status === true &&
                        this.listsalas()
                    }
                    <Zoom
                    in = {true}
                    timeout = {{enter: 10, exit: 10}}
                    unmountOnExit
                    style={{position: 'fixed', top: 'calc(100vh - 75px)', right: '20px'}}
                    onClick={() => this.handleClickOpenDialog()}
                    >
                        <Fab color={"primary"} size={"size"}>
                            <AddIcon/>
                        </Fab>
                    </Zoom>
                </Box>
                {/* Dialog para añadir */}
                <Dialog open={this.state.openDialog} onClose={() => this.handleClickCloseDialog()}>
                    <DialogTitle>Añadir una sala</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre de la sala"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputRef={this.nombre}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClickCloseDialog()}>Cancelar</Button>
                        <Button onClick={() => this.addsala()}>Añadir</Button>
                    </DialogActions>
                </Dialog>
                {/* Dialog para actualizar */}
                <Dialog open={this.state.openDialogUpdate} onClose={() => this.handleClickCloseDialogUpdate()}>
                    <DialogTitle>Información</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre de la sala"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputRef={this.nombre}
                            defaultValue={this.state.nombre}
                        />
                    </DialogContent>
                    <DialogActions sx={{justifyContent:'space-around'}}>
                        <Button onClick={() => this.deletesala(this.state.id)}>Eliminar</Button>
                        <Button onClick={() => this.updatesala()}>Actualizar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
