import './App.css';
import io from "socket.io-client";
import { useState, useEffect, useRef } from 'react'

const socket = io('http://localhost:4000/')

function App() {

  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const numero = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('contador', numero.current.value);
  }

  const timer = (numero) => {
    var horas = Math.floor(parseInt(numero) / 3600);
    horas = (horas < 10)? '0' + horas : horas;
    
    var minutos = Math.floor((parseInt(numero) / 60) % 60);
    minutos = (minutos < 10)? '0' + parseInt(numero) : minutos;

    var segundos = parseInt(numero) % 60;
    segundos = (parseInt(numero) < 10)? '0' + parseInt(numero) : parseInt(numero); 

    console.log("Horas:" + horas + " Minutos: " + minutos + " Segundos: " + segundos);
  }

  useEffect (() => {
    const receiveMessage = (segundos) => {
      timer(segundos)   
    }

    socket.on('cont', receiveMessage);

    return () => {
      socket.off("cont", receiveMessage);
    }

  }, [])

  return (
    <div className="App">

      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" ref={numero}/>
        <button>Send</button>
      </form>

      {/* <h1>Reloj: {contador}</h1> */}

    </div>
  );
}

export default App;
