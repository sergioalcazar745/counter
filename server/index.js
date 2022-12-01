import express from "express";
import morgan from "morgan";
import { Server as SocketServer} from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors())
app.use(morgan('dev'))

io.on("connection", (socket) => {

    socket.on('contador', function( contador) {
        var numero = parseInt(contador)
        setInterval(() => {
            if(numero != 0){
                numero = numero - 1;
                io.emit("cont", numero)
            }else{
                console.log("Se acabó")
            }
        } ,1000)
    })

})

server.listen(PORT)
console.log("Server started on port " + PORT)