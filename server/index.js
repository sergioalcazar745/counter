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
    console.log(socket.id)

    socket.on('contador', function( contador) {
        console.log(contador)
        app.set("conta",contador)
        
        //socket.broadcast.emit("cont", contador)
        io.emit("cont", app.get("conta"))
    })

})

server.listen(PORT)
console.log("Server started on port " + PORT)