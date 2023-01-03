import { Button, Checkbox, CircularProgress, Divider, FormControlLabel, FormGroup, FormLabel, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slider, TextField, Typography } from '@mui/material'
import React, { Component } from 'react';
import CategoriaService from '../services/CategoriaService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function valuetext(value) {
    return `${value}°C`;
}

const service = new CategoriaService()

export default class Categorias extends Component {

    state = {
        categorias: null,
        status: false
    }

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

    listCategorias = () => {
        return (
            <div>
                <List sx={{ marginTop: '50px' }}>

                    {
                        this.state.categorias.map((categoria, index) => {
                            return (
                                <div key={index}>
                                    <ListItem sx={{ color: 'black' }} to="/temporizadores">
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
                                                        Duracion: {categoria.duracion} min
                                                    </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                            <IconButton edge="end" aria-label="delete" color='info'>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" color='error'>
                                                <DeleteIcon />
                                            </IconButton>
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
            <CircularProgress sx={{ marginTop: '50px' }} />
        )
    }

    render() {
        return (
            <div style={{ width: '75%', margin: 'auto', marginTop: '50px' }}>
                <TextField
                    fullWidth
                    label="Nombre de la categoría"
                    type="text"
                    variant="standard"
                />
                <FormLabel component="legend" sx={{ marginTop: '50px' }}>Duracion</FormLabel>
                <FormGroup>
                    <Slider
                        aria-label=""
                        defaultValue={30}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={15}
                        marks
                        min={0}
                        max={120}
                    />
                </FormGroup>
                <Button sx={{ marginTop: '50px' }} variant={"contained"}>Añadir</Button><br />
                {
                    !this.state.status &&
                    this.spinner()
                }
                {
                    this.state.status &&
                    this.listCategorias()
                }

            </div>
        )
    }
}
