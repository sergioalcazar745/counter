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
var intervalo = "";


io.on("connection", (socket) => {
    console.log("Carga")
    socket.on('contador', function( contador) {
        if(contador != "pausa"){
            var numero = contador
            intervalo = setInterval(() => {
                if(numero != 0){
                    numero = numero - 1;
                    io.emit("cont", numero)
                }else{
                    clearInterval(intervalo)
                }          
            } ,1000)
        }else{
            clearInterval(intervalo)
        }         

    })

})

server.listen(PORT)
console.log("Server started on port " + PORT)