import './App.css';
import io from "socket.io-client";
import { useState, useEffect } from 'react'

const socket = io('http://localhost:4000/')

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', message)
    setMessages([...messages, {body: message, from: "Me"}])
    setMessage("")
  }

  useEffect (() => {
    const receiveMessage = (message) => {
      setMessages([...messages, message])
    }
    socket.on('message', receiveMessage)  
    return () => {
      socket.off("message", receiveMessage)
    }
  }, [messages])

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setMessage(e.target.value)} value={message}/>
        <button>Send</button>
      </form>

      {
        messages.map((message, index) => {
          return (
          <div key={index}>
            <p>{message.body}</p>
            <p>{message.from}</p>
          </div>
          )
        })
      }

    </div>
  );
}

export default App;
