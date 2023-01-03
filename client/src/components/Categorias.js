import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControl, FormGroup, FormLabel, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Slider, TextField, Typography, Zoom } from '@mui/material'
import React, { Component } from 'react';
import CategoriaService from '../services/CategoriaService';
import AddIcon from '@mui/icons-material/Add';

function valuetext(value) {
    return `${value}°C`;
}

const service = new CategoriaService()

export default class Categorias extends Component {

    state = {
        categorias: null,
        status: false,
        tiempos: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120],
        openDialog: false,
        openDialogUpdate: false,
        openAlertSuccess: false,
        openAlertError: false,
        categoria: "",
        message: "",
    }

    nombre = React.createRef();
    duracion = React.createRef();

    componentDidMount = () => {
        this.getAllCategorias();
    }

    getAllCategorias = () => {
        service.getAllCategorias().then(result => {
            this.state.categorias = result
            this.setState({
                categorias: this.state.categorias,
                status: true
            })
        });
    }

    deleteCategoria = (id) => {
        service.deleteCategoria(id).then(() => {
            this.state.status = false;
            this.setState({
                status: this.state.status,
                openDialogUpdate: false
            })
            this.getAllCategorias();
            this.handleClickOpenAlertSuccess("Se ha eliminado correctamente")
        })
    }

    addCategoria = () => {
        service.postCategoria({idCategoria: 0, categoria: this.nombre.current.value, duracion: this.duracion.current.value}).then(() => {
            this.getAllCategorias();
            this.handleClickCloseDialog();
            this.handleClickOpenAlertSuccess("Se ha añadido correctamente")
        })
    }

    updateCategoria = () => {
        service.updateCategoria({idCategoria: this.state.categoria.idCategoria, categoria: this.nombre.current.value, duracion: this.duracion.current.value}).then(() => {
            this.getAllCategorias();
            this.handleClickCloseDialogUpdate();
            this.handleClickOpenAlertSuccess("Se ha actualizado correctamente")
        });
    }

    // -- Dialogo Añadir --

    handleClickOpenDialog = () => {
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

    handleClickOpenDialogUpdate = (categoria) => {
        this.setState({
            openDialogUpdate: true,
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

    listCategorias = () => {
        return (
            <div>
                <List>

                    {
                        this.state.categorias.map((categoria, index) => {
                            return (
                                <div key={index}>
                                    <ListItem sx={{ color: 'black' }} onClick={() => this.handleClickOpenDialogUpdate(categoria)}>
                                        <ListItemButton>
                                            <ListItemText 
                                                primary={categoria.categoria} 
                                                secondary={
                                                    <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {categoria.duracion} min
                                                    </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItemButton>

                                    </ListItem>
                                    <Divider variant="" component="li" />
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
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
                        this.listCategorias()
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
                    <DialogTitle>Añadir una categoria</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre de la categoria"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputRef={this.nombre}
                        />
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                            <InputLabel id="demo-simple-select-helper-label">Duracion</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                defaultValue={5}
                                label="Duracion"
                                inputRef={this.duracion}
                            >
                                {
                                    this.state.tiempos.map((tiempo, index) => {
                                        return (<MenuItem key={tiempo} value={tiempo}>{tiempo}</MenuItem>)
                                    })
                                }
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClickCloseDialog()}>Cancelar</Button>
                        <Button onClick={() => this.addCategoria()}>Añadir</Button>
                    </DialogActions>
                </Dialog>
                {/* Dialog para actualizar */}
                <Dialog open={this.state.openDialogUpdate} onClose={() => this.handleClickCloseDialogUpdate()}>
                    <DialogTitle>Información</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Nombre de la categoría"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputRef={this.nombre}
                            defaultValue={this.state.categoria.categoria}
                        />
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                            <InputLabel id="demo-simple-select-helper-label">Duracion</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={this.state.categoria.duracion}
                                label="Duracion"
                                inputRef={this.duracion}
                            >
                                {
                                    this.state.tiempos.map((tiempo, index) => {
                                        return (<MenuItem key={tiempo} value={tiempo}>{tiempo}</MenuItem>)
                                    })
                                }
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{justifyContent:'space-around'}}>
                        <Button onClick={() => this.deleteCategoria(this.state.categoria.idCategoria)}>Eliminar</Button>
                        <Button onClick={() => this.updateCategoria()}>Actualizar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
