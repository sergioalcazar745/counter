import React, { Component } from 'react';
import TemporizadorService from './../services/TemporizadorService';
import CategoriaService from './../services/CategoriaService';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, InputLabel, ListItemAvatar, MenuItem, Select, TextField, Typography, Zoom } from '@mui/material';

const service = new TemporizadorService()
const serviceCategoria = new CategoriaService()

export default class Temporizadores extends Component {
    state = {
        temporizadores: null,
        categorias: null,
        status: false,
        statusCategoria: false,
        openDialog: false,
        openDialogUpdate: false,
        openAlertSuccess: false,
        openAlertError: false,
        accordion: true,
        id: 0,
        nombre: "",
        message: "",
    }

    inicio = React.createRef();
    categoria = React.createRef();

    componentDidMount = () => {
        this.getAllTemporizadores();
        this.getAllCategorias();
    }

    getAllTemporizadores = () => {
        service.getAllTemporizadores().then(result => {
            this.state.temporizadores = result;
            this.state.status = true
            this.setState({
                temporizadores: this.state.temporizadores,
                status: this.state.status
            })
        });
    }

    deleteTemporizador = (id) => {
        service.deleteTemporizador(id).then(() => {
            this.state.status = false;
            this.setState({
                status: this.state.status,
                openDialogUpdate: false
            })
            this.getAllTemporizadores();
            this.handleClickOpenAlertSuccess("Se ha eliminado correctamente")
        })
    }

    addTemporizador = () => {
        service.postTemporizador({inicio: this.inicio.current.value, idCategoria: this.categoria.current.value, pausa: false}).then(result => {
            this.getAllTemporizadores();
            this.handleClickCloseDialog();
            this.handleClickOpenAlertSuccess("Se ha añadido correctamente")
        })
    }

    updateTemporizador = () => {
        service.updateTemporizador({idTemporizador: this.state.id, inicio: this.inicio.current.value, idCategoria: this.categoria.current.value, pausa: false}).then(result => {
            this.getAllTemporizadores();
            this.handleClickCloseDialogUpdate();
            this.handleClickOpenAlertSuccess("Se ha actualizado correctamente")
        });
    }

    // -- Categorias --

    getAllCategorias = () => {
        serviceCategoria.getAllCategorias().then(result => {
            this.state.categorias = result
            this.setState({
                categorias: this.state.categorias,
                statusCategoria: true
            })
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

    handleClickOpenDialogUpdate = (id, inicio, categoria) => {
        this.setState({
            openDialogUpdate: true,
            id: id,
            inicio: inicio,
            categoria: categoria
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

    changeFormat = (time) => {
        let fecha = time.substring(0, time.indexOf("T"))
        let hora = time.substring(time.indexOf("T") + 1, time.length)
        let fechaHora = fecha + " - " + hora
        let final = fechaHora.substring(0, fechaHora.length - 3)
        return final
    }

    // -------------------------------------------------------------------------------------

    listTemporizadores = () => {
        return (
            <div>
                <List>
                    {
                        this.state.temporizadores.map((temporizador, index) => {
                            return (
                                <ListItem component="div" disablePadding key={index} onClick={() => this.handleClickOpenDialogUpdate(temporizador.idTemporizador, temporizador.inicio,temporizador.idCategoria)}>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <AccessAlarmIcon/>
                                        </ListItemAvatar>
                                        <ListItemText primary={this.changeFormat(temporizador.inicio)} />
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
                        this.listTemporizadores()
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
                    <DialogTitle>Añadir un temporizador</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label=""
                            type="datetime-local"
                            fullWidth
                            variant="standard"
                            inputRef={this.inicio}
                        />
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                            <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Categoria"
                                inputRef={this.categoria}
                            >
                                {
                                    this.state.statusCategoria &&
                                    this.state.categorias.map((categoria, index) => {
                                        return (<MenuItem key={index} value={categoria.idCategoria}>{categoria.categoria}</MenuItem>)
                                    })
                                }
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClickCloseDialog()}>Cancelar</Button>
                        <Button onClick={() => this.addTemporizador()}>Añadir</Button>
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
                            type="datetime-local"
                            fullWidth
                            variant="standard"
                            inputRef={this.inicio}
                            defaultValue={this.state.inicio}
                        />
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                            <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Categoria"
                                defaultValue={this.state.categoria}
                                inputRef={this.categoria}
                            >
                                {
                                    this.state.statusCategoria &&
                                    this.state.categorias.map((categoria, index) => {
                                        return (<MenuItem key={index} value={categoria.idCategoria}>{categoria.categoria}</MenuItem>)
                                    })
                                }
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{justifyContent:'space-around'}}>
                        <Button onClick={() => this.deleteTemporizador(this.state.id)}>Eliminar</Button>
                        <Button onClick={() => this.updateTemporizador()}>Actualizar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

