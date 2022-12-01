import './App.css';
import io from "socket.io-client";
import $ from 'jquery';
import Popper from 'popper.js';
import { useState, useEffect, useRef } from 'react'

const socket = io('http://localhost:4000/')
const secConverter = require("seconds-converter")

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

  const timer = (numero) => {
    const convertedTime = secConverter(numero, 'sec')
    setClock(convertedTime)
    $("#clock").show();
  }

  useEffect (() => {
    $("#btnPausar").hide();
    $("#btnReanudar").hide();
    $("#clock").hide();
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
    <div className="App">

      <form onSubmit={e => comenzar(e)}>
        <input id='texto' type="text" ref={numero}/>
        <button id='btnEnviar'>Send</button>
        <button type='button' id='btnPausar' onClick={e => pausar(e)}>Pausar</button>
        <button type='button' id='btnReanudar' onClick={e => reanudar(e)}>Reanudar</button>
      </form>

      <h1 id='clock'>Reloj: {clock.hours}:{clock.minutes}:{clock.seconds}</h1>

    </div>
  );
}

export default App;
