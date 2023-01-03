import React, { Component } from 'react'
import EmpresaService from '../services/EmpresaService';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, ListItemAvatar, TextField, Zoom } from '@mui/material';

const service = new EmpresaService();
export default class Empresas extends Component {

    state = {
        empresas: null,
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
        this.getAllEmpresas();
    }

    getAllEmpresas = () => {
        service.getAllEmpresas().then(result => {
            this.state.empresas = result;
            this.state.status = true
            this.setState({
                empresas: this.state.empresas,
                status: this.state.status
            })
        });
    }

    deleteEmpresa = (id) => {
        service.deleteEmpresa(id).then(() => {
            this.state.status = false;
            this.setState({
                status: this.state.status,
                openDialogUpdate: false
            })
            this.getAllEmpresas();
            this.handleClickOpenAlertSuccess("Se ha eliminado correctamente")
        })
    }

    addEmpresa = () => {
        service.postEmpresa(this.nombre.current.value).then(result => {
            this.getAllEmpresas();
            this.handleClickCloseDialog();
            this.handleClickOpenAlertSuccess("Se ha añadido correctamente")
        })
    }

    updateEmpresa = () => {
        service.updateEmpresa(this.state.id, this.nombre.current.value).then(result => {
            this.getAllEmpresas();
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

    listEmpresas = () => {
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
                        this.state.empresas.map((empresa, index) => {
                            return (
                                <ListItem component="div" disablePadding key={index} onClick={() => this.handleClickOpenDialogUpdate(empresa.idEmpresa, empresa.nombreEmpresa)}>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={empresa.imagen} />
                                        </ListItemAvatar>
                                        <ListItemText primary={empresa.nombreEmpresa} />
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
                        this.state.status == false &&
                        this.spinner()
                    }
                    {
                        this.state.status == true &&
                        this.listEmpresas()
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
                    <DialogTitle>Añadir una empresa</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre de la empresa"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputRef={this.nombre}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClickCloseDialog()}>Cancelar</Button>
                        <Button onClick={() => this.addEmpresa()}>Añadir</Button>
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
                            label="Nombre de la empresa"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputRef={this.nombre}
                            defaultValue={this.state.nombre}
                        />
                    </DialogContent>
                    <DialogActions sx={{justifyContent:'space-around'}}>
                        <Button onClick={() => this.deleteEmpresa(this.state.id)}>Eliminar</Button>
                        <Button onClick={() => this.updateEmpresa()}>Actualizar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
