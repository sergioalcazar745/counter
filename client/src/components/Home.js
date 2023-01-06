import React, { Component } from 'react';
import './../assests/css/Home.css';
import Button from '@mui/material/Button';
import $ from 'jquery';
import io from "socket.io-client";
import EventoService from './../services/EventoService'
import TemporizadorService from './../services/TemporizadorService'
import CategoriaService from '../services/CategoriaService';

const socket = io('http://localhost:4000/')

const serviceEventos = new EventoService()
const serviceTemporizadores = new TemporizadorService()
const serviceCategorias = new CategoriaService()

export default class Home extends Component {    

    state = {
        clock: 0,
        segundos: 0,
        hora: null,
        pausar:false,
        evento: null,
        listaTimers: [],
        status: false,
        lengthListaTimers: 0,
        cont: 0
    }

    numero = React.createRef();

    comenzar = (e) => {
      e.preventDefault();
      console.log("Hola")
      socket.emit('contador', this.state.listaTimers);
      $("#btnEnviar").hide();
      $("#btnPausar").show();
      $("#texto").val("");
      this.setState({
        pausar:false
      })
    }
    
    pausar = (e) => {
      e.preventDefault();
      socket.emit('contador', "pausa");
      $("#btnPausar").hide();
      $("#btnReanudar").show();
      this.setState({
        pausar:true
      })
    }
    
    reanudar = (e) => {
        e.preventDefault();
        socket.emit('contador', this.state.segundos);
        $("#btnPausar").show();
        $("#btnReanudar").hide();
    }
    
    secConverter = (s) => {
        let d, h, m
    
        m = Math.floor(s / 60)
        s = s % 60
        h = Math.floor(m / 60)
        m = m % 60
        d = Math.floor(h / 24)
        h = h % 24
    
        return {days: d, hours: h, minutes: m, seconds: s}
      }
    
    timer = (numero) => {
        console.log(numero)
        const convertedTime = this.secConverter(numero * 60)
        console.log(convertedTime)
    
        if(convertedTime.hours.toString().length == 1){
          var stringHours = "0" + convertedTime.hours.toString();
          convertedTime.hours = stringHours;
        }else{
          convertedTime.hours = convertedTime.hours.toString();
        }
    
        if(convertedTime.minutes.toString().length == 1){
          var stringMinutes = "0" + convertedTime.minutes.toString();
          convertedTime.minutes = stringMinutes;
        }else{
          convertedTime.minutes = convertedTime.minutes.toString();
        }
    
        if(convertedTime.seconds.toString().length == 1){
          var stringSeconds = "0" + convertedTime.seconds.toString();
          convertedTime.seconds = stringSeconds;
        }else{
          convertedTime.seconds = convertedTime.seconds.toString()
        }
        this.state.clock = convertedTime
        this.setState({clock: convertedTime})
        $("#clock").show();
    }

    componentDidMount = () =>{
        //Quitar
        localStorage.setItem("comienzo", "comienzo")
        this.getAllEventos();
        this.getAllTemporizadores();
        $("#btnPausar").hide();
        $("#btnReanudar").hide();
        const receiveMessage = (respuesta) => {
            this.state.segundos = respuesta.numero;
            this.state.hora = respuesta.hora
            this.setState({segundos: this.state.segundos, hora: this.state.hora})
            this.timer(respuesta.numero);
        }

        socket.on('cont', receiveMessage);

        return () => {
        socket.off("cont", receiveMessage);
        }
    }

    getAllEventos = () => {
      serviceEventos.getAllEventos().then(result => {
        this.setState({
          evento: result[0]
        })
      })
    }

    getAllTemporizadores = () => {
      serviceTemporizadores.getAllTemporizadores().then(result => {
        this.state.lengthListaTimers = result.length
        this.setState({
          lengthListaTimers: this.state.lengthListaTimers
        })
        console.log("")
        this.createListTimers(result)
      })
    }

