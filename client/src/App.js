import './App.css';
import io from "socket.io-client";
import { useState, useEffect, useRef } from 'react'

const socket = io('http://localhost:4000/')
const secConverter = require("seconds-converter")

function App() {

  const [clock, setClock] = useState(0);
  const numero = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('contador', numero.current.value);
  }

  const timer = (numero) => {
    const convertedTime = secConverter(numero, 'sec')
    setClock(convertedTime)
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

      <h1>Reloj: {clock.hours}:{clock.minutes}:{clock.seconds}</h1>

    </div>
  );
}

export default App;
