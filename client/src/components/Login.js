import React, { Component } from 'react'
import FormLabel from '@mui/joy/FormLabel';
import { TextField, Button } from '@mui/material';
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import LoginService from '../services/LoginService'
import { Navigate } from 'react-router-dom';

const service = new LoginService()

export default class Login extends Component {
    cajausuario = React.createRef();
    cajapass = React.createRef();

    state = {
        mensajeError: null,
        status: false,
        redirigir:false
    }

    datosLogin = () => {
        var usuario = this.cajausuario.current.value
        var pass = this.cajapass.current.value
        if (usuario.length == 0) {
            this.setState({
                mensajeError: "El campo usuario esta vacío",
                status: true
            })
        } else
            if (pass.length == 0) {
                this.setState({
                    mensajeError: "El campo contraseña esta vacío",
                    status: true
                })
            } else {
                //LLAMO API
                var data = { userName: usuario, password: pass }
                service.getToken(data).then(result => {
                    localStorage.setItem("token", result)
                    this.props.metodo("a")
                    this.setState({
                        redirigir:true
                    })

                })
                    .catch(error => {
                        var mensajeError = "No se ha encontrado el usuario"
                        this.setState({
                            mensajeError: mensajeError,
                            status: true
                        })
                        localStorage.removeItem("token")

                    })

            }

    }

    render() {
        if(this.state.redirigir==true){
            return (<Navigate to="/"/>);
        }
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                justifyContent="center"
                style={{ minHeight: '70vh', maxwidth: '100vw' }}
            >
                <Grid>
                    <Container>
                        <FormLabel>Usuario: </FormLabel>
                        <TextField
                            fullWidth
                            inputRef={this.cajausuario}
                            placeholder="Usuario"
                            type="text"
                        />
                        <br />
                    </Container>
                    <br />
                    <Container>
                        <FormLabel>Contraseña: </FormLabel>
                        <TextField
                            fullWidth
                            inputRef={this.cajapass}
                            placeholder="Contraseña"
                            type="password"
                        />
                    </Container>
                    <br />
                    <center>
                        <Container>
                            <Button variant="contained" color='success' onClick={this.datosLogin}>
                                Enviar datos
                            </Button>
                        </Container>
                        <br />
                        {
                            this.state.status == true &&
                            (
                                <h1 style={{ color: "red", fontSize: "25px" }}>{this.state.mensajeError}</h1>
                            )
                        }
                    </center>
                </Grid>

            </Grid>

        )
    }
}