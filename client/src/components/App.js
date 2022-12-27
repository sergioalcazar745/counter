// import './../assests/css/App.css';
import io from "socket.io-client";
import $ from 'jquery';
import Popper from 'popper.js';
import { useState, useEffect, useRef } from 'react'

const socket = io('http://localhost:4000/')

function App() {

  const [clock, setClock] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const numero = useRef();

  const comenzar = (e) => {
    e.preventDefault();
    socket.emit('contador', numero.current.value);
    $("#btnEnviar").hide();
    $("#btnPausar").show();
    $("#texto").val("");
  }

  const pausar = (e) => {
    e.preventDefault();
    socket.emit('contador', "pausa");
    $("#btnPausar").hide();
    $("#btnReanudar").show();
  }

  const reanudar = (e) => {
    e.preventDefault();
    socket.emit('contador', segundos);
    $("#btnPausar").show();
    $("#btnReanudar").hide();
  }

  const secConverter = (s) => {
    let d, h, m

    m = Math.floor(s / 60)
    s = s % 60
    h = Math.floor(m / 60)
    m = m % 60
    d = Math.floor(h / 24)
    h = h % 24

    return {days: d, hours: h, minutes: m, seconds: s}
  }

  const timer = (numero) => {
    const convertedTime = secConverter(numero, 'sec')

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

    setClock(convertedTime)
    $("#clock").show();
  }

  useEffect (() => {
    $("#btnPausar").hide();
    $("#btnReanudar").hide();
    const receiveMessage = (segundos) => {
      setSegundos(segundos);
      timer(segundos);
    }

    socket.on('cont', receiveMessage);

    return () => {
      socket.off("cont", receiveMessage);
    }

  }, [])

  return (
    <div>

      {
        clock != 0 &&
        <div className="clock">
          <div className="hours">
            <div className="first">
              <div className="number">{clock.hours[0]}</div>
            </div>
            <div className="second">
              <div className="number">{clock.hours[1]}</div>
            </div>
          </div>
          <div className="tick">:</div>
          <div className="minutes">
            <div className="first">
              <div className="number">{clock.minutes[0]}</div>
            </div>
            <div className="second">
              <div className="number">{clock.minutes[1]}</div>
            </div>
          </div>
          <div className="tick">:</div>
          <div className="seconds">
            <div className="first">
              <div className="number">{clock.seconds[0]}</div>
            </div>
            <div className="second infinite">
              <div className="number">{clock.seconds[1]}</div>
            </div>
          </div>
        </div>
      }

      <form onSubmit={e => comenzar(e)}>
        <input id='texto' type="text" ref={numero}/>
        <button id='btnEnviar'>Send</button>
        <button type='button' id='btnPausar' onClick={e => pausar(e)}>Pausar</button>
        <button type='button' id='btnReanudar' onClick={e => reanudar(e)}>Reanudar</button>
      </form>

    </div>
  );
}

export default App;
