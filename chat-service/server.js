import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options("*", cors())

app.get('/', (req, res) => {
    res.send('Hello World from chat-service')
});

const httpServer = createServer(app)

httpServer.listen(3003)

const io = new Server(httpServer , {cors: { origin : "*"}})

io.on("connection", (socket) => {
    console.log(`client (Backend) connected to chat service with id ${socket.id}`)
})