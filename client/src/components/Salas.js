import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import React, { Component } from 'react';
import SalaService from './../services/SalaService';


const service = new SalaService();
export default class Salas extends Component {

  state = {
    salas: null,
    statusGet: false,
    statusDelete: false,
    statusUpdate: false,
    statusAdd: false,
    openDialog: false,
    openDialogUpdate: false,
    openAlertSuccess: false,
    openAlertError: false,
    id: 0,
    nombre: "",
    message: "",
  }

  getAllSalas = () => {
    service.getSalas().then(result => {
      this.state.salas = result;
      console.log(result);
      this.setState({
        salas: this.state.salas,
        statusGet: true,
      })
    });
  }

  deleteSala = (id) => {
    service.deleteSala(id).then(() => {
      this.state.statusDelete = false;
      this.setState({
        statusDelete: this.state.statusDelete
      })
      this.getAllSalas();
      this.handleClickOpenAlertSuccess("Se ha eliminado correctamente")
    })
  }

  componentDidMount = () => {
    this.getAllSalas();
  }


  //-- Dialogo Añadir --

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

  render() {
    return (
      <div>
        <h1>Salas</h1>
        <ListItem component="div" disablePadding onClick={() => this.handleClickOpenDialog()}>
          <ListItemButton>
            <ListItemIcon>
              <AddBoxIcon fontSize='large' />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <List>
          {
            this.state.salas&&
            this.state.salas.map((salas, index) => {
              return (
                <div key={index}>
                  <ListItem component="div" disablePadding key={index}>
                    <ListItemButton>
                      <ListItemText primary={salas.nombreSala} />
                      <IconButton edge="end" aria-label="delete" color='info'>
                        <EditIcon onClick={() => this.handleClickOpenDialogUpdate(salas.idSala, salas.nombresalas)} />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" color='error'>
                        <DeleteIcon onClick={() => this.deletesalas(salas.idSala)} />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                </div>
              )
            })
          }
        </List>
      </div>
    )
  }
}