    getByIdCategoria = (id, inicio) => {
      console.log("Id: " + id)
      serviceCategorias.getByIdCategoria(id).then(result => {
        this.state.cont = this.state.cont + 1
        this.setState({
          cont: this.state.cont
        })
        console.log(result.categoria)
        this.listTimers({inicio: inicio, duracion: result.duracion * 60})
        if(this.state.cont === this.state.lengthListaTimers){
          this.setState({
            status: true,
          })
        }
      })
    }

    listTimers = (result) => {
      this.state.listaTimers.push(result)
      this.setState({
        listaTimers: this.state.listaTimers
      })
    }

    createListTimers = (lista) => {
      for (let i = 0; i < lista.length; i++) {
        this.getByIdCategoria(lista[i].idCategoria, lista[i].inicio)    
      }
    }

    formatDate = (date) => {
      let resultado = []
      let fecha = date.substring(0, date.indexOf("T"))
      let hora = date.substring(date.indexOf("T") + 1, date.length - 3)
      resultado.push(fecha)
      resultado.push(hora)
      return resultado
    }

    render() {
      return (
        <div className='container-home'>       
          {
            this.state.status &&
            <>
              <h1>{this.state.evento.nombreEvento}</h1>
              <h2>{this.formatDate(this.state.evento.inicioEvento)[0]}</h2>
              <h3>{this.formatDate(this.state.evento.inicioEvento)[1]} - {this.formatDate(this.state.evento.finEvento)[1]}</h3>
            </>
          }
          {
            this.state.clock != 0 &&
            <h2 style={{color: 'red'}}>{this.state.hora}</h2>
          }
          {
          this.state.clock != 0 &&
              <div className="clock">
                  <div className="hours">
                      <div className="first">
                      <div className="number">{this.state.clock.hours[0]}</div>
                      </div>
                      <div className="second">
                      <div className="number">{this.state.clock.hours[1]}</div>
                      </div>
                  </div>
              <div className="tick">:</div>
                  <div className="minutes">
                      <div className="first">
                      <div className="number">{this.state.clock.minutes[0]}</div>
                      </div>
                      <div className="second">
                      <div className="number">{this.state.clock.minutes[1]}</div>
                      </div>
                  </div>
              {/* <div className="tick">:</div>
                  <div className="seconds">
                      <div className="first">
                      <div className="number">{this.state.clock.seconds[0]}</div>
                      </div>
                      <div className="second infinite">
                      <div className="number">{this.state.clock.seconds[1]}</div>
                      </div>
                  </div> */}
              </div>
          }
          <br/>
          {
            localStorage.getItem("token") &&
            (
              <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {/* <input id='texto' type="text" ref={this.numero} /> */}
              <div>
                {localStorage.getItem("comienzo") ?
                  (<Button onClick={(e) => {
                    this.comenzar(e);
                    localStorage.removeItem("comienzo");
                    localStorage.setItem("pausar","pausar")
                  }} variant="contained" color="success" style={{ margin: '10px' }}>
                    Comenzar
                  </Button>) :
                  (
                    <div>
                    {/* {localStorage.getItem("reanudar") &&
                        (
                          <Button onClick={(e) => {
                            this.reanudar(e)
                            localStorage.removeItem("reanudar");
                            localStorage.setItem("pausar","pausar")
                          }} variant="contained" color="primary" style={{ margin: '10px' }}>
                            Reanudar
                          </Button>
                        ) 
                    } */}
                    {/* {
                      localStorage.getItem("pausar") &&
                       (
                        <Button onClick={(e) => {
                          this.pausar(e)
                          localStorage.removeItem("pausar");
                          localStorage.setItem("reanudar","reanudar")
                        }}
                          variant="contained" color="error" style={{ margin: '10px' }}>
                          Pausar
                        </Button>)
                    } */}
                    </div>
                  )
                }
  
  
              </div>
            </form>
            )}
        </div>
      )
    }
}
