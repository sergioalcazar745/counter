import './App.css';
import io from "socket.io-client";
import { useState, useEffect, useRef } from 'react'

const socket = io('http://localhost:4000/')

function App() {

  const [contador, setContador] = useState(0);
  const numero = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('contador', numero.current.value);
  }

  useEffect (() => {
    const receiveMessage = (contador) => {
      setContador(contador);   
    }

    socket.on('cont', receiveMessage);

    return () => {
      socket.off("cont", receiveMessage);
    }

  }, [contador])

  return (
    <div className="App">

      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" ref={numero}/>
        <button>Send</button>
      </form>

      <h1>Contador: {contador}</h1>

    </div>
  );
}

export default App;
