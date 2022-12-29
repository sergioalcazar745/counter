import React, { Component } from 'react';
import './../assests/css/Home.css';
import Button from '@mui/material/Button';
import $ from 'jquery';
import io from "socket.io-client";

const socket = io('http://localhost:4000/')

export default class Home extends Component {    

    state = {
        clock: 0,
        segundos: 0
    }

    numero = React.createRef();

    comenzar = (e) => {
        e.preventDefault();
        console.log("Hola")
        socket.emit('contador', this.numero.current.value);
        $("#btnEnviar").hide();
        $("#btnPausar").show();
        $("#texto").val("");
    }
    
    pausar = (e) => {
        e.preventDefault();
        socket.emit('contador', "pausa");
        $("#btnPausar").hide();
        $("#btnReanudar").show();
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
        const convertedTime = this.secConverter(numero, 'sec')
    
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
        $("#btnPausar").hide();
        $("#btnReanudar").hide();
        const receiveMessage = (segundos) => {
            this.state.segundos = segundos;
            this.setState({segundos: this.state.segundos})
            this.timer(segundos);
        }

        socket.on('cont', receiveMessage);

        return () => {
        socket.off("cont", receiveMessage);
        }
    }

  render() {
    return (
      <div className='container-home'>               
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
            <div className="tick">:</div>
                <div className="seconds">
                    <div className="first">
                    <div className="number">{this.state.clock.seconds[0]}</div>
                    </div>
                    <div className="second infinite">
                    <div className="number">{this.state.clock.seconds[1]}</div>
                    </div>
                </div>
            </div>
        }
        <br/>
        <form style={{display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center'}}>
            <input id='texto' type="text" ref={this.numero}/>
            <div>
              <Button onClick={e => this.comenzar(e)} variant="contained" color="success" style={{margin: '10px'}}>
                  Comenzar
              </Button>
              <Button onClick={e => this.pausar(e)} variant="contained" color="error" style={{margin: '10px'}}>
                  Pausar
              </Button>
              <Button onClick={e => this.reanudar(e)} variant="contained" color="primary" style={{margin: '10px'}}>
                  Reanudar
              </Button>
            </div>
        </form>

      </div>
    )
  }
}
